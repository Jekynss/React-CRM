import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    pageName: {
      position: 'absolute',
    },
  }));
  
  type Props = {
    name: string
  }
export default function PageName(props:Props) {
  const { name } = props;
  const classes = useStyles();
  return (
    <Box ml={24} className={classes.pageName}>
      <h1>{name}</h1>
    </Box>
  );
}
