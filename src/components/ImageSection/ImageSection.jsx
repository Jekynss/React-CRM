import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function ImageSection() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <img
        className={classes.paper}
        src="https://zexler.ru/sites/default/files/styles/777x427_usefull_brief/public/4_354.png?itok=Yxt5ZIVl"
      />
    </Paper>
  );
}
