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
import {setInitialCards} from './redux/actions/CardsAction'
import Header from './components/Header/Header'
import RegistrationPage from './pages/RegistrationPage';
import AuthRoute from './components/AuthRoute/AuthRoute';

function App(props) {
  const {setInitialCards,token} = props;
  useEffect(() => {
      if(token) Axios.get('http://localhost:3002/api/v1/people').then((res)=>{setInitialCards(res.data)});
  }, [token]);

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/people" component={PeoplePage}/>
        <Route exact path="/projects" component={ProjectsPage}/>
        <Route path="/people/:id" component={ProfilePage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token:state.token
})
const mapDispatchToProps ={
  setInitialCards
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
