import React from 'react'
import {TextValidator} from 'react-material-ui-form-validator';

export default function PasswordInput(props) {
    const {user, handleChange, limitLength} = props;

    return (
        <div>
            <TextValidator
                    id="Password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                    validators={['required']}
                    inputProps={ limitLength ? { minLength:"3"}:{}}
                    errorMessages={['this field is required']}
                />
        </div>
    )
}
