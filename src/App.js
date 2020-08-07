import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx'
import PeoplePage from './pages/PeoplePage';
import ProfilePage from './pages/ProfilePage'
import { Switch, Route } from "react-router-dom";

function App() {
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

export default App;
