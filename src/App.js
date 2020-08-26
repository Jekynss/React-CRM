import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import PeoplePage from "./pages/PeoplePage";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import {
  setInitialCards,
  asyncSetProjects,
  getSubscriptionStatus,
  paidStatus,
  asyncSetAuth
} from "./redux/actions/CardsAction";
import Header from "./components/Header/Header";
import RegistrationPage from "./pages/RegistrationPage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import ProjectPage from "./pages/ProjectPage";
import StripeCheckout from "./pages/StripeCheckout";

function App(props) {
  const {
    setInitialCards,
    token,
    asyncSetProjects,
    getSubscriptionStatus,
    isAuth,
    asyncSetAuth,
  } = props;

  async function checkPaid() {
    await getSubscriptionStatus();
  }

  async function initIfAuth() {
    try {
      if(!isAuth && token){
        asyncSetAuth();
      }
      if (token && isAuth) {
        await checkPaid();
        Axios.get("http://localhost:3002/api/v1/people", {
          headers: { token: token },
        }).then((res) => {
          setInitialCards(res.data);
        });
        asyncSetProjects();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    initIfAuth();
  }, [token,isAuth]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <AuthRoute exact path="/registration" type="guest">
          <RegistrationPage />
        </AuthRoute>
        <AuthRoute exact path="/checkout" type="private" statusPaid={"active"}>
          <StripeCheckout />
        </AuthRoute>
        <AuthRoute exact path="/" type="private">
          <HomePage />
        </AuthRoute>
        <AuthRoute exact path="/people" type="private">
          <PeoplePage />
        </AuthRoute>
        <AuthRoute exact path="/projects" type="private">
          <ProjectsPage />
        </AuthRoute>
        <AuthRoute
          path="/projects/:id"
          type="private"
          render={(props) => <ProjectPage {...props} />}
        ></AuthRoute>
        <AuthRoute
          path="/people/:id"
          type="private"
          render={(props) => <ProfilePage {...props} />}
        ></AuthRoute>
        <AuthRoute path="/" type="guest">
          <LoginPage />
        </AuthRoute>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token,
  isAuth: state.isAuth
});
const mapDispatchToProps = {
  setInitialCards,
  asyncSetProjects,
  getSubscriptionStatus,
  asyncSetAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
