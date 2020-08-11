import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function DesctiptionInput(props) {
  const { handleChange, card, about_text } = props;
  return (
      <Box>
      <TextField
        variant="outlined"
        id="about_me"
        type="text"
        name="description"
        multiline
        rowsMax={4}
        onChange={handleChange}
        className={about_text}
        label="About me"
        value={card.description}
      />
      </Box>
  );
}
