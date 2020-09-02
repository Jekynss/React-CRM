import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { asyncGetProjects } from "../../redux/actions/CardsAction";
import { Grid, Box } from "@material-ui/core";
import Badge from "../Badge/Badge";
import { Link } from "react-router-dom";
import {Project} from '../utils/types'

type Props = {
  id:number,
  asyncGetProjects:(id:number)=>Promise<Project[]>,
}

function ProjectsBadgesSection(props:Props) {
  const { id, asyncGetProjects } = props;
  const [projects, setProjects] = useState<Project[]>([]);

  async function asyncSetProjects() {
    if (id) {
      const projects = await asyncGetProjects(id);
      setProjects(projects);
    }
  }

  useEffect(() => {
    asyncSetProjects();
  }, [id]);
  return (
    <Box my={8} textAlign="left">
      Projects:
      {projects.map((elem) => (
        <Link
        to={{pathname: `/projects/${elem.id}`}}
          replace
        >
          <Badge name={elem.name} />
        </Link>
      ))}
    </Box>
  );
}

const mapDispatchToProps = {
  asyncGetProjects,
};

export default connect(null, mapDispatchToProps)(ProjectsBadgesSection);
