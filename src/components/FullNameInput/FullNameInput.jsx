import React,{Fragment} from 'react'
import TextField from "@material-ui/core/TextField";

export default function FullNameInput(props) {
    const {handleChange,card} = props;
    return (
        <Fragment>
            <TextField id="Fullname" label="Fullname" value={card.name} onChange={handleChange} name='name' required />
        </Fragment>
    )
}
