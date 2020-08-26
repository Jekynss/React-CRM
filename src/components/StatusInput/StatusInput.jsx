import React from "react";
import { TextValidator } from "react-material-ui-form-validator";

function StatusInput(props) {
  const { handleChange, obj, classes } = props;
  return (
    <TextValidator
      label="Status"
      value={obj.status}
      onChange={handleChange}
      name="status"
      className={classes.inputText}
      required
      validators={["required"]}
      errorMessages={["this field is required"]}
    />
  );
}

export default StatusInput;
