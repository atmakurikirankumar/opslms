import {
  GET_LEAVES_FAIL,
  GET_LEAVES_REQUEST,
  GET_LEAVES_SUCCESS,
  GET_TEAM_LEAVES_FAIL,
  GET_TEAM_LEAVES_REQUEST,
  GET_TEAM_LEAVES_SUCCESS,
  GET_LEAVE_BY_ID_FAIL,
  GET_LEAVE_BY_ID_REQUEST,
  GET_LEAVE_BY_ID_SUCCESS,
  GET_LEVE_BY_ID_RESET,
  REMOVE_LEAVE_BY_ID_FAIL,
  REMOVE_LEAVE_BY_ID_REQUEST,
  REMOVE_LEAVE_BY_ID_SUCCESS,
  SUBMIT_LEAVE_FAIL,
  SUBMIT_LEAVE_REQUEST,
  SUBMIT_LEAVE_SUCCESS,
  UPDATE_LEAVE_BY_ID_FAIL,
  UPDATE_LEAVE_BY_ID_REQUEST,
  UPDATE_LEAVE_BY_ID_SUCCESS,
  UPDATE_LEAVE_BY_ID_RESET,
  GET_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST,
  GET_TEAM_LEAVES_GROUP_BY_MONTH_FAIL,
  GET_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS,
  GET_ALL_TEAM_LEAVES_REQUEST,
  GET_ALL_TEAM_LEAVES_SUCCESS,
  GET_ALL_TEAM_LEAVES_FAIL,
  GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST,
  GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS,
  GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_FAIL,
} from "../constants/leavesConstants";

export const getLeavesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LEAVES_REQUEST:
      return { loading: true };
    case GET_LEAVES_SUCCESS:
      return { loading: false, leaves: action.payload };
    case GET_LEAVES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTeamLeavesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAM_LEAVES_REQUEST:
      return { loading: true };
    case GET_TEAM_LEAVES_SUCCESS:
      return { loading: false, leaves: action.payload };
    case GET_TEAM_LEAVES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllTeamLeavesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TEAM_LEAVES_REQUEST:
      return { loading: true };
    case GET_ALL_TEAM_LEAVES_SUCCESS:
      return { loading: false, leaves: action.payload };
    case GET_ALL_TEAM_LEAVES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTeamLeavesGroupByMonth = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST:
      return { groupByMonthLeavesLoading: true };
    case GET_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS:
      return { groupByMonthLeavesLoading: false, groupByMonthLeaves: action.payload };
    case GET_TEAM_LEAVES_GROUP_BY_MONTH_FAIL:
      return { groupByMonthLeavesLoading: false, groupByMonthLeavesError: action.payload };
    default:
      return state;
  }
};

export const getAllTeamLeavesGroupByMonth = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_REQUEST:
      return { groupByMonthLeavesLoading: true };
    case GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_SUCCESS:
      return { groupByMonthLeavesLoading: false, groupByMonthLeaves: action.payload };
    case GET_ALL_TEAM_LEAVES_GROUP_BY_MONTH_FAIL:
      return { groupByMonthLeavesLoading: false, groupByMonthLeavesError: action.payload };
    default:
      return state;
  }
};

export const submitLeaveReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_LEAVE_REQUEST:
      return { submitLeaveLoading: true };
    case SUBMIT_LEAVE_SUCCESS:
      return { submitLeaveLoading: false, savedLeave: action.payload };
    case SUBMIT_LEAVE_FAIL:
      return { submitLeaveLoading: false, submitLeaveError: action.payload };
    default:
      return state;
  }
};

export const removeLeaveByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_LEAVE_BY_ID_REQUEST:
      return { loading: true };
    case REMOVE_LEAVE_BY_ID_SUCCESS:
      return { loading: false, leave: action.payload };
    case REMOVE_LEAVE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getLeaveByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LEAVE_BY_ID_REQUEST:
      return { loading: true };
    case GET_LEAVE_BY_ID_SUCCESS:
      return { loading: false, leave: action.payload };
    case GET_LEAVE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case GET_LEVE_BY_ID_RESET:
      return { leave: {} };
    default:
      return state;
  }
};

export const updateLeaveByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LEAVE_BY_ID_REQUEST:
      return { updateLeaveLoading: true };
    case UPDATE_LEAVE_BY_ID_SUCCESS:
      return { updateLeaveLoading: false, updatedLeave: action.payload, successUpdate: true };
    case UPDATE_LEAVE_BY_ID_FAIL:
      return { updateLeaveLoading: false, updateLeaveError: action.payload, successUpdate: false };
    case UPDATE_LEAVE_BY_ID_RESET:
      return { updatedLeave: {}, successUpdate: false };
    default:
      return state;
  }
};
