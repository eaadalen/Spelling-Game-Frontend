import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { WelcomeView } from "../welcome-view/welcome-view";
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayView } from "../play-view/play-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);

  return (
    <BrowserRouter>
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