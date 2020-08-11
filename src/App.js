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

function App(props) {
  const {setInitialCards} = props;
  useEffect(() => {
      Axios.get('http://localhost:3002/api/v1/people').then((res)=>{setInitialCards(res.data)})
  }, [setInitialCards]);

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/people" component={PeoplePage}/>
        <Route exact path="/projects" component={ProjectsPage}/>
        <Route path="/people/:id" component={ProfilePage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps ={
  setInitialCards
}

export default connect(undefined,mapDispatchToProps)(App);
