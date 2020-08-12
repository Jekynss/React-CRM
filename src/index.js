import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import App from './App';
import reducer from './redux/reducers/CardsReducer'
import { BrowserRouter} from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export const dispatch = store.dispatch; 
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