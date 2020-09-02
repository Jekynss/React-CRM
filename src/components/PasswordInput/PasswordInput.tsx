import React,{ChangeEvent} from 'react'
import {TextValidator} from 'react-material-ui-form-validator';
import { User } from '../utils/types';

type Props = {
    user:User,
    handleChange: (e:ChangeEvent<HTMLInputElement>) => void,
    limitLength?: boolean,
}

export default function PasswordInput(props:Props) {
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
