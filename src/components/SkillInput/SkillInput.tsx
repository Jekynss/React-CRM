import React from "react";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

type Props = {
  skill:string,
  handleChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
}
function SkillInput(props:Props) {
    const {skill,handleChange} = props
    return (
      <Box  height="50px">
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
