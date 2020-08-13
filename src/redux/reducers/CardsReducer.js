import * as actions from "../actions/CardsAction";

const initialState = {
  cards: [],
  error:'',
  message:'',
  limitHome:4,
  limitPeople:12,
  token:''
};

export default function CardReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_CARD: {
      return { ...state, cards: [action.card,...state.cards], popup: true };
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

    case actions.SET_LIMIT_HOME: {
      return { ...state, limitHome:action.limit };
    }

    case actions.SET_LIMIT_PEOPLE: {
      return { ...state, limitPeople:action.limit };
    }

    case actions.SET_TOKEN: {
      return { ...state, token:action.token};
    }

    case actions.SET_REDIRECT: {
      return { ...state, redirectLink:action.link};
    }

    default:
      return state;
  }
}
