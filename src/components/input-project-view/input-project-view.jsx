import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const InputProjectView = () => {
  const [title, setTitle] = useState("");
  const [projectnumber, setProjectNumber] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [filelocation, setFileLocation] = useState("");
  const [projectmanager, setProjectManager] = useState("");
  const [projectstaff, setProjectStaff] = useState("");
  const [systems_and_equipment, setSystems_and_Equipment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Title: title,
      ProjectNumber: projectnumber,
      Description: description,
      Keywords: keywords,
      FileLocation: filelocation,
      ProjectManager: projectmanager,
      ProjectStaff: projectstaff,
      Systems_and_Equipment: systems_and_equipment
    };

    fetch(
      "https://blooming-gorge-72776-95bc6a7cbd30.herokuapp.com/input-project",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((response) => {
      if (response.ok) {
        alert("Project Entry Successful");
        window.location.reload();
      } else {
        alert("Project Entry Failed");
      }
    });
  };

  return (
    <Container>
        <Row>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    minLength="1"
                    />
                </Form.Group>
                <Form.Group controlId="formProjectNumber">
                    <Form.Label>Project Number:</Form.Label>
                    <Form.Control
                    type="text"
                    value={projectnumber}
                    onChange={(e) => setProjectNumber(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formKeywords">
                    <Form.Label>Keywords:</Form.Label>
                    <Form.Control
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formFileLocation">
                    <Form.Label>File Location:</Form.Label>
                    <Form.Control
                    type="text"
                    value={filelocation}
                    onChange={(e) => setFileLocation(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formProjectManager">
                    <Form.Label>Project Manager:</Form.Label>
                    <Form.Control
                    type="text"
                    value={projectmanager}
                    onChange={(e) => setProjectManager(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formProjectStaff">
                    <Form.Label>Project Staff:</Form.Label>
                    <Form.Control
                    type="text"
                    value={projectstaff}
                    onChange={(e) => setProjectStaff(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formSystems_and_Equipment">
                    <Form.Label>Systems and Equipment:</Form.Label>
                    <Form.Control
                    type="text"
                    value={systems_and_equipment}
                    onChange={(e) => setSystems_and_Equipment(e.target.value)}
                    required
                    />
                </Form.Group>
                <p></p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Row>
        <Row>
            <p></p>
            <Link to={"/"}>
                <Button variant="primary" type="back-button">
                    Back
                </Button>
            </Link>
        </Row>
    </Container>
  );
};