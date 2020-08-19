import React, { useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import SkillInput from "../SkillInput/SkillInput";
import { Button, jssPreset, Box } from "@material-ui/core";

function AddNewSkillForm(props) {
  const [skill,setSkill] = useState('');
  const {skills,asyncUpdateCardRequest,id} = props;

  const handleChange=(e)=>{
      setSkill(e.target.value);
  }
  
  const handleSubmit=()=>{
    asyncUpdateCardRequest({id:id,skills:[...skills,skill]});
    setSkill('');
  }

  return (
      <ValidatorForm onSubmit={handleSubmit}>
        <Box display="flex" my={4}>
      <SkillInput skill={skill} handleChange={handleChange}/>
      <Button
        variant="contained"
        id="submit"
        color="primary"
        disabled={!skill}
        type="submit"
      >
        Add
      </Button>
    </Box>
    </ValidatorForm>
  );
}

export default AddNewSkillForm;
