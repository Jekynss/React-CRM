import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import {getSubscriptionStatus,paidStatus} from '../../redux/actions/CardsAction';

const AuthRoute = (props) => {
  const { token, isAuth, type, paidStatus } = props;
  if (type === "guest" && token) return <Redirect to="/" />;
  else if (type === "private" && !token) return <Redirect to="/login" />;
  else if (type === "private" && token && paidStatus && paidStatus!=="active" && props.path!=="/checkout") return <Redirect to="/checkout" />;
  else if (type === "private" && token && paidStatus==="active" && props.path==="/checkout") return <Redirect to="/" />;

  return <Route {...props} />;
};

const mapStateToProps = ({ token,paidStatus,isAuth }) => ({
  token,
  isAuth,
  paidStatus
});

export default connect(mapStateToProps)(AuthRoute);
