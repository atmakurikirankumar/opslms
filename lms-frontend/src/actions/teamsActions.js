import {
  GET_TEAMS_FAIL,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  ADD_TEAM_FAIL,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_REQUEST,
  DELETE_TEAM_BY_ID_REQUEST,
  DELETE_TEAM_BY_ID_SUCCESS,
  DELETE_TEAM_BY_ID_FAIL,
  GET_TEAM_BY_ID_REQUEST,
  GET_TEAM_BY_ID_SUCCESS,
  GET_TEAM_BY_ID_FAIL,
  UPDATE_TEAM_BY_ID_REQUEST,
  UPDATE_TEAM_BY_ID_SUCCESS,
  UPDATE_TEAM_BY_ID_FAIL,
} from "../constants/teamsConstants";
import axios from "axios";

//get teams
export const getTeamsList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TEAMS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/teams`, config);

    dispatch({
      type: GET_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEAMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

export const addTeam = (teamname) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: ADD_TEAM_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/teams`, { teamname }, config);

    dispatch({
      type: ADD_TEAM_SUCCESS,
      payload: data,
    });

    dispatch(getTeamsList());
  } catch (error) {
    dispatch({
      type: ADD_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

export const deleteTeamById = (id) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: DELETE_TEAM_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/teams/${id}`, config);

    dispatch({
      type: DELETE_TEAM_BY_ID_SUCCESS,
      payload: data,
    });

    dispatch(getTeamsList());
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

export const getTeamById = (id) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: GET_TEAM_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/teams/${id}`, config);

    dispatch({
      type: GET_TEAM_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEAM_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

export const updateTeamById = (id, name) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({
      type: UPDATE_TEAM_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/teams/${id}`, { name }, config);

    dispatch({
      type: UPDATE_TEAM_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEAM_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};
