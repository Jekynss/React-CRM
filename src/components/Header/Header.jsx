import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import {setTokenAuth, paidStatus} from '../../redux/actions/CardsAction'

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
    fontSize: "16px",
    fontFamily: "sans-serif"
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  navBar:{
    width: '94%'
  }
}));

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {token,setTokenAuth, paidStatus} = props;
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setTokenAuth({token:''});
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <AppBar position="inherit">
        {token &&<Toolbar>
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
                  onClick={handleLogout}
                  className={classes.logout_button}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
            <Grid container justify="center" className={classes.navBar}>
              {paidStatus === "active" ? (["Home", "Projects", "People"].map((anchor,index) => (
                <Grid
                  item
                  xs={2}
                  className={classes.direction}
                  key={index}
                >
                  <Box
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className={classes.pages}
                  >
                    <Link className={classes.link} to={`/${anchor === "Home" ? "" : anchor.toLowerCase()}`}>{anchor}</Link>
                  </Box>
                </Grid>
              ))):null}
            </Grid>
          </Toolbar>}
        </AppBar>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token:state.token,
  paidStatus:state.paidStatus,
});

const mapDispatchToProps = {
  setTokenAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
