import React,{ChangeEvent} from "react";
import { TextValidator } from "react-material-ui-form-validator";

type Props = {
  handleChange:(e: ChangeEvent<HTMLInputElement>) => void,
  obj:{status:string},
  classes:any,
}

function StatusInput(props:Props) {
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
