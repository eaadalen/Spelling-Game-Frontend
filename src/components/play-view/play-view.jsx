import "./play-view.scss"
import { useState } from "react";
import Form from "react-bootstrap/Form";

export const PlayView = () => {
    const [word, setWord] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch(
          "https://spelling-game-ef1de28a171a.herokuapp.com/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.word) {
              alert("Correct");
            } else {
              alert("Incorrect");
            }
          })
          .catch((e) => {
            alert("Something went wrong");
          });
      };

  return (
    <div class="container">
        <div class="sub-container">
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
        <div class="sub-container">
            <p>Score</p>
            <p>Timer</p>
            <p>Strikes</p>
        </div>
    </div>
  );
};