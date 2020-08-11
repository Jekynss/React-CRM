import Axios from "axios";

export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const SET_INITIAL_CARDS = "SET_INITIAL_CARDS";
export const CLOSE_POPUP = "CLOSE_POPUP";
export const SHOW_SUCCESS_POPUP = "SHOW_SUCCESS_POPUP";
export const SHOW_ERROR_POPUP = "SHOW_ERROR_POPUP";
export const SET_LIMIT = "SET_LIMIT";

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

export const increaseLimitToRedux = (sumNumber) => ({
    type: SET_LIMIT,
    sumNumber,
  });

export const asyncAddCardRequest = (card) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`http://localhost:3002/api/v1/people`, card);
    dispatch(addCard(data.data));
    data.message
      ? dispatch(showSuccessPopup(data.message))
      : dispatch(showErrorPopup(data.error));
  } catch (error) {
    dispatch(showErrorPopup(error.message));
  }
};

export const asyncDeleteCardRequest = (card_id) => async (dispatch) => {
  try {
    const {data} = await Axios.delete(`http://127.0.0.1:3002/api/v1/people/${card_id}111`);
    dispatch(deleteCard(card_id));
    data.message
      ? dispatch(showSuccessPopup(data.message))
      : dispatch(showErrorPopup(data.error));
  } catch (error) {
      console.log(error.message);
      dispatch(showErrorPopup(error.message));
  }
};

export const asyncUpdateCardRequest = (card) => async (dispatch) => {
  try {
    const {data} = await Axios.put(`http://127.0.0.1:3002/api/v1/people/${card.id}`,card);
    dispatch(updateCard(card));
    data.message
      ? dispatch(showSuccessPopup(data.message))
      : dispatch(showErrorPopup(data.error));
  } catch (error) {
    dispatch(showErrorPopup(error.message));
  }
};
