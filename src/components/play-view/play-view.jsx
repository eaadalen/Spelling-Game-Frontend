import "./play-view.scss"
import { useState } from "react";
import Form from "react-bootstrap/Form";

export const PlayView = () => {
    const [spelling, setSpelling] = useState("");

    async function generateWord() {
      const response = await fetch("https://random-word-api.herokuapp.com/word")
      const response_json = await response.json()
      return response_json
    }

    async function getSoundID(random) {
      var dict_url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + random + "?key=aede8a6f-61af-4667-bd27-95b2786bca10";
      const response = await fetch(dict_url)
      const response_json = await response.json()
      if (response_json.length < 20 && response_json != undefined) {  // Check if randomly generated word is in Merriam Webster database
        return String(response_json[0]["hwi"]["prs"][0]["sound"]["audio"])
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
          a.play();
      });
    }

    async function playSound() {
      const random_word = await generateWord();
      const calc_soundID = await getSoundID(random_word);
      if (calc_soundID != undefined) {
        create_sound_URL(random_word, calc_soundID);
      }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //checkSpelling();
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