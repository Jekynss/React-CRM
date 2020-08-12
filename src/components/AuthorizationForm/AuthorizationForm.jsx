import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ValidatorForm } from "react-material-ui-form-validator";
import SubmitAuthButton from "../SubmitAuthButton/SubmitAuthButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainForm: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    height: "400px",
    justifyContent: "space-around",
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    alignItems: "center",
  },
  formWrapper: {
    display: "flex",
    justifyContent: "center",
    height: "500px",
    alignItems: "center",
  },
  header: {
    margin: 0,
  },
  registrationLink: {
    margin: "0 30px",
    textDecoration: "none",
  },
}));

export default function AuthorizationForm(props) {
  const classes = useStyles();
  const { name, handleSubmit, secondLink } = props;
  return (
    <Box className={classes.formWrapper}>
      <ValidatorForm
        onSubmit={handleSubmit}
        className={classes.mainForm}
        onError={(errors) => console.log(errors)}
      >
        <h1 className={classes.header}>{name}</h1>
        {props.children}
        <div>
          <Link
            to={`/${secondLink.toLowerCase()}`}
            className={classes.registrationLink}
          >
            {secondLink}
          </Link>
          <SubmitAuthButton name={name} />
        </div>
      </ValidatorForm>
    </Box>
  );
}
