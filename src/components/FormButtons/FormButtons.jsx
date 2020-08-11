import React from 'react'
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function FormButtons(props) {
    const {classes,card,wasChanged} = props;
    return (
        <Box className={classes.submit_wrapper}>
          <Link className={classes.link} to={"/home"}>
            <Box mr={4}>
              <Button
                variant="outlined"
                id="submit"
                color="primary"
                className={classes.submit_button}
              >
                Back
              </Button>
            </Box>
          </Link>
          <Button
            variant="contained"
            id="submit"
            disabled={!wasChanged}
            color='primary'
            type="submit"
            className={classes.submit_button}
          >
            {card.id ? 'UPDATE' : 'CREATE'}
          </Button>
        </Box>
    )
}
