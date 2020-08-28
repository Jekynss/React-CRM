import Axios from "axios";
import { dispatchDebouncer, getCurentToken } from "../../components/utils";
import * as constants from '../../constants';
import { DispatchType, User, Card, Project, ProjectsActionTypes, AuthActionTypes, RedirectActionTypes, StripeActionTypes, PopupActionTypes, LimitActionTypes, CardActionTypes } from '../../components/utils/types';

export const addCard = (card:Card): CardActionTypes => ({
  type: constants.ADD_CARD,
  card,
});

export const deleteCard = (card_id:number): CardActionTypes=> ({
  type: constants.DELETE_CARD,
  card_id,
});

export const updateCard = (card:Card): CardActionTypes => ({
  type: constants.UPDATE_CARD,
  card,
});

export const setInitialCards = (cards:Card[]): CardActionTypes => ({
  type: constants.SET_INITIAL_CARDS,
  cards,
});

export const closePopup = ():  PopupActionTypes=> ({
  type: constants.CLOSE_POPUP,
});

export const showSuccessPopup = (message:string): PopupActionTypes => ({
  type: constants.SHOW_SUCCESS_POPUP,
  message,
});

export const setAuth = (auth:boolean): AuthActionTypes => ({
  type: constants.SET_AUTH,
  payload: { auth },
});

export const showErrorPopup = (message:string): PopupActionTypes => ({
  type: constants.SHOW_ERROR_POPUP,
  message,
});

export const setLimitHomeToRedux = (limit:number): LimitActionTypes => ({
  type: constants.SET_LIMIT_HOME,
  limit,
});

export const setLimitPeopleToRedux = (limit:number): LimitActionTypes => ({
  type: constants.SET_LIMIT_PEOPLE,
  limit,
});

export const setToken = (token:object): AuthActionTypes => ({
  type: constants.SET_TOKEN,
  payload: token,
});

export const setTokenAuth = (user_obj:object): AuthActionTypes => ({
  type: constants.SET_TOKEN_AUTH,
  payload:{...user_obj},
});

export const setRedirect = (link:string): RedirectActionTypes => ({
  type: constants.SET_REDIRECT,
  link,
});

export const setProjects = (projects:Project[]): ProjectsActionTypes => ({
  type: constants.SET_PROJECTS,
  payload: {projects},
});

export const paidStatus = (status:string): StripeActionTypes=> ({
  type: constants.SET_PAID_STATUS,
  payload: { status },
});

export const asyncAddCardRequest = (card:Card) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.post(
      `http://localhost:3002/api/v1/people`,
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

export const asyncDeleteCardRequest = (card_id:number) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.delete(
      `http://127.0.0.1:3002/api/v1/people/${card_id}`,
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

export const asyncUpdateCardRequest = (card:Card) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const {
      data,
    } = await Axios.put(
      `http://127.0.0.1:3002/api/v1/people/${card.id}`,
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

export const asyncRegisterUser = (user:Card) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const { data } = await Axios.post(
      `http://127.0.0.1:3002/api/v1/users/registration`,
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

export const asyncAuthorizeUser = (user:User) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const { data } = await Axios.post(
      `http://127.0.0.1:3002/api/v1/users/login`,
      user
    );
    dispatch(setTokenAuth(data));
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

export const asyncSetProjects = () => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.get("http://localhost:3002/api/v1/projects", {
      headers: { token },
    });
    dispatch(setProjects(data));
  } catch (err) {
    console.log(err);
  }
};

export const asyncDeleteProject = (id:number) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.delete(`http://localhost:3002/api/v1/projects/${id}`, {
      headers: { token },
    });
    dispatch(showSuccessPopup(data.message));
    dispatchDebouncer(closePopup, 3000);
  } catch (error) {
    dispatch(
      showErrorPopup(`${error.message}: ${error.response.data.message}`)
    );
  }
};

export const asyncAddProject = (payload:{project:Project}) => async () => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.post(
      `http://localhost:3002/api/v1/projects`,
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

export const asyncGetProjects = (id:number) => async () => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.get(
      `http://localhost:3002/api/v1/people/${id}/projects`,
      {
        headers: { token: token },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const asyncGetProject = (id:number) => async () => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.get(
      `http://localhost:3002/api/v1/projects/${id}`,
      {
        headers: { token: token },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const asyncUpdateProject = (project:Project) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const { data } = await Axios.put(
      `http://localhost:3002/api/v1/projects/${project.id}`,
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

export const getSubscriptionStatus = () => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const {
      data,
    } = await Axios.get("http://localhost:3002/api/v1/users/getCurrent", {
      headers: { token: token },
    });
    dispatch(paidStatus(data.status));
  } catch (err) { }
};

export const asyncSubscribe = (payload:object) => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const {
      data,
    } = await Axios.post(
      "http://localhost:3002/api/v1/stripe/subscriptions",
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

export const asyncSetAuth = () => async (dispatch:(obj: DispatchType)=>Promise<any>) => {
  try {
    const token = getCurentToken();
    const tokenValid = await Axios.get(
      "http://localhost:3002/api/v1/token/validate",
      {
        headers: { token: token },
      }
    );
    dispatch(setAuth(tokenValid.status === 200))
  } catch (error) {
    dispatch(setToken({}));
    dispatch(setAuth(false))
    console.log(`${error?.message}: ${error?.response?.data.message}`);
  }
};
