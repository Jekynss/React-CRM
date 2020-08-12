import React, { useState } from "react";
import EmailLoginInput from "../EmailLoginInput/EmailLoginInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import LoginButton from "../LoginButton/LoginButton";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";

// const useStyles = makeStyles((theme) => ({
//   mainForm: {
//     display: "flex",
//     flexDirection: "column",
//     width: "400px",
//     height: "300px",
//     justifyContent: "space-around",
//     boxShadow:
//       "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
//     alignItems: "center",
//   },
//   formWrapper: {
//     display: "flex",
//     justifyContent: "center",
//     height: "500px",
//     alignItems: "center",
//   },
//   header: {
//     margin: 0,
//   },
//   registrationLink:{
//     margin: '0 30px',
//     textDecoration: 'none',
//   }
// }));

const useStyles = makeStyles((theme) => ({}));

export default function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const classes = useStyles();

  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    // <Box className={classes.formWrapper}>
    //   <form onSubmit={handleSubmit} className={classes.mainForm}>
    //     <h1 className={classes.header}>Login</h1>
    //     <Box className={classes.inputWrapper}>
    //       <EmailLoginInput user={user} handleChange={handleChange} />
    //       <PasswordInput user={user} handleChange={handleChange} />
    //     </Box>
    //     <div>
    //       <Link to="/registration"
    //       className={classes.registrationLink}>Registration</Link>
    //       <LoginButton />
    //     </div>
    //   </form>
    // </Box>
    <div>
      <AuthorizationForm name="Login" handleSubmit={handleSubmit} secondLink="Registration">
        <Box className={classes.inputWrapper}>
          <EmailLoginInput user={user} handleChange={handleChange} />
          <PasswordInput user={user} handleChange={handleChange} />
        </Box>
      </AuthorizationForm>
    </div>
  );
}
