import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (location && location.state && location.state.passwordUpdated) {
      setPasswordUpdateMessage("Password changed successfully. Please sign-in back.");
    }
  }, [location, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <FormContainer>
      <Row>
        <Col md={9}>
          <h1>Sign In</h1>
          {passwordUpdateMessage && <Message variant="success">{passwordUpdateMessage}</Message>}
          {error && <Message variant="warning">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="py-3">
        <Col>
          New Team Member?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
      </Row>
      <Row className="py-2">
        <Col>
          Forgot Password?{" "}
          <Link to={redirect ? `/resetpassword?redirect=${redirect}` : "/resetpassword"}>
            Reset Password
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
