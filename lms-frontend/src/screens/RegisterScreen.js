import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { getTeamsList } from "../actions/teamsActions";

const RegisterScreen = ({ location, history }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const getTeams = useSelector((state) => state.getTeams);
  const { getTeamsLoading, getTeamsError, teams } = getTeams;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    dispatch(getTeamsList());
  }, [history, userInfo, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmpassword) {
      setMessage("Error: Passwords Do Not Match");
    } else {
      dispatch(register(firstname, lastname, username, password, team));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {message && <Message variant="warning">{message}</Message>}
      {error && <Message variant="warning">{error}</Message>}
      {getTeamsError && <Message variant="warning">{getTeamsError}</Message>}
      {loading && <Loader />}
      {getTeamsLoading && <Loader />}
      <Row>
        <Col md={9}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="firstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
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

            <Form.Group controlId="team">
              <Form.Label>Pick Your Team</Form.Label>
              <Form.Control
                as="select"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                required
              >
                <option key="defaultValue" value="" disabled>
                  --Please Select--
                </option>
                {teams != null &&
                  teams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="py-1">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
