import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { WelcomeView } from "../welcome-view/welcome-view";
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayView } from "../play-view/play-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(
      "https://spelling-game-ef1de28a171a.herokuapp.com/users",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => response.json())
      .then((data) => {

      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row>
        <p></p>
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <WelcomeView/>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/play"
            element={
              <>
                <PlayView/>
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};