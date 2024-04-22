import "./play-view.scss"
import { useState } from "react";
import Form from "react-bootstrap/Form";

export const PlayView = () => {
    const [word, setWord] = useState("");
    const [wordBank, setWordBank] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    
        useEffect(() => {
            fetch(
              "https://spelling-game-ef1de28a171a.herokuapp.com/words",
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
              .then((response) => response.json())
              .then((data) => {
                setWordBank(data);
              });
          }, [token]);
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