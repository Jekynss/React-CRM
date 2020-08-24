import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import clsx from "classnames/bind";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Box, CardMedia, TextField } from "@material-ui/core";
import MaterialTable, { MTableEditField } from "material-table";
import StackCell from "../StackCell/StackCell";
import DevelopersCell from "../DevelopersCell/DevelopersCell";
import Axios from "axios";
import { connect } from "react-redux";
import {
  asyncSetProjects,
  asyncDeleteProject,
  asyncAddProject,
} from "../../redux/actions/CardsAction";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  "MuiTableCell-root": {
    background: "red",
  },
  image: {
    width: "30px",
    display: "inline",
    borderRadius: "100%",
    border: "2px black solid",
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
    verticalAlign: "center",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  form_input: {
    textAlign: "center",
  },
  link:{
    textDecoration:"none",
    color:'black'
  }
});

function ProjectsTable(props) {
  const classes = useStyles();
  const {
    token,
    reduxProjects,
    asyncSetProjects,
    asyncDeleteProject,
    developers,
    asyncAddProject,
  } = props;

  const [personName, setPersonName] = React.useState([]);
  const [developersName, setDevelopersName] = React.useState([]);

  const clearState=()=>{
    setPersonName([]);
    setDevelopersName([]);
  }
  const stackNames = [
    "Node",
    "JavaScript",
    "HTML",
    "React",
    "Postgres",
    "mongoDB",
    "MySQL",
    "PHP",
    "Composer",
    "Docker",
    "Git",
  ];

  useEffect(() => {
    setTable({ ...table, data: setRowsByArray(reduxProjects) });
  }, [token, reduxProjects]);

  const [table, setTable] = React.useState({
    columns: [
      { title: "Project name", field: "name" },
      {
        title: "Status",
        field: "status",
        lookup: {
          active: <StatusBadge status="active" size="md" />,
          pending: <StatusBadge status="pending" size="md" />,
          failed: <StatusBadge status="failed" size="md" />,
          completed: <StatusBadge status="completed" size="md" />,
        },
      },
      { title: "Stack", field: "stack", multiplySelectStack: true },
      {
        title: "Price",
        field: "price",
        type: "numeric",
      },
      {
        title: "Developers",
        field: "developers",
        multiplySelectDevs: true,
      },
    ],
    data: setRowsByArray(reduxProjects),
  });

  function elementToRow(element) {
    return {
      id: element.id,
      name: <Link to={`/projects/${element.id}`} className={classes.link}>{element.name}</Link>,
      status: element.status,
      stack: <StackCell stacks={element.stack} />,
      price: `${element.price}$`,
      developers: <DevelopersCell developers={element.profiles} />,
    };
  }

  function setRowsByArray(projects) {
    return projects.map((elem) => elementToRow(elem));
  }

  return (
    <Box width="80%" mx="auto">
      <MaterialTable
        className={classes.table}
        title="Projects Table"
        columns={table.columns}
        data={table.data}
        components={{
          EditField: (fieldProps) => {
            const {
              columnDef: { multiplySelectStack, multiplySelectDevs },
            } = fieldProps;
            if (multiplySelectStack) {
              return (
                <Autocomplete
                multiple
                id="tags-standard"
                value={personName}
                options={stackNames}
                onChange={(e,val)=>{setPersonName(val)}}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Stack"
                    placeholder="Stack"
                  />
                )}
              />
              );
            } else if (multiplySelectDevs) {
              return (
                <Autocomplete
                multiple
                id="tags-standard"
                value={developersName}
                options={developers}
                onChange={(e,val)=>{setDevelopersName(val)}}
                getOptionLabel={(option) => option.name}
                renderOption={(option, { selected }) => (
                  <>
                          <Box component="span" mx={2}>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="30"
                              image={option.image_url}
                              title="Contemplative Reptile"
                              className={classes.image}
                            />
                          </Box>
                          <ListItemText primary={option.name} />
                  </>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Developers"
                    placeholder="Developers"
                  />
                )}
              />
              );
            } else {
              return (
                <Box mt="19px" className={classes.form_input}>
                  <MTableEditField
                    className={classes.formControl}
                    {...{ ...fieldProps, value: fieldProps.value || "" }}
                  />
                </Box>
              );
            }
          },
        }}
        options={{
          actionsColumnIndex: -1,
          cellStyle: {
            textAlign: "center",
            verticalAlign: "center",
          },
          rowStyle: (rowData) => {},
          headerStyle: {
            textAlign: "center",
          },
        }}
        align="center"
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve) => {
              const developersIds = developersName.map((elem) => elem.id);
              await asyncAddProject({
                project: {
                  ...newData,
                  stack: personName,
                  developers: developersIds,
                },
              });
              await asyncSetProjects();
              clearState();
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve) => {
              await asyncDeleteProject(oldData.id);
              await asyncSetProjects();
              resolve();
            }),
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  token: state.token,
  reduxProjects: state.projects,
  developers: state.cards,
});

const mapDispatchToProps = {
  asyncSetProjects,
  asyncDeleteProject,
  asyncAddProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
