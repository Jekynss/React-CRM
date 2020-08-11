import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";

export default function WebSiteInput(props) {
  const { handleChange, card } = props;
  return (
    <Fragment>
      <TextField
        id="WebSite"
        value={card.website}
        onChange={handleChange}
        name="website"
        label="WebSite"
      />
    </Fragment>
  );
}
