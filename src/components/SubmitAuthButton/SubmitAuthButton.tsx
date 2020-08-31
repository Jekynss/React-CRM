import React from "react";
import Button from "@material-ui/core/Button";

type Props = {
  name: string
}
export default function SubmitAuthButton(props: Props) {
  const { name } = props;
  return (
    <Button variant="contained" id="submit" color="primary" type="submit">
      {name}
    </Button>
  );
}
