import React, { useState } from "react";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import FullNameInput from "../FullNameInput/FullNameInput";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ValidatorForm } from "react-material-ui-form-validator";
import RegistrationButton from "../RegistrationButton/RegistrationButton";
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
//   registrationLink: {
//     margin: "0 30px",
//     textDecoration: "none",
//   },
// }));

const useStyles = makeStyles((theme) => ({

}));

export default function RegistrationForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const classes = useStyles();

  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //   return (
  //     <Box className={classes.formWrapper}>
  //       <ValidatorForm
  //         onSubmit={handleSubmit}
  //         className={classes.mainForm}
  //         onError={(errors) => console.log(errors)}
  //       >
  //         <h1 className={classes.header}>Registration</h1>
  //         <Box className={classes.inputWrapper}>
  //           <FullNameInput
  //             obj={user}
  //             handleChange={handleChange}
  //             classes={classes}
  //           />
  //           <EmailInput
  //             obj={user}
  //             handleChange={handleChange}
  //             classes={classes}
  //           />
  //           <PasswordInput user={user} handleChange={handleChange} />
  //         </Box>
  //           <RegistrationButton/>
  //       </ValidatorForm>
  //     </Box>
  //   );

  return (
    <AuthorizationForm name="Registration" handleSubmit={handleSubmit} secondLink="Login">
        <Box className={classes.inputWrapper}>
      <FullNameInput obj={user} handleChange={handleChange} classes={classes} />
      <EmailInput obj={user} handleChange={handleChange} classes={classes} />
      <PasswordInput user={user} handleChange={handleChange} />
      </Box>
    </AuthorizationForm>
  );
}
