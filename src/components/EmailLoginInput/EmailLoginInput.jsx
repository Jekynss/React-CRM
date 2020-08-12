import React from 'react'
import TextField from "@material-ui/core/TextField";

export default function EmailInput(props) {
    const {user, handleChange} = props;
    return (
        <div>
            <TextField id="Email" value={user.email} onChange={handleChange} name='email' label="Email"/>
        </div>
    )
}
