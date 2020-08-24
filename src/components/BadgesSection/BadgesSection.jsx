import React, { useState } from "react";
import { Box, Chip } from "@material-ui/core";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddNewSkillForm from "../AddNewSkillForm/AddNewSkillForm";
import { ValidatorForm } from "react-material-ui-form-validator";

function BadgesSection(props) {
  const { objects, id, asyncUpdate, name, addable, textAlign, setResult} = props;
  const [openModal, setOpenModal] = useState(false);
  const [tryDelete, setTryDelete] = useState("");

  const handleClickDelete = (value) => {
    setOpenModal(true);
    setTryDelete(value);
  };

  const handleDelete = async () => {
    const newSkills = objects.filter((elem) => elem !== tryDelete);
    const data = await asyncUpdate({ id, [`${name.toLowerCase()}`]: newSkills });
    if(setResult)
    setResult(data);
    setTryDelete("");
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setTryDelete("");
    setOpenModal(false);
  };

  return (
    <Box my={4} textAlign={textAlign}>
      {name}:
      {objects?.map((elem) => (
        <Box key={`${id}-${elem[0]}${Math.random()}`} display="inline" mx={1}>
          <Chip
            onDelete={() => handleClickDelete(elem)}
            label={elem}
            value={elem}
          />
        </Box>
      ))}
      {addable ? (
        <Box display="flex" justifyContent="flex-start" >
        <AddNewSkillForm
          id={id}
          objects={objects}
          name={name.toLowerCase()}
          setResult={setResult}
          asyncUpdateCardRequest={asyncUpdate}
        />
        </Box>
      ) : null}
      <DeleteModal
        open={openModal}
        text="Are you sure you want to delete this skill?"
        handleCloseModal={handleCloseModal}
        handleClickDelete={handleDelete}
      />
    </Box>
  );
}

export default BadgesSection;
