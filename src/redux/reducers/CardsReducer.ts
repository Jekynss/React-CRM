import * as actions from "../../constants";
import { dispatchDebouncer } from "../../components/utils";
import {DispatchType,ReduxState} from '../../components/utils/types'

const initialState:ReduxState = {
  cards: [],
  error: false,
  message: "",
  limitHome: 4,
  limitPeople: 12,
  token: "",
  projects: [],
  paidStatus: "",
  popup:"",
  isAuth:false,
  redirectLink:''
};

export default function CardReducer(state:ReduxState = initialState, action:DispatchType) {
  switch (action.type) {
    case actions.ADD_CARD: {
      return { ...state, cards: [action.card, ...state.cards], popup: true };
    }
    case actions.DELETE_CARD: {
      return {
        ...state,
        cards: state.cards.filter(
          (card) => card.id.toString() !== action.card_id.toString()
        ),
      };
    }
    case actions.UPDATE_CARD: {
      return {
        ...state,
        cards: state.cards.map((elem) => {
          if (elem.id.toString() === action.card.id.toString()) {
            return { ...elem, ...action.card };
          } else {
            return elem;
          }
        }),
      };
    }

    case actions.CLOSE_POPUP: {
      return {
        ...state,
        popup: "",
      };
    }

    case actions.SHOW_SUCCESS_POPUP: {
      return {
        ...state,
        error: false,
        popup: action.message,
      };
    }

    case actions.SHOW_ERROR_POPUP: {
      dispatchDebouncer(
        () => ({
          type: "CLOSE_POPUP",
        }),
        3000
      );
      return {
        ...state,
        popup: action.message,
        error: true,
      };
    }

    case actions.SET_INITIAL_CARDS: {
      return { ...state, cards: action.cards };
    }

    case actions.SET_LIMIT_HOME: {
      return { ...state, limitHome: action.limit };
    }

    case actions.SET_LIMIT_PEOPLE: {
      return { ...state, limitPeople: action.limit };
    }

    case actions.SET_TOKEN: {
      return { ...state, token: action.payload.token };
    }

    case actions.SET_TOKEN_AUTH: {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...action.payload.user, token: action.payload.token })
      );
      return { ...state, token: action.payload.token };
    }

    case actions.SET_REDIRECT: {
      return { ...state, redirectLink: action.link };
    }

    case actions.SET_PROJECTS: {
      return { ...state, projects: action.payload.projects };
    }

    case actions.SET_PAID_STATUS: {
      return { ...state, paidStatus: action.payload.status };
    }

    case actions.SET_AUTH: {
      return { ...state, isAuth: action.payload.auth };
    }

    default:
      return state;
  }
}
