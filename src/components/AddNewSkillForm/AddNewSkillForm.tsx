import React, { useState, ChangeEvent, FormEvent} from "react";
import SkillInput from "../SkillInput/SkillInput";
import { Button, Box } from "@material-ui/core";
import {Card,Project,Profile} from '../utils/types';

type Props = {
  asyncUpdateCardRequest:(obj:Card|Project|Object)=>Project|Profile|Promise<void>|void,
  id:number,
  name:string,
  objects:string[] | undefined,
  setResult?:(card:Card|Profile|Project)=>void,
}

function AddNewSkillForm(props:Props) {
  const [skill, setSkill] = useState("");
  const { asyncUpdateCardRequest, id, name, objects, setResult } = props;

  const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
    setSkill(e.target.value);
  };

  const handleSubmit = async (e:FormEvent<Element>) => {
    e.preventDefault();
    const data = await asyncUpdateCardRequest({ id: id, [`${name}`]: [...objects as string[], skill] });
    if(setResult && data)
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
