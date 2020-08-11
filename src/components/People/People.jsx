import React, { useState, useEffect } from "react";
import {
  asyncDeleteCardRequest,
  addCard,
  closePopup,
} from "../../redux/actions/CardsAction";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";
import StatusMessage from "../StatusMessage/StatusMessage";
import DeleteModal from "../DeleteModal/DeleteModal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  card_box: {
    display: "inline-block",
  },
  button_grid: { display: "flex" },
  button_grid__button: { width: "100%" },
  delete_option: { color: "red" },
  under_img: { display: "flex", justifyContent: "space-between" },
  people_container: {
    display: "inline",
    flexWrap: "wrap",
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
    textDecoration: "none",
    color: "inherit",
  },
  main_block: {
    width: "1200px",
    margin: "0 auto",
  },
}));

function People(props) {
  const { state, asyncDeleteCardRequest, closePopup } = props;
  const [open, setOpen] = useState(false);
  const [itemMenu, setItemMenu] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const [limit, setLimit] = useState(3);

  const handleLoadMore = () => {
    setLimit(limit + 3);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = (e) => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleClickDelete = (event) => {
    handleCloseModal();
    asyncDeleteCardRequest(itemMenu);
  };

  return (
    <Box>
      <StatusMessage closePopup={closePopup} state={state}/>
      <Box className={classes.people_position}>
        <Grid className={classes.main_block}>
          <Grid className={classes.people_container}>
            {state.cards.slice(0, limit).map((elem, index) => (
              <ProfileCard
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                elem={elem}
                setItemMenu={setItemMenu}
                itemMenu={itemMenu}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
            ))}
            <DeleteModal open={open} handleCloseModal={handleCloseModal} handleClickDelete={handleClickDelete}/>
          </Grid>
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
          >
            Add new profile
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {
  asyncDeleteCardRequest,
  addCard,
  closePopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
