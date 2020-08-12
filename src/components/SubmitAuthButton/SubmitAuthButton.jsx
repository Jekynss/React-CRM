import React from "react";
import Button from "@material-ui/core/Button";

export default function SubmitAuthButton({name}) {
  return (
    <Button variant="contained" id="submit" color="primary" type="submit">
      {name}
    </Button>
  );
}
