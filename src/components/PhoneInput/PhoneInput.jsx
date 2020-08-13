import React from "react";
import TextField from "@material-ui/core/TextField";

export default function PhoneInput(props) {
  const { handleChange, card } = props;
  return (
    <>
      <TextField
        id="Phone"
        value={card.phone}
        onChange={handleChange}
        type="tel"
        name="phone"
        label="Phone"
      />
    </>
  );
}
