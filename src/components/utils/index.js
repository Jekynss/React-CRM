import { dispatch }  from '../../index';

export const dispatchDebouncer = (action, delay) => {
    return(setTimeout(() => {
      dispatch(action());
    }, delay))
  };