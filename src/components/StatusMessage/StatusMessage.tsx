import React,{useState, useEffect} from 'react'
import { makeStyles} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import {closePopup} from '../../redux/actions/CardsAction'
import { ReduxState } from '../utils/types';

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

  type Props = {
    closePopup:()=>void,
    popup:string,
    error:boolean
  }

function StatusMessage(props:Props) {
    const [openPopup, setOpenPopup] = useState('');
    const {closePopup,popup,error} = props;
    const classes:any = useStyles();

    useEffect(() => {
        setOpenPopup(popup);
      }, [popup,error]);

    return (
        <div className={classes.popup}>
        <Collapse in={Boolean(openPopup)}>
          <Alert
            className="alert_message"
            severity={error ? "error" : "success"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenPopup('');
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

const mapStateToProps = (state:ReduxState) => ({
  popup:state.popup,
  error:state.error
});


const mapDispatchToProps={
  closePopup
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusMessage);