import * as actions from "../actions/CardsAction";
import Axios from "axios";

const initialState = {
  cards: [],
  error:'',
  message:''
};

export default function CardReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_CARD: {
      return { ...state, cards: [...state.cards, action.card], popup: true };
    }
    case actions.DELETE_CARD: {
      return {
        ...state,
        cards: state.cards.filter(
          (card) => card.id.toString() !== action.card_id.toString()
        )
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
        popup: '',
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
      return {
        ...state,
        popup: action.message,
        error: true,
      };
    }

    case actions.SET_INITIAL_CARDS: {
      return { ...state, cards: action.cards };
    }

    default:
      return state;
  }
}
