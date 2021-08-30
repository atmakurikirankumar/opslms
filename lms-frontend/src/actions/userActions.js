import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_USER_COUNT_BY_TEAM_REQUEST,
  GET_USER_COUNT_BY_TEAM_SUCCESS,
  GET_USER_COUNT_BY_TEAM_FAIL,
  GET_USER_COUNT_BY_ROLE_REQUEST,
  GET_USER_COUNT_BY_ROLE_SUCCESS,
  GET_USER_COUNT_BY_ROLE_FAIL,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  DELETE_USER_BY_ID_REQUEST,
  DELETE_USER_BY_ID_SUCCESS,
  DELETE_USER_BY_ID_FAIL,
  UPDATE_USER_BY_ID_REQUEST,
  UPDATE_USER_BY_ID_SUCCESS,
  UPDATE_USER_BY_ID_FAIL,
} from "../constants/userConstants";
import { BASE_API } from "../constants/apiConstants";
import axios from "axios";

// Signin
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_API}/api/auth/signin`,
      { username, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// Reset Password
export const resetPassword = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_API}/api/auth/reset-password`,
      { username, password },
      config
    );

    dispatch({
      type: USER_RESET_PASSWORD_SUCCESS,
      payload: data,
    });

    localStorage.getItem("userInfo") && localStorage.removeItem("userInfo");
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

// Signup
export const register = (firstname, lastname, username, password, team) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_API}/api/auth/signup`,
      { firstname, lastname, username, password, team },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// get User Profile
export const getUserProfile = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/auth/profile`, config);

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// get all users
export const getAllUsers = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/users/all`, config);

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// getUserCountByTeam
export const getUserCountByTeam = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({ type: GET_USER_COUNT_BY_TEAM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/users/teamsize`, config);

    dispatch({
      type: GET_USER_COUNT_BY_TEAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_COUNT_BY_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

// getUserCountByRole
export const getUserCountByRole = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({ type: GET_USER_COUNT_BY_ROLE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_API}/api/users/rolesize`, config);

    dispatch({
      type: GET_USER_COUNT_BY_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_COUNT_BY_ROLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

export const deleteUserById = (id) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({ type: DELETE_USER_BY_ID_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`${BASE_API}/api/users/${id}`, config);

    dispatch({
      type: DELETE_USER_BY_ID_SUCCESS,
      payload: data,
    });
    dispatch(getAllUsers());
    dispatch(getUserCountByRole());
    dispatch(getUserCountByTeam());
  } catch (error) {
    dispatch({
      type: DELETE_USER_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};

export const updateUserById = (id, firstname, lastname, teamname, isAdmin) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;
  try {
    dispatch({ type: UPDATE_USER_BY_ID_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_API}/api/users/${id}`,
      { firstname, lastname, teamname, isAdmin },
      config
    );

    dispatch({
      type: UPDATE_USER_BY_ID_SUCCESS,
      payload: data,
    });
    dispatch(getAllUsers());
    dispatch(getUserCountByRole());
    dispatch(getUserCountByTeam());
  } catch (error) {
    dispatch({
      type: UPDATE_USER_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
          ? error.response.data.errors
          : error.message,
    });
  }
};
