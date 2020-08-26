import Axios from "axios";
import { dispatchDebouncer, getCurentToken } from "../../components/utils";

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
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_PAID_STATUS = "PAID_STATUS";
export const SET_AUTH = "SET_AUTH";

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

export const setAuth = (auth) => ({
  type: SET_AUTH,
  payload: {auth},
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

export const setToken = (object) => ({
  type: SET_TOKEN,
  payload: object,
});

export const setRedirect = (link) => ({
  type: SET_REDIRECT,
  link,
});

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const paidStatus = (status) => ({
  type: SET_PAID_STATUS,
  payload: { status },
});

export const asyncAddCardRequest = (card) => async (dispatch) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.post(
      `/api/v1/people`,
      card,
      { headers: { token: token } }
    );
    dispatch(addCard(data.data));
    data.message
      ? dispatch(showSuccessPopup(data.message))
      : dispatch(showErrorPopup(data.error));
      dispatchDebouncer(closePopup, 3000);
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
};

export const asyncDeleteCardRequest = (card_id) => async (dispatch) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.delete(
      `/api/v1/people/${card_id}`,
      {
        headers: { token: token },
      }
    );
    dispatch(deleteCard(card_id));
    dispatch(showSuccessPopup(data.message));
    dispatchDebouncer(closePopup, 3000);
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
};

export const asyncUpdateCardRequest = (card) => async (dispatch) => {
  try {
    const token = getCurentToken();
    const {
      data,
    } = await Axios.put(
      `/api/v1/people/${card.id}`,
      card,
      { headers: { token: token } }
    );
    dispatch(updateCard(card));
    dispatch(showSuccessPopup(data.message));
    dispatchDebouncer(closePopup, 3000);
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
};

export const asyncRegisterUser = (user) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `/api/v1/users/registration`,
      user
    );
    dispatch(showSuccessPopup(data.message));
    dispatch(setRedirect("/login"));
    dispatchDebouncer(closePopup, 3000);
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
};

export const asyncAuthorizeUser = (user) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `/api/v1/users/login`,
      user
    );
    dispatch(setToken(data));
    data.error
      ? dispatch(showErrorPopup(data.message))
      : dispatch(setRedirect("/"));
      dispatchDebouncer(closePopup, 3000);
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response?.data.message}`)
    );
  }
};

export const asyncSetProjects = () => async (dispatch) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.get("/api/v1/projects", {
      headers: { token },
    });
    dispatch(setProjects(data));
  } catch (err) {
    console.log(err);
  }
};

export const asyncDeleteProject = (id) => async (dispatch) => {
  try {
    const token = getCurentToken();
    const {data} = await Axios.delete(`/api/v1/projects/${id}`, {
      headers: { token },
    });
    dispatch(showSuccessPopup(data.message));
    dispatchDebouncer(closePopup, 3000);
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );}
};

export const asyncAddProject = (payload) => async () => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.post(
      `/api/v1/projects`,
      payload.project,
      {
        headers: { token: token },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const asyncGetProjects = (id) => async () => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.get(
      `/api/v1/people/${id}/projects`,
      {
        headers: { token: token },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const asyncGetProject = (id) => async () => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.get(
      `/api/v1/projects/${id}`,
      {
        headers: { token: token },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const asyncUpdateProject = (project) => async (dispatch) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.put(
      `/api/v1/projects/${project.id}`,
      project,
      {
        headers: { token: token },
      }
    );
    dispatch(showSuccessPopup(data.message));
    dispatchDebouncer(closePopup, 3000);
    return data;
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
};

export const getSubscriptionStatus = () => async (dispatch) => {
  try {
    const token = getCurentToken();
    const {
      data,
    } = await Axios.get("/api/v1/users/getCurrent", {
      headers: { token: token },
    });
    dispatch(paidStatus(data.status));
  } catch (err) {}
};

export const asyncSubscribe = (payload) => async (dispatch) => {
  try {
    const token = getCurentToken();
    const {
      data,
    } = await Axios.post(
      "/api/v1/stripe/subscriptions",
      payload,
      { headers: { token: token } }
    );

    dispatch(showSuccessPopup(data.message));
    dispatchDebouncer(closePopup, 3000);
    getSubscriptionStatus();
    return data;
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
};

export const asyncSetAuth = () => async (dispatch) => {
  try {
    const token = getCurentToken();
    const tokenValid = await Axios.get(
      "/api/v1/token/validate",
      {
        headers: { token: token },
      }
    );
    dispatch(setAuth(tokenValid.status===200))
  } catch (error) {
      dispatch(setToken(''));
      dispatch(setAuth(false))
      console.log(`${error.message}: ${error.response.data.message}`);
  }
};
