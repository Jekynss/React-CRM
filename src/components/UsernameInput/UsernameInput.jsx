import React from 'react'
import TextField from "@material-ui/core/TextField";

export default function UsernameInput(props) {
    const {user, handleChange} = props;
    return (
        <div>
            <TextField id="Username" value={user.username} onChange={handleChange} name='username' label="Username"/>
        </div>
    )
}
