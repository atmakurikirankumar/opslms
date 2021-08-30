import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "../index.css";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <span>
                  <i className="fas fa-glass-cheers"></i>
                </span>{" "}
                Vacation Tracker
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {userInfo ? (
                  <NavDropdown title={`${userInfo.lastname}, ${userInfo.firstname}`} id="username">
                    <LinkContainer to="/user/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <NavDropdown.Item>My Leaves</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/leaves/team">
                      <NavDropdown.Item>Show Team Absence</NavDropdown.Item>
                    </LinkContainer>
                    {userInfo.isAdmin && (
                      <>
                        <LinkContainer to="/leaves/all">
                          <NavDropdown.Item>All Teams Leaves</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/users/all">
                          <NavDropdown.Item>Manage Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/teams/all">
                          <NavDropdown.Item>Manage Teams</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
