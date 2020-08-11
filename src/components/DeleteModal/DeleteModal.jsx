import React from 'react'
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    modal: {
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      modal_buttons: {
        display: "flex",
        justifyContent: "space-around",
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
  }));

export default function DeleteModal(props) {
    const {open,handleCloseModal,handleClickDelete} = props;
    const classes = useStyles();
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Warning</h2>
            <p id="transition-modal-description">
              Are you sure you want delete this profile?
            </p>
            <Box m={2} className={classes.modal_buttons}>
              <Button
                className={classes.delete_button}
                size="large"
                color="secondary"
                variant="contained"
                onClick={handleClickDelete}
              >
                Delete
              </Button>

              <Button
                className={classes.no_button}
                size="large"
                color="primary"
                variant="outlined"
                onClick={handleCloseModal}
              >
                No
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    )
}
