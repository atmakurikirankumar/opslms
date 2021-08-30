import Message from "../components/Message";
import Loader from "../components/Loader";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { addTeam, getTeamsList, deleteTeamById, updateTeamById } from "../actions/teamsActions";
import { useDispatch, useSelector } from "react-redux";

const ManageTeams = ({ history }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [teamname, setTeamname] = useState("");
  const [teamname1, setTeamname1] = useState("");
  const [teamToDelete, setTeamToDelete] = useState("");
  const [teamId, setTeamId] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);
  const { getTeamsloading, teams, getTeamsError } = useSelector((state) => state.getTeams);
  const { addTeamLoading, addTeamError } = useSelector((state) => state.addTeamReducer);
  const { successUpdate } = useSelector((state) => state.updateTeamByIdReducer);

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

  const columns = [
    {
      dataField: "_id",
      text: "Id",
      csvText: "Team Id",
    },
    {
      dataField: "name",
      text: "Team Name",
      csvText: "Team Name",
      sort: true,
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
                setEditShow(true);
                setTeamname1(row.name);
                setTeamId(row._id);
              }}
            >
              <i className="fas fa-edit"></i>
            </Button>

            <Button
              variant="warning"
              onClick={() => {
                setTeamToDelete(row._id);
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addTeam(teamname));
    setTeamname("");
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getTeamsList());
    } else {
      history.push("/login");
    }

    if (successUpdate) {
      dispatch(getTeamsList());
    }
  }, [dispatch, history, userInfo, successUpdate]);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-info">Are you sure to remove the team ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              setShow(false);
              dispatch(deleteTeamById(teamToDelete));
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
          <Modal.Title>Change your team name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3" controlId="teamname1">
            <Form.Label column sm={4}>
              <strong>Team Name:</strong>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={teamname1}
                onChange={(e) => setTeamname1(e.target.value)}
                required
              ></Form.Control>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(updateTeamById(teamId, teamname1));
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
        <h2>Add a New Team</h2>
        <Col sm={6}>
          {addTeamLoading && <Loader />}
          {addTeamError && <Message variant="warning">{addTeamError}</Message>}
        </Col>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} className="mb-3" controlId="teamname">
            <Form.Label column sm={2}>
              Team Name
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="Enter Team Name"
                value={teamname}
                onChange={(e) => setTeamname(e.target.value)}
                required
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="primary">
                Save Team
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>

      <hr />

      <Row>
        <Col md={8}>
          <h2>Teams List</h2>
          {getTeamsError && <Message variant="warning">{getTeamsError}</Message>}
          {getTeamsloading && <Loader />}
          {teams && teams.length === 0 && (
            <Message variant="success">No Team is created yet</Message>
          )}
          {teams && teams.length > 0 && (
            <ToolkitProvider
              keyField="_id"
              data={teams}
              columns={columns}
              exportCSV={{
                fileName: "teams.csv",
              }}
            >
              {(props) => (
                <div>
                  <BootstrapTable
                    {...props.baseProps}
                    bootstrap4
                    pagination={paginationFactory({ sizePerPage: 10 })}
                    striped
                    hover
                    responsive
                  />
                  <MyExportCSV {...props.csvProps} />
                </div>
              )}
            </ToolkitProvider>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageTeams;
