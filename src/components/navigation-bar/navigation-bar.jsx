import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.scss";
import "./navigation-bar.css"

export const NavigationBar = ({ user, onLoggedOut }) => {

  const brandStyle = {
    color: 'white' // Change color to your desired color
  };

  return (
    <Navbar bg="dark" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand style={brandStyle}>
          NV5 Project Database
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/input-project">Create</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};