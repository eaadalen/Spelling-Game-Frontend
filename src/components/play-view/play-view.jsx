import "./play-view.scss"
import { useState } from "react";
import Form from "react-bootstrap/Form";
import OpenAI from "openai";

export const PlayView = () => {
    const [spelling, setSpelling] = useState("");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });

    async function generateWord() {
      const response = await fetch("https://random-word-api.herokuapp.com/word")
      const response_json = await response.json()
      return response_json
    }

    async function main(random_word) {
      console.log(random_word);
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: String(random_word)
      });
      mp3.blob().then((myBlob) => {
        const objectURL = URL.createObjectURL(myBlob);
        const newAudioURL = objectURL;
        var a = new Audio(newAudioURL);
        a.play();
    });
    }

    async function playSound() {
      word = await generateWord();
      main(word);
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