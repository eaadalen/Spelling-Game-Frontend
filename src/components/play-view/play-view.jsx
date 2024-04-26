import { get } from "http";
import "./play-view.scss"
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

export const PlayView = () => {
    const [word, setWord] = useState("");
    const [spelling, setSpelling] = useState("");
    const [soundID, setSoundID] = useState("");

    const generateWord = () => {
      fetch(
        "https://random-word-api.herokuapp.com/word",
      )
      .then((response) => response.json())
      .then((data) => {
        console.log("word: " + String(data))
        setWord(data);
        getSoundID();
      });
    }

    const getSoundID = () => {
      var dict_url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + String(word) + "?key=aede8a6f-61af-4667-bd27-95b2786bca10";

      fetch(dict_url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length < 20 && data != undefined) {  // Check if randomly generated word is in Merriam Webster database
          console.log("audio code: " + String(data[0]["hwi"]["prs"][0]["sound"]["audio"]))
          setSoundID(String(data[0]["hwi"]["prs"][0]["sound"]["audio"]))
          create_sound_URL();
        }
      });
    }

    const create_sound_URL = () => {
      var sound_url = "https://media.merriam-webster.com/audio/prons/en/us/mp3/"  + word[0].charAt(0) + "/" + soundID + ".mp3";
      console.log(sound_url)

      fetch(sound_url)
      .then(res => res.blob())
      .then((myBlob) => {
          console.log('here3')
          const objectURL = URL.createObjectURL(myBlob);
          const newAudioURL = objectURL;
          var a = new Audio(newAudioURL);
          a.play();
      });
    }

    const playSound = () => {
      generateWord();
      //var a = new Audio(url);
      //a.play();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkSpelling();
      };

    const checkSpelling = () => {
        if (wordBank.contains(word)) {
            alert("Correct")
        }
    }

  return (
    <div className="container">
        <div className="sub-container">
          <button className="button" onClick={playSound}>Play Sound</button>
            <Form onSubmit={handleSubmit}>
                <p></p>
                <Form.Group>
                    <Form.Control
                        type="text"
                        value={spelling}
                        onChange={(e) => setSpelling(e.target.value)}
                        placeholder="Start Typing..."
                        required
                    />
                </Form.Group>
                <p></p>
                <button className="button">Submit</button>
            </Form>
        </div>
        <div className="sub-container">
            <p>Score</p>
            <p>Timer</p>
            <p>Strikes</p>
        </div>
    </div>
  );
};