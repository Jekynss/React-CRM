import React from "react";
import TextField from "@material-ui/core/TextField";
import { Box, Grid } from "@material-ui/core";

function SkillInput(props) {
    const {skill,handleChange} = props
    return (
      <Box xs={4} height="50px">
        <TextField
          id="Skill"
          type="text"
          value={skill}
          onChange={handleChange}
          name="skill"
          label="Skill"
        />
      </Box>
    )
}

export default SkillInput
