import React, { useState } from "react";
import EmailLoginInput from "../EmailLoginInput/EmailLoginInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { connect } from "react-redux";
import {asyncAuthorizeUser} from '../../redux/actions/CardsAction'
import StatusMessage from "../StatusMessage/StatusMessage";
import { Redirect } from "react-router";

function LoginForm(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const {redirectLink,asyncAuthorizeUser,token} = props;

  const handleSubmit = (e) => {
    console.log(user);
    asyncAuthorizeUser(user);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <StatusMessage/>
      {redirectLink && <Redirect push to={redirectLink} />}
      { token && <Redirect push to={'/'} />}
      <AuthorizationForm name="Login" handleSubmit={handleSubmit} secondLink="Registration">
          <EmailLoginInput user={user} handleChange={handleChange} />
          <PasswordInput user={user} handleChange={handleChange} />
      </AuthorizationForm>
      </>
  );
}

const mapStateToProps = (state) => ({
  redirectLink:state.redirectLink,
  token:state.token,
});

const mapDispatchToProps = {
  asyncAuthorizeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);