import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundImage: 'url(https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80)',
    height:'500px',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  },
}));

export default function ImageSection() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
    </Paper>
  );
}
