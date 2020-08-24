import React, { useState, useEffect } from "react";
import {
  asyncUpdateProject,
  asyncGetProject,
  asyncDeleteProject,
} from "../../redux/actions/CardsAction";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import FullNameInput from "../FullNameInput/FullNameInput";
import EmailInput from "../EmailInput/EmailInput";
import PhoneInput from "../PhoneInput/PhoneInput";
import WebSiteInput from "../WebSiteInput/WebSiteInput";
import AddressInput from "../AddressInput/AddressInput";
import DesctiptionInput from "../DescriptionInput/DesctiptionInput";
import ImageInput from "../ImageInput/ImageInput";
import FormButtons from "../FormButtons/FormButtons";
import StatusMessage from "../StatusMessage/StatusMessage";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import ProjectsBadgesSection from "../ProjectsBadgesSection/ProjectsBadgesSection";
import BadgesSection from "../BadgesSection/BadgesSection";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import StatusInput from "../StatusInput/StatusInput";
import PriceInput from "../PriceInput/PriceInput";
import { Box } from "@material-ui/core";
import DevelopersCell from "../DevelopersCell/DevelopersCell";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  input_texts: {
    width: "300px",
  },
  main_form: {
    width: "50%",
    textAlign: "center",
    margin: "50px auto",
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

function ProjectProfile(props) {
  const history = useHistory();
  const projTemplate = {
    name: "",
    status: "",
    stack: [""],
    price: 0,
    description: "",
  };
  const [project, setProject] = useState(projTemplate);

  const [openModal, setOpenModal] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const {
    asyncUpdateProject,
    asyncGetProject,
    asyncDeleteProject,
    params,
  } = props;
  const classes = useStyles();

  async function getProject(id) {
    const proj = await asyncGetProject(id);
    proj ? setProject(proj) : setProject(projTemplate);
  }

  useEffect(() => {
    const current_id = params.id;
    getProject(current_id);
  }, []);

  const handleChange = (e) => {
    if (!wasChanged) setWasChanged(true);
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleClickDelete = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickDeleteModal = () => {
    asyncDeleteProject(project.id);
    setOpenModal(false);
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWasChanged(false);
    if (project.id) {
      asyncUpdateProject(project);
    }
  };

  return (
    <div>
      <StatusMessage />
      <ValidatorForm
        onSubmit={handleSubmit}
        className={classes.main_form}
        id="project_form"
        onError={(errors) => console.log(errors)}
      >
        <Grid className={classes.form_container}>
          <Grid
            container
            className={classes.input_texts}
            direction="column"
            justify="space-between"
            align="center"
            xs={8}
          >
            <FullNameInput
              handleChange={handleChange}
              obj={project}
              classes={classes}
            />
            <StatusInput
              handleChange={handleChange}
              obj={project}
              classes={classes}
            />
            <PriceInput
              handleChange={handleChange}
              obj={project}
              classes={classes}
            />
            <Box my={4}>
              <DesctiptionInput
                handleChange={handleChange}
                card={project}
                about_text={classes.inputText}
                notOutlined
              />
            </Box>
          </Grid>
        </Grid>
        {project.id ? (
          <Box xs={8}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignContent="center"
              lineHeight="2"
            >
              Developers:
              <DevelopersCell
                name="Developer"
                developers={project.profiles}
                id={project.id}
              />
            </Box>
            <BadgesSection
              name="Stack"
              textAlign="left"
              setResult={setProject}
              addable
              objects={project.stack}
              id={project.id}
              asyncUpdate={asyncUpdateProject}
            />
          </Box>
        ) : null}
        <FormButtons
          wasChanged={wasChanged}
          classes={classes}
          card={project}
          handleClickDelete={handleClickDelete}
          goBack={history.goBack}
        />
      </ValidatorForm>
      <DeleteModal
        open={openModal}
        text="Are you sure you want to delete this project?"
        handleCloseModal={handleCloseModal}
        handleClickDelete={handleClickDeleteModal}
      />
    </div>
  );
}

const mapDispatchToProps = {
  asyncUpdateProject,
  asyncGetProject,
  asyncDeleteProject,
};

export default connect(null, mapDispatchToProps)(ProjectProfile);
