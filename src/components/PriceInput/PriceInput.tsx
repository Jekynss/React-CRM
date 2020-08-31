import React,{ChangeEvent} from 'react'
import { TextValidator } from 'react-material-ui-form-validator';
import { Project } from '../utils/types';

type Props = {
  handleChange:(e: ChangeEvent<HTMLInputElement>)=>void, 
  obj:Project, 
  classes:any
}

function PriceInput(props:Props) {

    const { handleChange, obj, classes } = props;
    return (
      <TextValidator
        label="Price"
        value={obj.price}
        onChange={handleChange}
        name="price"
        className={classes.inputText}
        required
        validators={["required"]}
        type="numeric"
        errorMessages={["this field is required"]}
      />
    );
}

export default PriceInput
