import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function FormButtons(props) {
  const { classes, card, wasChanged, handleClickDelete, goBack } = props;
  return (
    <Grid className={classes.submit_wrapper}>
      <Button
        variant="contained"
        id="submit"
        color="secondary"
        disabled={!card.id}
        className={classes.submit_button}
        onClick={handleClickDelete}
      >
        Delete
      </Button>
      <Grid item  container direction="row" className={classes.buttonsPanel}>
        <Box mr={4}>
          <Button
            variant="outlined"
            id="submit"
            color="primary"
            className={classes.submit_button}
            onClick={goBack}
          >
            Back
          </Button>
        </Box>
        <Button
          variant="contained"
          id="submit"
          disabled={!wasChanged}
          color="primary"
          type="submit"
          className={classes.submit_button}
        >
          {card.id ? "UPDATE" : "CREATE"}
        </Button>
      </Grid>
    </Grid>
  );
}
