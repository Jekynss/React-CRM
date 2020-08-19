import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { asyncGetProjects } from "../../redux/actions/CardsAction";
import { Grid, Box } from "@material-ui/core";
import Badge from "../Badge/Badge";

function ProjectsBadgesSection(props) {
  const { id, asyncGetProjects } = props;
  const [projects, setProjects] = useState([]);

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
        <Badge name={elem.name}/>
      ))}
    </Box>
  );
}

const mapDispatchToProps = {
  asyncGetProjects,
};

export default connect(null, mapDispatchToProps)(ProjectsBadgesSection);
