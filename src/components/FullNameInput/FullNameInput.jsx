import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import {TextValidator} from 'react-material-ui-form-validator';

export default function FullNameInput(props) {
  const { handleChange, obj, classes } = props;
  return (
    <TextValidator
      label="Fullname"
      value={obj.name}
      onChange={handleChange}
      name="name"
      className={classes.inputText}
      required
      validators={["required"]}
      errorMessages={["this field is required"]}
    />
  );
}
