import {
  GET_TEAMS_FAIL,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  ADD_TEAM_FAIL,
  ADD_TEAM_REQUEST,
  ADD_TEAM_SUCCESS,
  DELETE_TEAM_BY_ID_FAIL,
  DELETE_TEAM_BY_ID_REQUEST,
  DELETE_TEAM_BY_ID_SUCCESS,
  GET_TEAM_BY_ID_REQUEST,
  GET_TEAM_BY_ID_SUCCESS,
  GET_TEAM_BY_ID_FAIL,
  UPDATE_TEAM_BY_ID_REQUEST,
  UPDATE_TEAM_BY_ID_SUCCESS,
  UPDATE_TEAM_BY_ID_FAIL,
} from "../constants/teamsConstants";

export const getTeamsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAMS_REQUEST:
      return { getTeamsloading: true };
    case GET_TEAMS_SUCCESS:
      return { getTeamsloading: false, teams: action.payload };
    case GET_TEAMS_FAIL:
      return { getTeamsloading: false, getTeamsError: action.payload };
    default:
      return state;
  }
};

export const addTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEAM_REQUEST:
      return { addTeamLoading: true };
    case ADD_TEAM_SUCCESS:
      return { addTeamLoading: false, successCreate: true };
    case ADD_TEAM_FAIL:
      return { addTeamLoading: false, successCreate: false, addTeamError: action.payload };
    default:
      return state;
  }
};

export const updateTeamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TEAM_BY_ID_REQUEST:
      return { updateTeamByIdLoading: true };
    case UPDATE_TEAM_BY_ID_SUCCESS:
      return { updateTeamByIdLoading: false, successUpdate: true };
    case UPDATE_TEAM_BY_ID_FAIL:
      return {
        updateTeamByIdLoading: false,
        successUpdate: false,
        updateTeamByIdError: action.payload,
      };
    default:
      return state;
  }
};

export const deleteTeamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TEAM_BY_ID_REQUEST:
      return { deleteTeamByIdLoading: true };
    case DELETE_TEAM_BY_ID_SUCCESS:
      return { deleteTeamByIdLoading: false, successDelete: true };
    case DELETE_TEAM_BY_ID_FAIL:
      return {
        deleteTeamByIdLoading: false,
        successDelete: false,
        deleteTeamByIdError: action.payload,
      };
    default:
      return state;
  }
};

export const getTeamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAM_BY_ID_REQUEST:
      return { getTeamByIdLoading: true };
    case GET_TEAM_BY_ID_SUCCESS:
      return { getTeamByIdLoading: false, team: action.payload };
    case GET_TEAM_BY_ID_FAIL:
      return {
        getTeamByIdLoading: false,
        getTeamByIdError: action.payload,
      };
    default:
      return state;
  }
};
