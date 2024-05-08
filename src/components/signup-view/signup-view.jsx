import { useState } from "react";
import Form from "react-bootstrap/Form";

export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch(
      "https://spelling-game-ef1de28a171a.herokuapp.com/users",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((responseV1) => responseV1.json())
      .then((dataV1) => {
        fetch(
          "https://desolate-everglades-87695-c2e8310ae46d.herokuapp.com/login?Username=" + String(data.Username) + "&Password=" + String(data.Password),
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then((responseV2) => responseV2.json())
        .then((dataV2) => {
          localStorage.setItem("user", JSON.stringify(dataV2.user));
          localStorage.setItem("token", dataV2.token);
          onLoggedIn(dataV2.user, dataV2.token);
        });
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>
      <br></br>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <br></br>
      <button className="button">Submit</button>
    </Form>
  );
};