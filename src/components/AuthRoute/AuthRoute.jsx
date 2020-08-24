import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import {getSubscriptionStatus,paidStatus} from '../../redux/actions/CardsAction';

const AuthRoute = (props) => {
  const { token, isAuthUser, type, paidStatus } = props;
  console.log(type === "guest" && token,"guest and token");
  console.log(type === "private" && !token,"priv and no token");
  console.log(type === "private" && token && paidStatus && paidStatus!=="active","last");
  console.log( paidStatus ,"last");
  if (type === "guest" && token) return <Redirect to="/" />;
  else if (type === "private" && !token) return <Redirect to="/login" />;
  else if (type === "private" && token && paidStatus && paidStatus!=="active" && props.path!=="/checkout") return <Redirect to="/checkout" />;

  return <Route {...props} />;
};

const mapStateToProps = ({ token,paidStatus }) => ({
  token,
  paidStatus
});

export default connect(mapStateToProps)(AuthRoute);
