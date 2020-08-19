import React from "react";
import Button from '@material-ui/core/Button';
import { Box } from "@material-ui/core";

const Badge = (props) => {
  const {name} = props;
  return <Box display="inline-block" m={1}><Button variant="outlined" sizeSmall>{name}</Button></Box>;
};

export default Badge;
