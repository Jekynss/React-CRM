import React from "react";
import Button from '@material-ui/core/Button';
import { Box } from "@material-ui/core";

type Props = {
  name:string
}
const Badge = (props:Props) => {
  const {name} = props;
  return <Box display="inline-block" m={1}><Button variant="outlined">{name}</Button></Box>;
};

export default Badge;
