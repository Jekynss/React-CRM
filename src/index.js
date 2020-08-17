import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import App from './App';
import reducer from './redux/reducers/CardsReducer'
import { BrowserRouter} from "react-router-dom";
import {setToken} from './redux/actions/CardsAction'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(reducer, enhancer);

export const dispatch = store.dispatch; 

const localToken = JSON.parse(localStorage.getItem('user')).token;
if(localToken)
dispatch(setToken({token:localToken}))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);