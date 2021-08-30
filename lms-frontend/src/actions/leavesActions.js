import {
  GET_LEAVES_FAIL,
  GET_LEAVES_REQUEST,
  GET_LEAVES_SUCCESS,
  GET_LEAVE_BY_ID_FAIL,
  GET_LEAVE_BY_ID_REQUEST,
  GET_LEAVE_BY_ID_SUCCESS,
  UPDATE_LEAVE_BY_ID_FAIL,
  UPDATE_LEAVE_BY_ID_REQUEST,
  UPDATE_LEAVE_BY_ID_SUCCESS,
  REMOVE_LEAVE_BY_ID_FAIL,
  REMOVE_LEAVE_BY_ID_REQUEST,
  REMOVE_LEAVE_BY_ID_SUCCESS,
  SUBMIT_LEAVE_FAIL,
  SUBMIT_LEAVE_REQUEST,
  SUBMIT_LEAVE_SUCCESS,
  GET_TEAM_LEAVES_REQUEST,
  GET_TEAM_LEAVES_SUCCESS,
  GET_TEAM_LEAVES_FAIL,
  GET_ALL_TEAM_LEAVES_REQUEST,
  GET_ALL_TEAM_LEAVES_SUCCESS,
  GET_ALL_TEAM_LEAVES_FAIL,
  GET_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST,
  GET_TEAM_LEAVES_GROUP_BY_MONTH_FAIL,
  GET_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS,
  GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST,
  GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS,
  GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_FAIL,
} from "../constants/leavesConstants";
import axios from "axios";
import { BASE_API } from "../constants/apiConstants";

//get leaves
export const getLeaves = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: GET_LEAVES_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/leaves`, config);

    dispatch({
      type: GET_LEAVES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// get leave by id
export const getLeaveById = (id) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: GET_LEAVE_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/leaves/${id}`, config);

    dispatch({
      type: GET_LEAVE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LEAVE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// remove leave by id
export const removeLeaveById = (id) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: REMOVE_LEAVE_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`${BASE_API}/api/leaves/${id}`, config);

    dispatch({
      type: REMOVE_LEAVE_BY_ID_SUCCESS,
      payload: data,
    });

    dispatch(getLeaves());
  } catch (error) {
    dispatch({
      type: REMOVE_LEAVE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// add leave
export const submitLeave = (startdate, enddate, comments) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: SUBMIT_LEAVE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_API}/api/leaves`,
      { startdate, enddate, comments },
      config
    );

    dispatch({
      type: SUBMIT_LEAVE_SUCCESS,
      payload: data,
    });

    dispatch(getLeaves());
  } catch (error) {
    dispatch({
      type: SUBMIT_LEAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// update leave by id
export const updateLeaveById = (id, startdate, enddate, comments) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: UPDATE_LEAVE_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_API}/api/leaves/${id}`,
      { startdate, enddate, comments },
      config
    );

    dispatch({
      type: UPDATE_LEAVE_BY_ID_SUCCESS,
      payload: data,
    });

    dispatch(getLeaves());
  } catch (error) {
    dispatch({
      type: UPDATE_LEAVE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

//get team leaves
export const getTeamLeaves = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  const userId = userInfo && userInfo._id;
  try {
    dispatch({
      type: GET_TEAM_LEAVES_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/leaves/${userId}/team`, config);

    dispatch({
      type: GET_TEAM_LEAVES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEAM_LEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

//get team leaves group by month
export const getTeamLeavesGroupByMonth = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: GET_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/leaves/team/groupbymonth`, config);

    dispatch({
      type: GET_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEAM_LEAVES_GROUP_BY_MONTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

//get team leaves
export const getAllTeamLeaves = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: GET_ALL_TEAM_LEAVES_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/leaves/all`, config);

    dispatch({
      type: GET_ALL_TEAM_LEAVES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEAM_LEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

//get allteam leaves group by month
export const getAllTeamLeavesGroupByMonth = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/leaves/all/groupbymonth`, config);

    dispatch({
      type: GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};
