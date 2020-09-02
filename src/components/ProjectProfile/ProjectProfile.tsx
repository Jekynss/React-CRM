import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
import { Project, Profile } from "../utils/types";

const useStyles = makeStyles(() => ({
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

type Props={
  asyncUpdateProject(project:Project):Promise<void>,
  asyncGetProject(id:number):Promise<Project>,
  asyncDeleteProject(project_id:number):Promise<void>,
  params:{id:string}
}

function ProjectProfile(props:Props) {
  const history = useHistory();
  const projTemplate:Project = {
    id:0,
    name: "",
    status: "",
    stack: [""],
    price: 0,
    description: "",
  };
  const [project, setProject] = useState<Project>(projTemplate);

  const [openModal, setOpenModal] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const {
    asyncUpdateProject,
    asyncGetProject,
    asyncDeleteProject,
    params,
  } = props;
  const classes = useStyles();

  async function getProject(id:number) {
    const proj:Project = await asyncGetProject(id);
    proj ? setProject(proj) : setProject(projTemplate);
  }

  useEffect(() => {
    const current_id = params.id;
    getProject(Number.parseInt(current_id));
  }, []);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    if (!wasChanged) setWasChanged(true);
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleClickDelete:(event:React.MouseEvent<HTMLButtonElement,MouseEvent> ) => void = () => {
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

  const handleSubmit = (e:FormEvent<Element>) => {
    e.preventDefault();
    setWasChanged(false);
    if (project.id) {
      asyncUpdateProject(project);
    }
  };

  return (
    <>
      <StatusMessage />
      <ValidatorForm
        onSubmit={handleSubmit}
        className={classes.main_form}
        id="project_form"
        onError={(errors:any[]) => console.log(errors)}
      >
        <Grid className={classes.form_container}>
          <Grid
            container
            className={classes.input_texts}
            direction="column"
            justify="space-between"
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
          <Grid xs={8}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignContent="center"
              lineHeight="2"
            >
              Developers:
              <DevelopersCell
                developers={project.profiles}
              />
            </Box>
            {/* <BadgesSection
              name="Stack"
              textAlign="left"
              setResult={setProject}
              addable
              objects={project.stack}
              id={project.id}
              asyncUpdate={asyncUpdateProject}
            /> */}
          </Grid>
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
    </>
  );
}

const mapDispatchToProps = {
  asyncUpdateProject,
  asyncGetProject,
  asyncDeleteProject,
};

export default connect(null, mapDispatchToProps)(ProjectProfile);
