import React, { useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import SkillInput from "../SkillInput/SkillInput";
import { Button, jssPreset, Box } from "@material-ui/core";

function AddNewSkillForm(props) {
  const [skill, setSkill] = useState("");
  const { asyncUpdateCardRequest, id, name, objects,setResult } = props;

  const handleChange = (e) => {
    setSkill(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await asyncUpdateCardRequest({ id: id, [`${name}`]: [...objects, skill] });
    if(setResult)
    setResult(data);
    setSkill("");
  };

  return (
      <Box display="flex" my={4}>
        <SkillInput skill={skill} handleChange={handleChange} />
        <Button
          variant="contained"
          id="submit_add_skill"
          color="primary"
          disabled={!skill}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Box>
  );
}

export default AddNewSkillForm;
