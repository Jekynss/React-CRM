import React, { useState } from "react";
import {createBrowserHistory} from 'history'
import { deleteCard, addCard } from "../../redux/actions/CardsAction";
import { connect } from "react-redux";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { red } from "@material-ui/core/colors";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MenuList from "@material-ui/core/MenuList";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card_box: {
    display: "inline-block",
  },
  card: {
    maxWidth: 350,
  },
  button_grid: { display: "flex" },
  button_grid__button: { width: "100%" },
  delete_option: { color: "red" },
  under_img: { display: "flex", justifyContent: "space-between" },
  modal: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  modal_buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
  people_container: {
    width: "77%",
    margin: "0 auto",
  },
  people_position: {
    position: "relative",
  },
  add_new_button: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

function People(props) {
  const { state, deleteCard, addCard } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(3);
  const [itemMenu, setItemMenu] = useState("");

  const handleOpenModal = (e) => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
    setItemMenu(event.currentTarget.id);
  };

  const handleClickDelete = (event) => {
    handleCloseModal();
    deleteCard(itemMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setItemMenu("");
  };

  const handleClickEdit=()=>{
    const history = createBrowserHistory();
    history.push(`/people/${itemMenu}`);
  }
  const handleLoadMore = () => {
    setLimit(limit + 3);
  };

  return (
    <Box className={classes.people_position}>
      <Grid className={classes.people_container}>
        {state.cards.slice(0, limit).map((elem, index) => (
          <Box key={index} id={elem.id} className={classes.card_box} m={8}>
            <Card className={classes.card}>
              <Link className={classes.link} to={`/people/${elem.id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="270"
                    image={elem.imageUrl}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Link>
              <CardContent>
                <Box className={classes.under_img}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {elem.fullName}
                  </Typography>
                  <CardActions>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      id={elem.id}
                    >
                      ...
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      display="flex"
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClickEdit}>
                        <Link
                          className={classes.link}
                          to={`/people/${elem.id}`}
                          className={classes.link}
                        >
                          Edit Profile
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={handleOpenModal}
                        className={classes.delete_option}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </CardActions>
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  {elem.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
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
      </Grid>
      {state.cards.length > limit && (
        <Button
          className={classes.button_grid__button}
          size="large"
          color="secondary"
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      )}
      <Link className={classes.link} to={"/people/new"}>
        <Button
          className={classes.add_new_button}
          size="large"
          color="secondary"
          variant="contained"
          onClick={handleClickDelete}
        >
          Add new profile
        </Button>
      </Link>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {
  deleteCard,
  addCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
