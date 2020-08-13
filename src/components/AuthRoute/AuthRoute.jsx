import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = (props) => {
  const { token, isAuthUser, type } = props;
  if (type === "guest" && token) return <Redirect to="/" />;
  else if (type === "private" && !token) return <Redirect to="/login" />;

  return <Route {...props} />;
};

const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(AuthRoute);
