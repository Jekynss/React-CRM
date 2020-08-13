import React,{useState, useEffect} from 'react'
import { makeStyles} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import {closePopup} from '../../redux/actions/CardsAction'

const useStyles = makeStyles((theme) => ({
    popup: {
        width: "100%",
        position: "fixed",
        top: 0,
        zIndex: 1,
        "& > * + *": {
          marginTop: theme.spacing(2),
        },
        alert_message: {
          textAlign: "center",
        },
      },
  }));

function StatusMessage(props) {
    const [openPopup, setOpenPopup] = useState('');
    const {closePopup,state} = props;
    const classes = useStyles();

    useEffect(() => {
        setOpenPopup(state.popup);
      }, [state]);

    return (
        <div className={classes.popup}>
        <Collapse in={Boolean(openPopup)}>
          <Alert
            className="alert_message"
            severity={state.error ? "error" : "success"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenPopup(false);
                  closePopup();
                }}
              >
                <CloseIcon className={classes.close_popup} fontSize="inherit" />
              </IconButton>
            }
          >
            {openPopup}
          </Alert>
        </Collapse>
      </div>
    )
}

const mapStateToProps = (state) => ({
  state,
});


const mapDispatchToProps={
  closePopup
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusMessage);