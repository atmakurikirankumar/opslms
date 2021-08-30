import { getLeaves, submitLeave } from "../actions/leavesActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal, ButtonGroup, Col, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { LinkContainer } from "react-router-bootstrap";
import { removeLeaveById } from "../actions/leavesActions";
import moment from "moment";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const leavesReducer = useSelector((state) => state.leavesReducer);
  const { loading, error, leaves } = leavesReducer;

  const [show, setShow] = useState(false);
  const [leaveToCancel, setLeaveToCancel] = useState(null);

  const formatDate = (date) => {
    let d;
    if (date === undefined) {
      d = new Date();
    } else {
      d = new Date(date);
    }

    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [comments, setComments] = useState("");

  let { submitLeaveLoading, submitLeaveError } = useSelector((state) => state.submitLeaveReducer);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    setComments("");
    setStartdate("");
    setEnddate("");
    dispatch(getLeaves());
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(submitLeave(startdate, enddate, comments));
    setComments("");
    setStartdate("");
    setEnddate("");
  };

  const calculateNumberOfDays = (sdate, edate) => {
    let start = moment(sdate);
    let end = moment(edate);
    let weekdayCounter = 0;
    while (start <= end) {
      if (start.format("ddd") !== "Sat" && start.format("ddd") !== "Sun") {
        weekdayCounter++;
      }
      start = moment(start).add(1, "days");
    }
    return weekdayCounter;
  };

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

  const columns = [
    {
      dataField: "_id",
      text: "Id",
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      csvText: "Leave Id",
    },
    {
      dataField: "startdate",
      text: "Start Date",
      csvText: "Leave Start Date",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      sort: true,
    },
    {
      dataField: "enddate",
      text: "End Date",
      csvText: " Leave End Date",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      sort: true,
    },
    {
      dataField: "#Days",
      text: "#Days",
      csvText: "Number Of Days",
      csvFormatter: (cell, row, rowIndex) => {
        return calculateNumberOfDays(format(row.startdate), format(row.enddate));
      },
      isDummyField: true,
      formatter: (cellContent, row) => {
        return calculateNumberOfDays(format(row.startdate), format(row.enddate));
      },
    },
    {
      dataField: "comments",
      text: "Comments",
      csvText: "Comments",
    },
    {
      dataField: "createdAt",
      text: "Submitted On",
      csvText: "Leave Applied On",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
    },
    {
      dataField: "updatedAt",
      text: "Last Modified On",
      csvText: "Leave Request Modified On",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
    },
    {
      dataField: "Action",
      text: "",
      csvExport: false,
      isDummyField: true,
      formatter: (cellContent, row) => {
        return (
          <ButtonGroup>
            <LinkContainer to={`/leaves/${row._id}/edit`}>
              <Button variant="info">
                <i className="fas fa-edit"></i>
              </Button>
            </LinkContainer>
            <Button
              variant="warning"
              onClick={() => {
                setLeaveToCancel(row._id);
                setShow(true);
              }}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  const getFileName = () => {
    const userid = userInfo && userInfo._id;
    return `${userid}.csv`;
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-info">Are you sure to remove the leave request ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              setShow(false);
              dispatch(removeLeaveById(leaveToCancel));
            }}
          >
            Yes
          </Button>
          <Button variant="info" onClick={() => setShow(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <h2>Submit Your Leave</h2>
        <Col sm={2}></Col>
        <Col sm={5}>
          {submitLeaveError && Array.isArray(submitLeaveError)
            ? submitLeaveError.map((msg) => <Message variant="warning">{msg}</Message>)
            : submitLeaveError && <Message variant="warning">{submitLeaveError}</Message>}
          {submitLeaveLoading && <Loader />}
        </Col>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} className="mb-3" controlId="stardate">
            <Form.Label column sm={2}>
              Start Date
            </Form.Label>
            <Col sm={3}>
              <Flatpickr
                data-enable-time
                value={startdate}
                placeholder="Start Date"
                required
                options={{
                  enableTime: false,
                  allowInput: true,
                  disable: [
                    function (dt) {
                      return dt.getDay() === 0 || dt.getDay() === 6;
                    },
                  ],
                }}
                onChange={(dt) => setStartdate(formatDate(dt))}
                className="form-control"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="enddate">
            <Form.Label column sm={2}>
              End Date
            </Form.Label>
            <Col sm={3}>
              <Flatpickr
                data-enable-time
                value={enddate}
                placeholder="End Date"
                required
                options={{
                  enableTime: false,
                  allowInput: true,
                  disable: [
                    function (dt) {
                      return dt.getDay() === 0 || dt.getDay() === 6;
                    },
                  ],
                }}
                onChange={(dt) => setEnddate(formatDate(dt))}
                className="form-control"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="enddate">
            <Form.Label column sm={2}>
              Comments
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="primary">
                Submit Leave
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>

      <hr />

      <Row>
        <h2>Your Upcoming PTO</h2>
        {error && <Message variant="warning">{error}</Message>}
        {loading && <Loader />}
        {leaves && leaves.length === 0 && (
          <Message variant="success">You dont have any upcoming PTO</Message>
        )}
        {leaves && leaves.length > 0 && (
          <ToolkitProvider
            keyField="_id"
            data={leaves}
            columns={columns}
            exportCSV={{
              fileName: getFileName(),
            }}
          >
            {(props) => (
              <div>
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  pagination={paginationFactory({ sizePerPage: 3 })}
                  striped
                  hover
                  responsive
                />
                <MyExportCSV {...props.csvProps} />
              </div>
            )}
          </ToolkitProvider>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
