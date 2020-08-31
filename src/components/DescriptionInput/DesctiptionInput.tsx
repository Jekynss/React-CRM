import React,{ChangeEvent} from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Card, Project } from "../utils/types";

type Props = {
  handleChange:(e:ChangeEvent<HTMLInputElement>)=>void, 
  card: Card|Project, 
  about_text:string, 
  notOutlined?:boolean
}
export default function DesctiptionInput(props:Props) {
  const { handleChange, card, about_text, notOutlined } = props;
  return (
      <Box>
      <TextField
        variant={notOutlined ? 'standard' : 'outlined'}
        id="about_me"
        type="text"
        name="description"
        multiline
        rowsMax={4}
        onChange={handleChange}
        className={about_text}
        label="About"
        value={card.description}
      />
      </Box>
  );
}
