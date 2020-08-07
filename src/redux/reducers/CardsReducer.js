import React, { useEffect } from "react";
import * as actions from "../actions/CardsAction";
import Axios from "axios";

const initialState = {
  cards: [],
};

export default function CardReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_CARD: {
      Axios.post(`http://localhost:3002/api/v1/people`, null, {
        name: "Hello",
        email: "Hello@Hello",
      })
        .then((response) => response.status)
        .catch((err) => console.warn(err));
      return { ...state, cards: [...state.cards, action.card] };
    }
    case actions.DELETE_CARD: {
      Axios.delete(`http://127.0.0.1:3002/api/v1/people/${action.card_id}`)
        .then((response) => response.status)
        .catch((err) => console.warn(err));
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
    case actions.SET_INITIAL_CARDS: {
      return { ...state, cards: action.cards };
    }
  }
  return state;
}
