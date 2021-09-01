import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import React, { useState, useEffect } from "react";
import "flatpickr/dist/themes/material_blue.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import {
  deleteUserById,
  getAllUsers,
  getUserCountByRole,
  getUserCountByTeam,
  updateUserById,
} from "../actions/userActions";
import { Button, Row, Modal, Col, Form } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { getTeamsList } from "../actions/teamsActions";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.getAllUsersReducer);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userCountByTeamLoading, userCountByTeamError, userCountByTeam } = useSelector(
    (state) => state.getUserCountByTeamReducer
  );
  const { userCountByRoleLoading, userCountByRoleError, userCountByRole } = useSelector(
    (state) => state.getUserCountByRoleReducer
  );
  const { teams } = useSelector((state) => state.getTeams);
  const { deleteUserByIdError } = useSelector((state) => state.deleteUserByIdReducer);

  const { successUpdate, updateUserByIdError } = useSelector(
    (state) => state.updateUserByIdReducer
  );

  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const [userid, setUserid] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [teamname, setTeamname] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <Button variant="primary" onClick={handleClick}>
          Export to CSV
        </Button>
      </div>
    );
  };

  const format = (str) => {
    return str.substring(0, 10);
  };

  const CaptionElement = () => (
    <h2
      style={{
        borderRadius: "0.5em",
        textAlign: "center",
        color: "purple",
        border: "1px solid purple",
        padding: "0.5em",
      }}
    >
      Users List
    </h2>
  );

  const columns = [
    {
      dataField: "id",
      text: "Id",
      csvText: "User Id",
      hidden: true,
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
    },
    {
      dataField: "firstname",
      text: "First Name",
      csvText: "First Name",
      sort: true,
      filter: textFilter({ placeholder: "Enter First Name" }),
    },
    {
      dataField: "lastname",
      text: "Last Name",
      csvText: "Last Name",
      sort: true,
      filter: textFilter({ placeholder: "Enter Last Name" }),
    },
    {
      dataField: "username",
      text: "User Name",
      csvText: "User Name",
      sort: true,
      filter: textFilter({ placeholder: "Enter User Name" }),
    },
    {
      dataField: "team",
      text: "Team Name",
      csvText: "Team Name",
      sort: true,
      filter: textFilter({ placeholder: "Enter Team Name" }),
    },
    {
      dataField: "role",
      text: "Role Name",
      csvText: "Role Name",
      sort: true,
      filter: textFilter({ placeholder: "Enter Role Name" }),
    },
    {
      dataField: "isAdmin",
      text: "Admin",
      csvText: "Admin",
      formatter: (cellContent, row) => {
        return (
          <>
            {cellContent ? (
              <i className="fas fa-check-circle fa-2x" style={{ color: "green" }}></i>
            ) : (
              <i className="fas fa-times-circle fa-2x" style={{ color: "red" }}></i>
            )}
          </>
        );
      },
    },
    {
      dataField: "Action",
      text: "",
      csvExport: false,
      isDummyField: true,
      formatter: (cellContent, row) => {
        return (
          <>
            <Button
              variant="info"
              onClick={() => {
                dispatch(getTeamsList());
                setEditShow(true);
                setFirstname(row.firstname);
                setLastname(row.lastname);
                setTeamname(row.team);
                setIsAdmin(row.isAdmin);
                setUserid(row.id);
              }}
            >
              <i className="fas fa-edit"></i>
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                setUserid(row.id);
                setShow(true);
              }}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers());
      dispatch(getUserCountByTeam());
      dispatch(getUserCountByRole());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-info">Are you sure to remove the user ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              setShow(false);
              dispatch(deleteUserById(userid));
            }}
          >
            Yes
          </Button>
          <Button variant="info" onClick={() => setShow(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={editShow} onHide={() => setEditShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Change User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="firstname">
            <Form.Label>First Name</Form.Label>

            <Form.Control
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastname">
            <Form.Label>Last Name</Form.Label>

            <Form.Control
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="teamname" className="mb-3">
            <Form.Label>Pick Your Team</Form.Label>
            <Col>
              <Form.Control
                as="select"
                value={teamname}
                onChange={(e) => setTeamname(e.target.value)}
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
            </Col>
          </Form.Group>

          <Form.Group controlId="isadmin" className="mb-3">
            <Form.Check
              type="checkbox"
              label="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(updateUserById(userid, firstname, lastname, teamname, isAdmin));
              setEditShow(false);
            }}
          >
            Save
          </Button>
          <Button variant="info" onClick={() => setEditShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Row>
          <Col sm={5}>
            {error && <Message variant="warning">{error}</Message>}
            {deleteUserByIdError && <Message variant="warning">{deleteUserByIdError}</Message>}
            {updateUserByIdError && <Message variant="warning">{updateUserByIdError}</Message>}
            {successUpdate && <Message variant="info">{"User updated successfully"}</Message>}
            {loading && <Loader />}
            {users && users.length === 0 && (
              <Message variant="success">No registerd users available</Message>
            )}
          </Col>
        </Row>

        {users && users.length > 0 && (
          <ToolkitProvider
            keyField="id"
            data={users}
            columns={columns}
            exportCSV={{
              fileName: "users_list.csv",
            }}
          >
            {(props) => (
              <div>
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  pagination={paginationFactory({ sizePerPage: 5 })}
                  caption={<CaptionElement />}
                  filter={filterFactory()}
                  filterPosition={"top"}
                  hover
                  responsive
                />
                <MyExportCSV {...props.csvProps} />
              </div>
            )}
          </ToolkitProvider>
        )}
      </Row>
      <hr />
      <Row>
        <Col>
          <h2>Team Size Chart</h2>
          {userCountByTeamError && <Message variant="warning">{userCountByTeamError}</Message>}
          {userCountByTeamLoading && <Loader />}
          {userCountByTeam && (
            <AreaChart
              width={600}
              height={200}
              data={userCountByTeam}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="teamname" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              {/* <Bar dataKey="count" fill="#8884d8" /> */}
              <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          )}
        </Col>
        <Col>
          <h2>Role Size Chart</h2>
          {userCountByRoleError && <Message variant="warning">{userCountByRoleError}</Message>}
          {userCountByRoleLoading && <Loader />}
          {userCountByRole && (
            <BarChart
              width={600}
              height={200}
              data={userCountByRole}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rolename" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserListScreen;
