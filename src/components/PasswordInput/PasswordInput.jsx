import React from 'react'
import {TextValidator} from 'react-material-ui-form-validator';

export default function PasswordInput(props) {
    const {user, handleChange} = props;

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
                    errorMessages={['this field is required']}
                />
        </div>
    )
}
