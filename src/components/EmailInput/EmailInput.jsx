import React,{Fragment} from 'react'
import TextField from "@material-ui/core/TextField";

export default function EmailInput(props) {
    const {handleChange,card} = props;
    return (
        <Fragment>
            <TextField id="Email" value={card.email} onChange={handleChange} name='email' label="Email" required />
        </Fragment>
    )
}
