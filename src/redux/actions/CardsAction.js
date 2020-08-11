import Axios from "axios";

export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const SET_INITIAL_CARDS = "SET_INITIAL_CARDS";
export const CLOSE_POPUP = "CLOSE_POPUP";
export const SHOW_SUCCESS_POPUP = "SHOW_SUCCESS_POPUP";
export const SHOW_ERROR_POPUP = "SHOW_ERROR_POPUP";

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

export const asyncAddCardRequest = (card) => (dispatch) => {
  Axios.post(`http://localhost:3002/api/v1/people`, {
    ...card,
  })
    .then((response) => {
      card.id = response.data.id;
      dispatch(addCard(card));
      response.data.message ? dispatch(showSuccessPopup(response.data.message)) : dispatch(showErrorPopup(response.data.error))
      return response.status;
    })
    .catch((err) => showErrorPopup(err));
};

export const asyncDeleteCardRequest = (card_id) => (dispatch) => {
  Axios.delete(`http://127.0.0.1:3002/api/v1/people/${card_id}`)
    .then((response) => {
      dispatch(deleteCard(card_id));
      response.data.message ? dispatch(showSuccessPopup(response.data.message)) : dispatch(showErrorPopup(response.data.error))
      return response.status;
    })
    .catch((err) => {showErrorPopup(err.message)});
};

export const asyncUpdateCardRequest = (card) => (dispatch) => {
  Axios.put(`http://127.0.0.1:3002/api/v1/people/${card.id}`, {
    ...card,
  })
    .then((response) => {
      dispatch(updateCard(card));
      response.data.message ? dispatch(showSuccessPopup(response.data.message)) : dispatch(showErrorPopup(response.data.error))
      return response.status;
    })
    .catch((err) => showErrorPopup(err));
};
