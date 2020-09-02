import * as constants from "../../constants";

export type Card = {
  id:number,
  name: string,
  description: string,
  phone: string,
  website: string,
  email: string,
  address: string,
  image_url: string,
  skills?:string[]
};

export type Product = {
  id: number,
  name: string,
  description: string
  price: string,
  amount: number,
  currency: string,
  quantity: number,
  plan: string
};

export type User = {
  email: string,
  password: string,
  name?: string,
};

export type Project = {
  id: number,
  name: string,
  status: string,
  stack: string[],
  price: number,
  description?: string,
  profiles?: Profile[]
};

export type Profile = {
  id:number,
  image_url:string,
  name:string,
};

export type ReduxState = {
  cards: Card[],
  error: boolean,
  message: string,
  limitHome: number,
  limitPeople: number,
  token: string,
  projects: Project[],
  paidStatus: string,
  isAuth: boolean|null,
  popup:string,
  redirectLink:string,
};

export interface DispatchType {
    type: string,
    [key:string]: any
  }

interface addCard {
  type: typeof constants.ADD_CARD,
  card: Card,
}

interface deleteCard {
  type: typeof constants.DELETE_CARD,
  card_id: number,
}

interface updateCard {
  type: typeof constants.UPDATE_CARD,
  card: Card,
}

interface setInitialCards {
  type: typeof constants.SET_INITIAL_CARDS,
  cards: Card[],
}

interface closePopup {
  type: typeof constants.CLOSE_POPUP,
}

interface showSuccessPopup {
  type: typeof constants.SHOW_SUCCESS_POPUP,
  message: string,
}

interface setAuth {
  type: typeof constants.SET_AUTH,
  payload: { auth: boolean },
}

interface showErrorPopup {
  type: typeof constants.SHOW_ERROR_POPUP,
  message: string,
}

interface setLimitHomeToRedux {
  type: typeof constants.SET_LIMIT_HOME,
  limit: number,
}

interface setLimitPeopleToRedux {
  type: typeof constants.SET_LIMIT_PEOPLE,
  limit: number,
}

interface setToken {
  type: typeof constants.SET_TOKEN,
  payload: object,
}

interface setTokenAuth {
  type: typeof constants.SET_TOKEN_AUTH,
  payload: object,
}

interface setRedirect {
  type: typeof constants.SET_REDIRECT,
  link: string,
}

interface setProjects {
  type: typeof constants.SET_PROJECTS,
  payload: { projects: Project[] },
}

interface paidStatus {
  type: typeof constants.SET_PAID_STATUS,
  payload: { status: string },
}

export type CardActionTypes =
  | setInitialCards
  | deleteCard
  | updateCard
  | addCard;

export type ProjectsActionTypes = setProjects;

export type AuthActionTypes = setToken | setAuth | setTokenAuth;

export type RedirectActionTypes = setRedirect;

export type StripeActionTypes = paidStatus;

export type PopupActionTypes = showErrorPopup | showSuccessPopup | closePopup;

export type LimitActionTypes = setLimitPeopleToRedux | setLimitHomeToRedux;
