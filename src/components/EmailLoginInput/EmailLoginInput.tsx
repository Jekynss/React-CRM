import React, { ChangeEvent } from 'react'
import TextField from "@material-ui/core/TextField";
import { User } from '../utils/types';

type Props = {
    user:User
    handleChange: (e:ChangeEvent<HTMLInputElement>)=>void
}

function EmailInput(props:Props) {
    const {user, handleChange} = props;
    return (
        <div>
            <TextField id="Email" value={user.email} onChange={handleChange} name='email' label="Email"/>
        </div>
    )
}

export default EmailInput