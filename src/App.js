import React,{useEffect} from 'react';
import './App.css';
import PeoplePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'
import { Switch, Route } from "react-router-dom";
import Axios from "axios";
import {connect} from 'react-redux'
import {setInitialCards} from './redux/actions/CardsAction'

function App(props) {
  const {setInitialCards} = props;
  useEffect(() => {
      Axios.get('http://localhost:3002/api/v1/people').then((res)=>{setInitialCards(res.data)})
  }, [setInitialCards]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/home" component={PeoplePage} />
        <Route path="/people/:id" component={ProfilePage} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps ={
  setInitialCards
}

export default connect(undefined,mapDispatchToProps)(App);
