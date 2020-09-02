import React,{ChangeEvent} from "react";
import TextField from "@material-ui/core/TextField";
import {Card} from '../utils/types';

type Props = {
  handleChange:(e: ChangeEvent<HTMLInputElement>) => void,
  card:Card,
}

export default function PhoneInput(props:Props) {
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
