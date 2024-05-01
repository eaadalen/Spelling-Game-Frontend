import "./play-view.scss"
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

export const PlayView = () => {
    const [spelling, setSpelling] = useState("");
    const [word, setWord] = useState("");
    const [sound, setSound] = useState();

    useEffect(() => {
      getSound();
    }, []);
    
    async function generateWord() {
      const response = await fetch("https://random-word-api.herokuapp.com/word")
      const response_json = await response.json()
      setWord(response_json)
      return response_json
    }

    async function getSoundID(random) {
      var dict_url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + random + "?key=aede8a6f-61af-4667-bd27-95b2786bca10";
      const response = await fetch(dict_url)
      const response_json = await response.json()
      try {
        return String(response_json[0]["hwi"]["prs"][0]["sound"]["audio"])
      } catch (error) {
        getSound();
      }
    }

    async function create_sound_URL(raw_word, soundID) {
      var sound_url = "https://media.merriam-webster.com/audio/prons/en/us/mp3/"  + raw_word[0].charAt(0) + "/" + soundID + ".mp3";
      fetch(sound_url)
      .then(res => res.blob())
      .then((myBlob) => {
          console.log(sound_url)
          const objectURL = URL.createObjectURL(myBlob);
          const newAudioURL = objectURL;
          var a = new Audio(newAudioURL);
          setSound(a);
      })
      .catch(err => {
        console.log('caught it!',err);
        getSound();
        return 0
      })
    }

    async function getSound() {
      const random_word = await generateWord();
      const calc_soundID = await getSoundID(random_word);
      await create_sound_URL(random_word, calc_soundID);
    };

    const playSound = () => {
      sound.play()
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (spelling == word[0]) {
          console.log("Correct!")
        }
        else {
          console.log("Incorrect!")
        }
      };
    
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