import React, { useState, useEffect } from "react";
import { Form, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { resetPassword } from "../actions/userActions";
import { USER_LOGOUT } from "../constants/userConstants";

const ResetPassword = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { loading, error, passwordUpdate } = useSelector((state) => state.passwordResetReducer);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Error: Password Does Not Match");
    } else {
      setMessage("");
      setUsername("");
      setPassword("");
      setConfirmpassword("");
      dispatch(resetPassword(username, password));
    }
  };

  useEffect(() => {
    if (passwordUpdate) {
      dispatch({ type: USER_LOGOUT });
      history.push({ pathname: "/login", state: { passwordUpdated: true } });
    }
  }, [dispatch, history, passwordUpdate]);

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {message && <Message variant="warning">{message}</Message>}
      {error && <Message variant="warning">{error}</Message>}
      {loading && <Loader />}
      <Row>
        <Col md={9}>
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
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <ButtonGroup>
              <Button type="submit" variant="primary" className="mt-3">
                Reset Password
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ResetPassword;
