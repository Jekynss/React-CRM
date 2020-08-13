import React from "react";
import TextField from "@material-ui/core/TextField";

export default function WebSiteInput(props) {
  const { handleChange, card } = props;
  return (
    <>
      <TextField
        id="WebSite"
        value={card.website}
        onChange={handleChange}
        name="website"
        label="WebSite"
      />
    </>
  );
}
