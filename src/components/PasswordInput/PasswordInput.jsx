import React from 'react'
import TextField from "@material-ui/core/TextField";

export default function PasswordInput(props) {
    const {user, handleChange} = props;
    return (
        <div>
            <TextField id="Password" value={user.password} onChange={handleChange} name='password' label="Password" />
        </div>
    )
}
