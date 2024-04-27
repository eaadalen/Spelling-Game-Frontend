import "./welcome-view.scss"
import { Link } from "react-router-dom";

export const WelcomeView = () => {
  return (
    <div className="container">
        <h1>Spelling Survival</h1>
        <Link to={`/play`}>
            <p className="button">Start</p>
        </Link>
    </div>
  );
};