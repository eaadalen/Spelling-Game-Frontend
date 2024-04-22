import "./play-view.scss"
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

export const PlayView = () => {
    const [word, setWord] = useState("");
    const [wordBank, setWordBank] = useState("");

    useEffect(() => {
        fetch(
          "https://spelling-game-ef1de28a171a.herokuapp.com/words",
        )
          .then((response) => response.json())
          .then((data) => {
            setWordBank(data);
            console.log(wordBank)
          });
      });

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
            <p>Play Word</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
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