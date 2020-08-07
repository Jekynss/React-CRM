import React,{useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.jsx'
import PeoplePage from './pages/PeoplePage';
import ProfilePage from './pages/ProfilePage'
import { Switch, Route } from "react-router-dom";
import Axios from "axios";
import {connect} from 'react-redux'
import {setInitialCards} from './redux/actions/CardsAction'

function App(props) {
  const {setInitialCards} = props;
  useEffect(() => {
      Axios.get('http://localhost:3002/api/v1/people').then((res)=>{console.log(res.data);setInitialCards(res.data)})
  }, []);

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/people" component={PeoplePage} />
        <Route path="/people/:id" component={ProfilePage} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps ={
  setInitialCards
}

export default connect(undefined,mapDispatchToProps)(App);
