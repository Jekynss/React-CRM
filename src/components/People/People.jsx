import React, { useState } from "react";
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
import {dispatch} from '../../index';

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
    top: "0",
    right: "0",
    marginRight: "140px",
  },
  buttonWrapper:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  main_block: {
    width: "1400px",
    position: "relative",
    //width: "fit-content",
    margin: "0 auto",
  },
  pageName:{
    marginLeft:"40px"
  }
}));

function People(props) {
  const { state, asyncDeleteCardRequest, closePopup, limitPeople,  setLimitToRedux} = props;
  const [open, setOpen] = useState(false);
  const [itemMenu, setItemMenu] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [limit, setLimit] = useState(limitPeople);
  const classes = useStyles();
  
  const handleLoadMore = () => {
    const newLimit=limit+4;
    dispatch(setLimitToRedux(newLimit))
    setLimit(newLimit);
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
    <Box mt={8}>
      <StatusMessage closePopup={closePopup} state={state} />
      <Box className={classes.people_position}>
        <Grid className={classes.main_block}>
          {props.buttonCreate ? (
            <div className={classes.buttonWrapper}>
            <h1 className={classes.pageName}>People</h1>
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
            </div>
          ) : (
            ""
          )}
          <Box>
            <Grid className={classes.people_container}>
              {state.cards.slice(0, limit).map((elem, index) => (
                <ProfileCard
                  key={elem.id}
                  handleCloseModal={handleCloseModal}
                  handleOpenModal={handleOpenModal}
                  elem={elem}
                  setItemMenu={setItemMenu}
                  itemMenu={itemMenu}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                />
              ))}
              <DeleteModal
                open={open}
                handleCloseModal={handleCloseModal}
                handleClickDelete={handleClickDelete}
              />
            </Grid>
          </Box>
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
