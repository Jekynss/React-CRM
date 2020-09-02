import React, { useState,ChangeEvent } from "react";
import EmailLoginInput from "../EmailLoginInput/EmailLoginInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { connect } from "react-redux";
import {asyncAuthorizeUser} from '../../redux/actions/CardsAction'
import StatusMessage from "../StatusMessage/StatusMessage";
import { User } from "../utils/types";

type Props = {
  asyncAuthorizeUser(user:User):Promise<void>
}

function LoginForm(props:Props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const {asyncAuthorizeUser} = props;

  const handleSubmit = () => {
    asyncAuthorizeUser(user);
  };
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
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