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
  const user = await axios.get("/api/event");
  dispatch({
    type: GET_EVENTS,
    payload: user,
  });
};

export const addEvent = ({ date, notes }) => async (dispatch) => {
  await axios.post("/api/event", { date, notes });
};

export const deleteEvent = (id) => async (dispatch) => {
  await axios.delete(`/api/event/${id}`);
};
