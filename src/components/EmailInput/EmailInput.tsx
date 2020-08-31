import React,{ChangeEvent} from 'react'
import {TextValidator} from 'react-material-ui-form-validator';

type Props = {
    handleChange:any,
    obj:{email:string},
    classes:any
}

function EmailInput(props:Props) {
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

export default EmailInput
