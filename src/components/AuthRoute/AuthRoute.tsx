import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import {getSubscriptionStatus,paidStatus} from '../../redux/actions/CardsAction';

type Props = {
  token:string,
  isAuth:boolean|null,
  type:string,
  paidStatus:string,
  path:string,
}

const AuthRoute = (props:Props) => {
  const { token, isAuth, type, paidStatus } = props;
  if (type === "guest" && isAuth === true) return <Redirect to="/" />;
  else if (type === "private" && isAuth === false) return <Redirect to="/login" />;
  else if (type === "private" && isAuth === true && paidStatus && paidStatus!=="active" && props.path!=="/checkout") return <Redirect to="/checkout" />;
  else if (type === "private" && isAuth === true && paidStatus==="active" && props.path==="/checkout") return <Redirect to="/" />;

  return <Route {...props} />;
};

type StateFromRedux = {
  token:string,
  isAuth:boolean|null,
  paidStatus:string,
}

const mapStateToProps = ({ token,paidStatus,isAuth }:StateFromRedux) => ({
  token,
  isAuth,
  paidStatus
});

export default connect(mapStateToProps)(AuthRoute);
