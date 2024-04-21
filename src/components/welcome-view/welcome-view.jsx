import "./welcome-view.scss"
import { Link } from "react-router-dom";

export const WelcomeView = () => {
  return (
    <div class="container">
        <h1>Spelling Survival</h1>
        <Link to={`/play`}>
            <a class="button">Start</a>
        </Link>
    </div>
  );
};