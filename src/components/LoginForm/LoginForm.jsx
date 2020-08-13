import React, { useState } from "react";
import EmailLoginInput from "../EmailLoginInput/EmailLoginInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { connect } from "react-redux";
import {asyncAuthorizeUser} from '../../redux/actions/CardsAction'
import StatusMessage from "../StatusMessage/StatusMessage";

function LoginForm(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const {asyncAuthorizeUser,token} = props;

  const handleSubmit = (e) => {
    asyncAuthorizeUser(user);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <StatusMessage/>
      <AuthorizationForm name="Login" handleSubmit={handleSubmit} secondLink="Registration">
          <EmailLoginInput user={user} handleChange={handleChange} />
          <PasswordInput user={user} handleChange={handleChange} />
      </AuthorizationForm>
      </>
  );
}

const mapDispatchToProps = {
  asyncAuthorizeUser
}

export default connect(null, mapDispatchToProps)(LoginForm);