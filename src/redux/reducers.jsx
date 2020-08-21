import { combineReducers } from "redux";

import { SET_USERNAME, GET_VOCAB, LOADING } from "./actions";

const loading = (state = false, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.status
      };
    default:
      return state;
  }
};

const initialUsername = { username: "" };
const username = (state = initialUsername, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
};

const initialVocab = { vocab: [] };
const vocab = (state = initialVocab, action) => {
  switch (action.type) {
    case GET_VOCAB:
      return {
        ...state,
        vocab: action.vocab
      };
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  loadingReducer: loading,
  usernameReducer: username,
  vocabReducer: vocab
});

export default rootReducers;
