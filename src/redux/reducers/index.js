import { combineReducers } from "redux";
import appState from './appState'
import teachers from "./teachers";
import authReducer from "./auth";
import admins from './admins'
import students from './students'
import classes from "./classes";
import sessions from "./sessions"
import grades from "./grades";
import payroll from "./payroll";
import financials from "./financials";
import homework from "./homework"

export default combineReducers({appState, teachers, authReducer, admins, students, classes, sessions, grades, payroll, financials, homework})