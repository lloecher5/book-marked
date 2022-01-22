import React from "react";

import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaBookmark } from "react-icons/fa";
import "./NavBarBootstrap.css";

const NavBarBootstrap = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              {" "}
              <FaBookmark className="nav-icon" />
              BookMarked
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/books">My Books</Nav.Link>
                <Nav.Link href="/add-book">Add Book</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/">
                  <Button
                    variant="outline-light"
                    onClick={() => handleLogout()}>
                    Logout
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <FaBookmark className="nav-icon" />
              BookMarked
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link href="/register">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default NavBarBootstrap;
