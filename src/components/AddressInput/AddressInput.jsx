import React from "react";
import TextField from "@material-ui/core/TextField";

export default function AddressInput(props) {
  const { handleChange, card } = props;
  return (
    <>
      <TextField
        id="Address"
        value={card.address}
        onChange={handleChange}
        name="address"
        label="Address"
      />
    </>
  );
}
