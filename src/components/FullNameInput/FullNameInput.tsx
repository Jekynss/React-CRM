import React, { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import {TextValidator} from 'react-material-ui-form-validator';
import { User, Project, Card } from "../utils/types";

type Props = {
  handleChange:(e:ChangeEvent<HTMLInputElement>) => void,
  obj:User|Card|Project,
  classes:any,
}
export default function FullNameInput(props:Props) {
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
