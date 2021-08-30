import React, { useState, useEffect } from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getLeaveById, updateLeaveById } from "../actions/leavesActions";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { UPDATE_LEAVE_BY_ID_RESET, GET_LEVE_BY_ID_RESET } from "../constants/leavesConstants";
import _ from "lodash";

const LeaveEditScreen = ({ match, history }) => {
  const leaveId = match.params.id;

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

  const dispatch = useDispatch();

  const { loading, leave, error } = useSelector((state) => state.getLeaveByIdReducer);

  const { updateLeaveLoading, successUpdate, updateLeaveError } = useSelector(
    (state) => state.updateLeaveByIdReducer
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const format = (str) => {
    return str.substring(0, 10);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (successUpdate) {
      dispatch({ type: GET_LEVE_BY_ID_RESET });
      dispatch({ type: UPDATE_LEAVE_BY_ID_RESET });
      history.push("/");
    } else {
      if (!leave || _.isEmpty(leave)) {
        dispatch(getLeaveById(leaveId));
      } else {
        setStartdate(format(leave.startdate));
        setEnddate(format(leave.enddate));
        setComments(leave.comments);
      }
    }
  }, [dispatch, history, leaveId, leave, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateLeaveById(leaveId, startdate, enddate, comments));
  };

  return (
    <>
      <FormContainer>
        <h2>Modify Your Leave</h2>
        {error && <Message variant="warning">{error}</Message>}
        {loading && <Loader />}
        {updateLeaveError && <Message variant="warning">{updateLeaveError}</Message>}
        {updateLeaveLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="startdate">
            <Form.Label>Start Date</Form.Label>
            <Flatpickr
              data-enable-time
              value={startdate}
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
          </Form.Group>

          <Form.Group controlId="enddate">
            <Form.Label>End Date</Form.Label>
            <Flatpickr
              data-enable-time
              value={enddate}
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
          </Form.Group>

          <Form.Group controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </Form.Group>
          <ButtonGroup>
            <Button type="submit" variant="primary" className="mt-3">
              Modify Leave
            </Button>
            <Button
              type="button"
              className="mt-3 btn-danger"
              onClick={() => {
                dispatch({ type: GET_LEVE_BY_ID_RESET });
                dispatch({ type: UPDATE_LEAVE_BY_ID_RESET });
                history.push("/");
              }}
            >
              Go Back
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </>
  );
};

export default LeaveEditScreen;
