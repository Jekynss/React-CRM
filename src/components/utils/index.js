import { dispatch } from "../../index";

export const dispatchDebouncer = (action, delay) => {
  return setTimeout(() => {
    dispatch(action());
  }, delay);
};

export const getCurentToken = () => JSON.parse(localStorage.getItem("user")).token;
