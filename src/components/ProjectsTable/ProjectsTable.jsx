import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import clsx from "classnames/bind";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Box, CardMedia } from "@material-ui/core";
import MaterialTable, { MTableEditField } from "material-table";
import StackCell from "../StackCell/StackCell";
import DevelopersCell from "../DevelopersCell/DevelopersCell";
import Axios from "axios";
import { connect } from "react-redux";
import {
  asyncSetProjects,
  asyncDeleteProject,
} from "../../redux/actions/CardsAction";
import AutoComplete from "@material-ui/lab/Autocomplete";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  'MuiTableCell-root':{
    background:'red',
  },
  table: {
    minWidth: 650,
    height: 950,
    width: "100%",
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
    verticalAlign: 'center'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

function ProjectsTable(props) {
  const classes = useStyles();
  const { token, reduxProjects, asyncSetProjects, asyncDeleteProject, developers} = props;

  const [personName, setPersonName] = React.useState([]);
  const [developersName, setDevelopersName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeDevs = (event) => {
    setDevelopersName(event.target.value);
  };

  const names = [
    "Node",
    "React",
    "Postgres",
    "mongoDB",
    "MySQL",
    "PHP",
    "Composer",
    "Docker",
  ];


  useEffect(() => {
    if (token && reduxProjects.length == 0) {
      asyncSetProjects();
    } else {
      setTable({ ...table, data: setRowsByArray(reduxProjects) });
    }
  }, [token, reduxProjects]);

  const [table, setTable] = React.useState({
    columns: [
      { title: "Project name", field: "name" },
      {
        title: "Status",
        field: "status",
        lookup: { 0: "active", 1: "pending", 2: "failed", 3: "completed" },
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

  function setRowsByArray(projects) {
    return projects.map((elem) => ({
      id: elem.id,
      name: elem.name,
      status: <StatusBadge status={elem.status} size="md" />,
      stack: <StackCell stacks={elem.stack} />,
      price: `${elem.price}$`,
      developers: <DevelopersCell developers={elem.profiles} />,
    }));
  }

  return (
    <MaterialTable
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
              <Box>
              <FormControl className={classes.formControl}>
                <InputLabel id="input_stack" className={classes.formControl}>Stack</InputLabel>
                <Select
                  id="input_stack__select"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  className={classes.formControl}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Box>
            );
          } else if (multiplySelectDevs) {
            return (
              <Box>
              <FormControl className={classes.formControl}>
                <InputLabel id="input_devs">Developers</InputLabel>
                <Select
                  id="input_devs__select"
                  multiple
                  value={developersName}
                  onChange={handleChangeDevs}
                  className={classes.formControl}
                  input={<Input />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {developers.map((developer) => (
                    <MenuItem key={developer.id} value={`${developer.name}(${developer.id})`}>
                      <Box component="span" mx={2}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="30"
                          image={developer.image_url}
                          title="Contemplative Reptile"
                          className={classes.image}
                        />
                      </Box>
                      <ListItemText primary={developer.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Box>
            );
          } else {
            return (
              <Box>
              <MTableEditField className={classes.formControl}
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
          verticalAlign: 'center',
        },
        rowStyle:{
        },
        headerStyle: {
          textAlign: "center",
        },
      }}
      align="center"
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setTable((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(async () => {
              await asyncDeleteProject(oldData.id);
              setTable((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
              resolve();
            }, 600);
          }),
      }}
    />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
