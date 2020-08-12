import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { closePopup } from "../redux/actions/CardsAction";
import Grid from "@material-ui/core/Grid";
import {
  asyncUpdateCardRequest,
  asyncAddCardRequest,
  asyncDeleteCardRequest,
} from "../redux/actions/CardsAction";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import FullNameInput from "../components/FullNameInput/FullNameInput";
import EmailInput from "../components/EmailInput/EmailInput";
import PhoneInput from "../components/PhoneInput/PhoneInput";
import WebSiteInput from "../components/WebSiteInput/WebSiteInput";
import AddressInput from "../components/AddressInput/AddressInput";
import DesctiptionInput from "../components/DescriptionInput/DesctiptionInput";
import ImageInput from "../components/ImageInput/ImageInput";
import FormButtons from "../components/FormButtons/FormButtons";
import StatusMessage from "../components/StatusMessage/StatusMessage";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import { useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
  },
  input_texts: {
    width: "300px",
  },
  main_form: {
    width: "50%",
    textAlign: "center",
    margin: "50px auto",
  },
  about_text: {
    width: "100%",
    margin: "10% auto",
  },
  upload_button: {
    width: "100%",
  },
  submit_button: {
    width: "100px",
    height: "50px",
  },
  submit_wrapper: {
    display: "flex",
    justifyItems: "end",
    alignItems: "end",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  imagePlaceHolder: {
    width: "250px",
    height: "250px",
  },
  buttonsPanel: {
    flexWrap: "nowrap",
    width:'fit-content'
  },
  inputText: {
    width: "100%",
  },
}));

function ProfilePage(props) {
  const cardTemplate = {
    name: "",
    description: "",
    phone: "",
    website: "",
    email: "",
    address: "",
    image_url: "",
  };
  const history = useHistory();
  const [card, setCard] = useState(cardTemplate);
  const [openModal, setOpenModal] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const {
    asyncUpdateCardRequest,
    asyncAddCardRequest,
    asyncDeleteCardRequest,
    closePopup,
    state,
  } = props;
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    setWasChanged(false);
    if (card.id) {
      asyncUpdateCardRequest(card);
    } else {
      card.image_url = `https://robohash.org/${Math.random()}?set=any`;
      asyncAddCardRequest(card);
      setRedirect(true);
    }
  };

  const handleChange = (e) => {
    if (!wasChanged) setWasChanged(true);
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleClickDelete = (e) => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickDeleteModal = () => {
    asyncDeleteCardRequest(card.id);
    setOpenModal(false);
    history.goBack();
  };

  useEffect(() => {
    const current_id = props.match.params.id;
    const card = state.cards.find((card) => card.id?.toString() === current_id);
    card ? setCard(card) : setCard(cardTemplate);
  }, [state]);

  return (
    <div className={classes.profile_section}>
      <StatusMessage closePopup={closePopup} state={state} />
      {redirect && <Redirect push to="/" />}
      <ValidatorForm
        onSubmit={handleSubmit}
        className={classes.main_form}
        onError={(errors) => console.log(errors)}
      >
        <Grid className={classes.form_container}>
          <ImageInput classes={classes} card={card} />
          <Grid
            container
            className={classes.input_texts}
            direction="column"
            justify="space-between"
            align="center"
          >
            <FullNameInput
              handleChange={handleChange}
              obj={card}
              classes={classes}
            />
            <EmailInput
              handleChange={handleChange}
              obj={card}
              classes={classes}
            />
            <PhoneInput handleChange={handleChange} card={card} />
            <WebSiteInput handleChange={handleChange} card={card} />
            <AddressInput handleChange={handleChange} card={card} />
          </Grid>
        </Grid>
        <DesctiptionInput
          handleChange={handleChange}
          card={card}
          about_text={classes.about_text}
        />
        <FormButtons
          wasChanged={wasChanged}
          classes={classes}
          card={card}
          handleClickDelete={handleClickDelete}
          goBack={history.goBack}
        />
      </ValidatorForm>
      <DeleteModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        handleClickDelete={handleClickDeleteModal}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {
  asyncUpdateCardRequest,
  asyncAddCardRequest,
  asyncDeleteCardRequest,
  closePopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
