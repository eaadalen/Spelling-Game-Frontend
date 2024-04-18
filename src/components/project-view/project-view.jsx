import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./project-view.scss";

export const ProjectView = ({ user, token, projects, setUser }) => {
  const { projectID } = useParams();
  const project = projects.find((b) => b._id === projectID);
  console.log(project)

  return (
    <div>
      <div>
        <span STYLE="font-weight:bold">Title: </span>
        <span>{project.Title}</span>
      </div>
      <div>
        <span STYLE="font-weight:bold">Project Number: </span>
        <span>{project.ProjectNumber}</span>
      </div>
      <div>
        <span STYLE="font-weight:bold">Description: </span>
        <span>{project.Description}</span>
      </div>
      <div>
        <span STYLE="font-weight:bold">Keywords: </span>
        <span>{project.Keywords}</span>
      </div>
      <div>
        <span STYLE="font-weight:bold">File Location: </span>
        <span>{project.FileLocation}</span>
      </div>
      <div>
        <span STYLE="font-weight:bold">Project Manager: </span>
        <span>{project.ProjectManager}</span>
      </div>
      <div>
        <span STYLE="font-weight:bold">Project Staff: </span>
        <span>{project.ProjectStaff}</span>
      </div>
      <div>
        <span STYLE="font-weight:bold">Systems/Equipment Used: </span>
        <span>{project.Systems_and_Equipment}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};