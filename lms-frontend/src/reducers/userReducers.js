import {
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
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_USER_COUNT_BY_TEAM_REQUEST,
  GET_USER_COUNT_BY_TEAM_SUCCESS,
  GET_USER_COUNT_BY_TEAM_FAIL,
  GET_USER_COUNT_BY_ROLE_REQUEST,
  GET_USER_COUNT_BY_ROLE_SUCCESS,
  GET_USER_COUNT_BY_ROLE_FAIL,
  DELETE_USER_BY_ID_REQUEST,
  DELETE_USER_BY_ID_SUCCESS,
  DELETE_USER_BY_ID_FAIL,
  UPDATE_USER_BY_ID_REQUEST,
  UPDATE_USER_BY_ID_SUCCESS,
  UPDATE_USER_BY_ID_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { loading: false, userInfo: payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getUserProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_USER_PROFILE_REQUEST:
      return { loading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { loading: false, userProfile: payload };
    case GET_USER_PROFILE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, passwordResetResponse: action.payload };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_ALL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserCountByTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_COUNT_BY_TEAM_REQUEST:
      return { userCountByTeamLoading: true };
    case GET_USER_COUNT_BY_TEAM_SUCCESS:
      return { userCountByTeamLoading: false, userCountByTeam: action.payload };
    case GET_USER_COUNT_BY_TEAM_FAIL:
      return { userCountByTeamLoading: false, userCountByTeamError: action.payload };
    default:
      return state;
  }
};

export const getUserCountByRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_COUNT_BY_ROLE_REQUEST:
      return { userCountByRoleLoading: true };
    case GET_USER_COUNT_BY_ROLE_SUCCESS:
      return { userCountByRoleLoading: false, userCountByRole: action.payload };
    case GET_USER_COUNT_BY_ROLE_FAIL:
      return { userCountByRoleLoading: false, userCountByRoleError: action.payload };
    default:
      return state;
  }
};

export const deleteUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_BY_ID_REQUEST:
      return { deleteUserByIdLoading: true };
    case DELETE_USER_BY_ID_SUCCESS:
      return { deleteUserByIdLoading: false, successDelete: true };
    case DELETE_USER_BY_ID_FAIL:
      return {
        deleteUserByIdLoading: false,
        deleteUserByIdError: action.payload,
        successDelete: false,
      };
    default:
      return state;
  }
};

export const updateUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_BY_ID_REQUEST:
      return { updateUserByIdLoading: true };
    case UPDATE_USER_BY_ID_SUCCESS:
      return { updateUserByIdLoading: false, successUpdate: true };
    case UPDATE_USER_BY_ID_FAIL:
      return {
        updateUserByIdLoading: false,
        updateUserByIdError: action.payload,
        successUpdate: false,
      };
    default:
      return state;
  }
};
