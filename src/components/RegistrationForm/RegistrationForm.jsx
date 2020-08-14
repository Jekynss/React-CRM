import React, { useState } from "react";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import FullNameInput from "../FullNameInput/FullNameInput";
import { makeStyles } from "@material-ui/core/styles";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { connect } from "react-redux";
import {asyncRegisterUser} from '../../redux/actions/CardsAction'
import StatusMessage from "../StatusMessage/StatusMessage";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({

}));

function RegistrationForm(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const {asyncRegisterUser,redirectLink} = props;
  const classes = useStyles();

  const handleSubmit = (e) => {
    asyncRegisterUser(user);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <StatusMessage/>
    {redirectLink && <Redirect push to={redirectLink} />}
    <AuthorizationForm name="Registration" handleSubmit={handleSubmit} secondLink="Login">
      <FullNameInput obj={user} handleChange={handleChange} classes={classes} />
      <EmailInput obj={user} handleChange={handleChange} classes={classes} />
      <PasswordInput user={user} handleChange={handleChange} limitLength />
    </AuthorizationForm>
    </>
  );
}

const mapStateToProps = (state) => ({
  redirectLink:state.redirectLink,
});

const mapDispatchToProps={
  asyncRegisterUser
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);