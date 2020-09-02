import React, { useState, FormEvent, ChangeEvent } from "react";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import FullNameInput from "../FullNameInput/FullNameInput";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { connect } from "react-redux";
import {asyncRegisterUser} from '../../redux/actions/CardsAction'
import StatusMessage from "../StatusMessage/StatusMessage";
import { Redirect } from "react-router";
import { ReduxState, User } from "../utils/types";

type Props = {
  asyncRegisterUser(user:User):Promise<void>,
  redirectLink:string
}
function RegistrationForm(props:Props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const {asyncRegisterUser,redirectLink} = props;

  const handleSubmit = () => {
    asyncRegisterUser(user);
  };

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <StatusMessage/>
    {redirectLink && <Redirect push to={redirectLink} />}
    <AuthorizationForm name="Registration" handleSubmit={handleSubmit} secondLink="Login">
      <FullNameInput obj={user} handleChange={handleChange} classes={{inputText:''}}/>
      <EmailInput obj={user} handleChange={handleChange} classes={{inputText:''}}/>
      <PasswordInput user={user} handleChange={handleChange} limitLength={true} />
    </AuthorizationForm>
    </>
  );
}

const mapStateToProps = (state:ReduxState) => ({
  redirectLink:state.redirectLink,
});

const mapDispatchToProps={
  asyncRegisterUser
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);