import React,{Fragment} from 'react'
import TextField from "@material-ui/core/TextField";
import {TextValidator} from 'react-material-ui-form-validator';

export default function EmailInput(props) {
    const {handleChange,obj,classes} = props;
    return (
            <TextValidator
            label="Email *"
            onChange={handleChange}
            className={classes.inputText}
            name="email"
            value={obj.email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
        />
    )
}
