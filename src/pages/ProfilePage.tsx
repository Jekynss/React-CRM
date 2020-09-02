import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import ProjectsBadgesSection from "../components/ProjectsBadgesSection/ProjectsBadgesSection";
import BadgesSection from "../components/BadgesSection/BadgesSection";
import { ReduxState, NewCard, Card, Project, Profile } from '../components/utils/types'

const useStyles = makeStyles(() => ({
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
    margin: "10% 0 auto",
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
    width: "fit-content",
  },
  inputText: {
    width: "100%",
  },
}));

type Props = {
  state: ReduxState,
  asyncUpdateCardRequest: (obj: any, form?: any) => any,
  asyncAddCardRequest(card: NewCard, form?: FormData | null): Promise<void>,
  asyncDeleteCardRequest(card_id: number): Promise<void>,
  match: { params: { id: string } }
}

const ProfilePage = (props: Props) => {
  const cardTemplate: NewCard = {
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
  const [avatar, setAvatar] = useState<any>(null);
  const [redirect, setRedirect] = useState(false);
  const {
    asyncUpdateCardRequest,
    asyncAddCardRequest,
    asyncDeleteCardRequest,
    state,
  } = props;
  const classes: any = useStyles();

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();
    setWasChanged(false);
    let formData: null | FormData = null;
    if (avatar) {
      const file = avatar[0];
      formData = new FormData();
      formData.append('avatar', file, file.name);
    }
    if (card.id) {
      const new_image: string = await asyncUpdateCardRequest(card, formData);
      setCard({ ...card, image_url: new_image });
    } else {
      if (!avatar) {
        asyncAddCardRequest(card);
      }
      else {
        asyncAddCardRequest(card, formData);
      }
      setRedirect(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!wasChanged) setWasChanged(true);
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleClickDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickDeleteModal = () => {
    asyncDeleteCardRequest(card.id as number);
    setOpenModal(false);
    history.goBack();
  };

  useEffect(() => {
    const current_id = props.match.params.id;
    const card = state.cards.find((card) => (card.id).toString() === current_id);
    card ? setCard(card) : setCard(cardTemplate);
  }, [state.cards]);

  return (
    <div className={classes.profile_section}>
      <StatusMessage />
      {redirect && <Redirect push to="/" />}
      <ValidatorForm
        onSubmit={handleSubmit}
        className={classes.main_form}
        onError={(errors: any[]) => console.log(errors)}
      >
        <Grid className={classes.form_container}>
          <ImageInput avatar={avatar} setAvatar={setAvatar} classes={classes} card={card as Card} />
          <Grid
            container={true}
            className={classes.input_texts}
            direction="column"
            justify="space-between"
          >
            <FullNameInput
              handleChange={handleChange}
              obj={card as Card}
              classes={classes}
            />
            <EmailInput
              handleChange={handleChange}
              obj={card}
              classes={classes}
            />
            <PhoneInput handleChange={handleChange} card={card as Card} />
            <WebSiteInput handleChange={handleChange} card={card as Card} />
            <AddressInput handleChange={handleChange} card={card as Card} />
          </Grid>
        </Grid>
        <DesctiptionInput
          handleChange={handleChange}
          card={card as Card}
          about_text={classes.about_text}
        />
        {card.id ? (
          <>
            <ProjectsBadgesSection id={card.id} />
            <BadgesSection
              name="Skills"
              textAlign="left"
              addable
              objects={card.skills}
              id={card.id}
              asyncUpdate={asyncUpdateCardRequest}
            />
          </>
        ) : null}
        <FormButtons
          wasChanged={wasChanged}
          classes={classes}
          card={card as Card}
          handleClickDelete={handleClickDelete}
          goBack={history.goBack}
        />
      </ValidatorForm>
      <DeleteModal
        open={openModal}
        text="Are you sure you want to delete this profile?"
        handleCloseModal={handleCloseModal}
        handleClickDelete={handleClickDeleteModal}
      />
    </div>
  );
}

const mapStateToProps = (state: ReduxState) => ({
  state,
});

const mapDispatchToProps = {
  asyncUpdateCardRequest,
  asyncAddCardRequest,
  asyncDeleteCardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
