import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";

export default function PhoneInput(props) {
  const { handleChange, card } = props;
  return (
    <Fragment>
      <TextField
        id="Phone"
        value={card.phone}
        onChange={handleChange}
        name="phone"
        label="Phone"
      />
    </Fragment>
  );
}
