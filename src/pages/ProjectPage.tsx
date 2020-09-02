import React from "react";
import { Grid } from "@material-ui/core";
import ProjectProfile from "../components/ProjectProfile/ProjectProfile";

const ProjectPage: React.FC = (props:any) => (
  <Grid>
    <ProjectProfile params={props.match.params} />
  </Grid>
);

export default ProjectPage;
