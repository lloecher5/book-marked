import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavBarBootstrap = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>BookMarked</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/books">My Books</Nav.Link>
                <Nav.Link href="/add-book">Add Book</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">
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
            <Navbar.Brand>Bookmarked</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
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
