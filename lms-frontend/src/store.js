import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userResetPasswordReducer,
  getUserProfileReducer,
  getAllUsersReducer,
  getUserCountByRoleReducer,
  getUserCountByTeamReducer,
  deleteUserByIdReducer,
  updateUserByIdReducer,
} from "./reducers/userReducers";

import {
  getTeamsReducer,
  addTeamReducer,
  deleteTeamByIdReducer,
  getTeamByIdReducer,
  updateTeamByIdReducer,
} from "./reducers/teamsReducers";
import {
  getLeavesReducer,
  submitLeaveReducer,
  removeLeaveByIdReducer,
  getLeaveByIdReducer,
  updateLeaveByIdReducer,
  getTeamLeavesReducer,
  getTeamLeavesGroupByMonth,
  getAllTeamLeavesReducer,
  getAllTeamLeavesGroupByMonth,
} from "./reducers/leavesReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  passwordReset: userResetPasswordReducer,
  getTeams: getTeamsReducer,
  leavesReducer: getLeavesReducer,
  submitLeaveReducer,
  removeLeaveByIdReducer,
  getLeaveByIdReducer,
  updateLeaveByIdReducer,
  getTeamLeavesReducer,
  getUserProfileReducer,
  getTeamLeavesGroupByMonth,
  addTeamReducer,
  deleteTeamByIdReducer,
  getTeamByIdReducer,
  updateTeamByIdReducer,
  getAllUsersReducer,
  getUserCountByRoleReducer,
  getUserCountByTeamReducer,
  deleteUserByIdReducer,
  updateUserByIdReducer,
  getAllTeamLeavesReducer,
  getAllTeamLeavesGroupByMonth,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
