import React from 'react'
import { TextValidator } from 'react-material-ui-form-validator';

function PriceInput(props) {

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
