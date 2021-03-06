import axios from "axios";
import { FETCH_USER, GET_EVENTS } from "./types";

export const fetchUser = () => async (dispatch) => {
  const user = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: user.data,
  });
};

export const getEvents = () => async (dispatch) => {
  const events = await axios.get("/api/event");
  dispatch({
    type: GET_EVENTS,
    payload: events,
  });
};

export const addEvent = ({ date, notes }) => async (dispatch) => {
  const response = await axios.post("/api/event", { date, notes });
  return response;
};

export const deleteEvent = (id) => async (dispatch) => {
  await axios.delete(`/api/event/${id}`);
  const events = await axios.get("/api/event");
  dispatch({
    type: GET_EVENTS,
    payload: events,
  });
};
