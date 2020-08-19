import React from "react";
import TextField from "@material-ui/core/TextField";

function SkillInput(props) {
    const {skill,handleChange} = props
    return (
        <>
        <TextField
          id="Skill"
          type="text"
          value={skill}
          onChange={handleChange}
          name="skill"
          label="Skill"
        />
      </>
    )
}

export default SkillInput
