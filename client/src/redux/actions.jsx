import axios from "axios";

export const LOADING = "LOADING";
export const SET_USERNAME = "SET_USERNAME";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_VOCAB = "GET_VOCAB";

export const getUsername = () => async dispatch => {
  const username = await localStorage.getItem("username");
  dispatch({ type: SET_USERNAME, username: username });
  return username;
};

export const notLogin = () => async dispatch => {
  await localStorage.setItem("username", "Someone");
  dispatch({ type: SET_USERNAME, username: "Someone" });
  return "Someone";
};

export const login = username => async dispatch => {
  const res = await axios.post(`/api/login`, { username: username });
  await localStorage.setItem("username", username);
  dispatch({ type: SET_USERNAME, username: res.data });
  return res.data;
};

export const logout = () => async dispatch => {
  await localStorage.removeItem("username");
  dispatch({ type: SET_USERNAME, username: "" });
  return true;
};

export const getVocab = username => async dispatch => {
  try {
    dispatch({ type: LOADING, status: true });
    const res = await axios.get(`/api/card/${username}`);
    dispatch({ type: GET_VOCAB, vocab: res.data });
    dispatch({ type: LOADING, status: false });
    return true;
  } catch (err) {
    return false;
  }
};

export const addVocab = ({ username, word, hint, trans }) => async dispatch => {
  try {
    dispatch({ type: LOADING, status: true });
    await axios.post(`/api/card/${username}`, { word, hint, trans });
    dispatch({ type: LOADING, status: false });
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteVocab = ({ username, id }) => async dispatch => {
  try {
    dispatch({ type: LOADING, status: true });
    await axios.delete(`/api/card/${username}/${id}`);
    dispatch({ type: LOADING, status: false });
    return true;
  } catch (err) {
    return false;
  }
};
