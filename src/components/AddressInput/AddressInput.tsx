import React,{ChangeEvent} from "react";
import TextField from "@material-ui/core/TextField";
import { Card } from "../utils/types";

type Props = {
  card:Card,
  handleChange:(e:ChangeEvent<HTMLInputElement>)=>void, 
}

export default function AddressInput(props:Props) {
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
