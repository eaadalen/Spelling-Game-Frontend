import "./play-view.scss"
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

export const PlayView = () => {
    const [word, setWord] = useState("");
    const [spelling, setSpelling] = useState("");
    const [url, setURL] = useState("");

    // Generate random word
    useEffect(() => {
      fetch(
        "https://random-word-api.herokuapp.com/word",
      )
      .then((response) => response.json())
      .then((data) => {
        setWord(data);
      });
    });

    const create_dict_URL = () => {
      var url = "https://dictionaryapi.com/api/v3/references/collegiate/json/" + String(word) + "?key=aede8a6f-61af-4667-bd27-95b2786bca10";

      fetch(url,)
      .then((response) => response.json())
      .then((data) => {
        console.log(data["0"])
        setURL(data);
      });
    }

    const create_sound_URL = () => {
      var audio_id = "test";
      var url = "https://media.merriam-webster.com/audio/prons/en/us/mp3/"  + String(word[0].charAt(0)) + "/" + "volumi02.mp3";

      fetch(url,)
      .then((response) => response.json())
      .then((data) => {
        setURL(data);
      });
    }

    const playSound = (url) => {
      create_dict_URL();
      var a = new Audio(url);
      a.play();
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