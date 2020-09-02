import React from "react";
import { Paper, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  main: {
    width: "400px",
    height: "500px",
    margin: "0 60px",
  },
  selectButton: {
    width: "200px",
  },
  headerName: {
    margin: 0,
    height: "60px",
    fontWeight:500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:"#5c8cd7",
    color:"white"
  },
  price: {
    fontSize: "35px",
    fontWeight: 100,
    fontFamily: "arial, sans-serif",
  },
  description: {
    fontSize: '15px',
    fontWeight: 500,
    padding: '0 20px',
  }
});

type Props = {
  name:string, 
  price:string, 
  description:string, 
  onClick:()=>void
}

function PlanCard(props:Props) {
  const classes = useStyles();
  const { name, price, description, onClick } = props;
  return (
    <Paper className={classes.main}>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        textAlign="center"
        justifyContent="space-between"
      >
        <h1 className={classes.headerName}>
          <span>{name}</span>
        </h1>
        <h2 className={classes.price}>${price}/month</h2>
        <h4 className={classes.description}>{description}</h4>
        <Box my={5}>
          <Button
            className={classes.selectButton}
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default PlanCard;
