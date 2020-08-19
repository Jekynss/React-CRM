import React, { useState } from "react";
import { Box, Chip } from "@material-ui/core";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddNewSkillForm from "../AddNewSkillForm/AddNewSkillForm";

function SkillsSection(props) {
  const { skills, id, asyncUpdateCardRequest } = props;
  const [openModal, setOpenModal] = useState(false);
  const [tryDelete, setTryDelete] = useState("");

  const handleClickDelete = (value) => {
    setOpenModal(true);
    setTryDelete(value);
  };

  const handleDelete = () => {
    const newSkills = skills.filter((elem) => elem !== tryDelete);
    asyncUpdateCardRequest({ id, skills: newSkills });
    setTryDelete("");
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setTryDelete("");
    setOpenModal(false);
  };

  return (
    <Box my={4} textAlign="left">
      Skills:
      {skills?.map((elem) => (
        <Box key={`${id}-${elem[0]}`} display="inline" mx={1}>
          <Chip
            onDelete={() => handleClickDelete(elem)}
            label={elem}
            value={elem}
          />
        </Box>
      ))}
      <AddNewSkillForm id={id} skills={skills} asyncUpdateCardRequest={asyncUpdateCardRequest}/>

      <DeleteModal
        open={openModal}
        text="Are you sure you want to delete this skill?"
        handleCloseModal={handleCloseModal}
        handleClickDelete={handleDelete}
      />
    </Box>
  );
}

export default SkillsSection;
