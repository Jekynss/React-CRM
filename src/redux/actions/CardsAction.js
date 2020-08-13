import Axios from "axios";
import { dispatchDebouncer } from "../../components/utils";

export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const SET_INITIAL_CARDS = "SET_INITIAL_CARDS";
export const CLOSE_POPUP = "CLOSE_POPUP";
export const SHOW_SUCCESS_POPUP = "SHOW_SUCCESS_POPUP";
export const SHOW_ERROR_POPUP = "SHOW_ERROR_POPUP";
export const SET_LIMIT_HOME = "SET_LIMIT_HOME";
export const SET_LIMIT_PEOPLE = "SET_LIMIT_PEOPLE";

export const SET_TOKEN = "SET_TOKEN";
export const SET_REDIRECT = "SET_REDIRECT";

export const addCard = (card) => ({
  type: ADD_CARD,
  card,
});

export const deleteCard = (card_id) => ({
  type: DELETE_CARD,
  card_id,
});

export const updateCard = (card) => ({
  type: UPDATE_CARD,
  card,
});

export const setInitialCards = (cards) => ({
  type: SET_INITIAL_CARDS,
  cards,
});

export const closePopup = () => ({
  type: CLOSE_POPUP,
});

export const showSuccessPopup = (message) => ({
  type: SHOW_SUCCESS_POPUP,
  message,
});

export const showErrorPopup = (message) => ({
  type: SHOW_ERROR_POPUP,
  message,
});

export const setLimitHomeToRedux = (limit) => ({
  type: SET_LIMIT_HOME,
  limit,
});

export const setLimitPeopleToRedux = (limit) => ({
  type: SET_LIMIT_PEOPLE,
  limit,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setRedirect = (link) => ({
  type: SET_REDIRECT,
  link,
});

export const asyncAddCardRequest = (card) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `http://localhost:3002/api/v1/people`,
      card
    );
    dispatch(addCard(data.data));
    data.message
      ? dispatch(showSuccessPopup(data.message))
      : dispatch(showErrorPopup(data.error));
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
  dispatchDebouncer(closePopup, 3000);
};

export const asyncDeleteCardRequest = (card_id) => async (dispatch) => {
  try {
    const { data } = await Axios.delete(
      `http://127.0.0.1:3002/api/v1/people/${card_id}`
    );
    dispatch(deleteCard(card_id));
    dispatch(showSuccessPopup(data.message));
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
  dispatchDebouncer(closePopup, 3000);
};

export const asyncUpdateCardRequest = (card) => async (dispatch) => {
  try {
    const { data } = await Axios.put(
      `http://127.0.0.1:3002/api/v1/people/${card.id}`,
      card
    );
    dispatch(updateCard(card));
    dispatch(showSuccessPopup(data.message));
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
  dispatchDebouncer(closePopup, 3000);
};

export const asyncRegisterUser = (user) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `http://127.0.0.1:3002/api/v1/users/registration`,
      user
    );
    dispatch(showSuccessPopup(data.msg));
    dispatch(setRedirect("/login"));
  } catch (error) {
    dispatch(showErrorPopup(`${error.message}: ${error.response.data.msg}`));
  }
  dispatchDebouncer(closePopup, 3000);
};

export const asyncAuthorizeUser = (user) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `http://127.0.0.1:3002/api/v1/users/login`,
      user
    );
    dispatch(setToken(data.token));
    data.error
      ? dispatch(showErrorPopup(data.msg))
      : dispatch(setRedirect("/"));
  } catch (error) {
    dispatch(showErrorPopup(`${error.message}: ${error.response.data.msg}`));
  }
  dispatchDebouncer(closePopup, 3000);
};
