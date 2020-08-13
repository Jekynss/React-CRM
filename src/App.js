import React,{useEffect} from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';
import PeoplePage from './pages/PeoplePage';
import { Switch, Route } from "react-router-dom";
import Axios from "axios";
import {connect} from 'react-redux'
import {setInitialCards,setToken} from './redux/actions/CardsAction'
import Header from './components/Header/Header'
import RegistrationPage from './pages/RegistrationPage';
import AuthRoute from './components/AuthRoute/AuthRoute';

function App(props) {
  const {setInitialCards,token,setToken} = props;
  useEffect(() => {
      if(token) Axios.get('http://localhost:3002/api/v1/people',{headers:{token:token}}).then((res)=>{setInitialCards(res.data)});
  }, [token]);

  return (
    <div className="App">
      <Header/>
      <Switch>
        <AuthRoute exact path="/login" type="guest"><LoginPage/></AuthRoute>
        <AuthRoute exact path="/registration" type="guest"><RegistrationPage/></AuthRoute>
        <AuthRoute exact path="/" type="private"><HomePage/></AuthRoute>
        <AuthRoute exact path="/people" type="private"><PeoplePage/></AuthRoute>
        <AuthRoute exact path="/projects" type="private"><ProjectsPage/></AuthRoute>
        <AuthRoute path="/people/:id" type="private" render={(props) => <ProfilePage {...props} />}></AuthRoute>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token:state.token
})
const mapDispatchToProps ={
  setInitialCards,
  setToken,
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
