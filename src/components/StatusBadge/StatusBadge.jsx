import React from 'react';
import clsx from 'classnames/bind';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    small:{
        width:20,
        height:20,
    },
    medium:{
        width:20,
        height:20,
    },
    active:{
      color:'blue',
    },
    pending:{
      color:'darkgoldenrod',
    },
    completed:{
      color:'green',
    },
    canceled:{
      color:'red',
    },
    radius:{
        borderRadius:'5px'
    }
  });

const StatusBadge = (props) => {
    const { status, size } = props;
    const classes = useStyles();

    const statusClass = clsx({
        [classes.active]: status.toLowerCase() === 'active',
        [classes.pending]: status.toLowerCase() === 'pending',
        [classes.completed]: status.toLowerCase() === 'completed',
        [classes.canceled]: status.toLowerCase() === 'canceled',
        [classes.small]: size === 'sm',
        [classes.medium]: size === 'md',
    })

    return (
        <Button className={statusClass} sizeSmall variant="outlined" color="inherit">
        {status}
      </Button>
    )
}

export default StatusBadge
