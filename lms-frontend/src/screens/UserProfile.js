import React, { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const UserProfile = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const { loading, error, userProfile } = useSelector((state) => state.getUserProfileReducer);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(getUserProfile());
  }, [history, userInfo, dispatch]);

  return (
    <>
      <Row>
        <Col md={5}>
          {error && <Message variant="warning">{error}</Message>}
          {loading && <Loader />}
          {userProfile && (
            <>
              <h2>User Profile</h2>
              <Table striped hover responsive bordered size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td>{userProfile.id}</td>
                  </tr>
                  <tr>
                    <td>First Name</td>
                    <td>{userProfile.firstname}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{userProfile.lastname}</td>
                  </tr>
                  <tr>
                    <td>Full Name</td>
                    <td>{`${userProfile.firstname} ${userProfile.lastname}`}</td>
                  </tr>
                  <tr>
                    <td>User Name</td>
                    <td>{userProfile.username}</td>
                  </tr>
                  <tr>
                    <td>Team</td>
                    <td>{userProfile.team}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{userProfile.role}</td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>
                      {userProfile.isAdmin ? (
                        <i className="fas fa-check-circle fa-2x" style={{ color: "green" }}></i>
                      ) : (
                        <i className="fas fa-times-circle fa-2x" style={{ color: "red" }}></i>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Leaves Taken this Year</td>
                    <td>{userProfile.leavesTakenThisYear}</td>
                  </tr>
                </tbody>
              </Table>
              <h6>{"ROLE_ADMIN" === userProfile.role}</h6>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
