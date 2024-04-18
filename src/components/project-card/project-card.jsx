import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./project-card.scss";

export const ProjectCard = ({ project, token, setUser, user }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{project.Title}</Card.Title>
        <Card.Text>{project.ProjectNumber}</Card.Text>
        <Link to={`/projects/${encodeURIComponent(project._id)}`}>
          <Button variant="link" style={{color:'black'}}>Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired
};