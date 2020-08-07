import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logout_button: {
    color: "red",
  },
  pages: {
    color: "white",
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default function Header() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              align="center"
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={handleClose}
                  className={classes.logout_button}
                >
                  Logout
                </MenuItem>
              </Menu>
              <Grid className={classes.direction}>
                <Typography variant="h5" className={classes.title}>
                  People
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="center">
              {["home", "projects", "people"].map((anchor) => (
                <Grid
                  item
                  xs={2}
                  className={classes.direction}
                  key={Math.random()}
                >
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className={classes.pages}
                  >
                    <Link className={classes.link} to={"/people"}>{anchor}</Link>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  );
}
