import "./welcome-view.scss"
import React from "react";
import { Link } from "react-router-dom";

export const WelcomeView = () => {
  return (
    <div className="custom-container">
        <div className="left">Spelling Survival</div>
        <div className="description">
          Fun online game that lets you test your spelling skills against other users. 
          Play now and compete for the high score!
        </div>
        <div className="right"> 
          <Link to={`/play`}>
              <p className="button">Start</p>
          </Link>
        </div>
    </div>
  );
};