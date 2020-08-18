import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  asyncAddProject,
} from "../../redux/actions/CardsAction";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  "MuiTableCell-root": {
    background: "red",
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

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeDevs = (event) => {
    setDevelopersName(event.target.value);
  };

  const names = [
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
      name: element.name,
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
              <Box className={classes.form_input}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="input_stack" className={classes.formControl}>
                    Stack
                  </InputLabel>
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
              <Box className={classes.form_input}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="input_devs">Developers</InputLabel>
                  <Select
                    id="input_devs__select"
                    multiple
                    value={developersName}
                    onChange={handleChangeDevs}
                    className={classes.formControl}
                    input={<Input />}
                    renderValue={(selected) => (selected.join(", "))}
                  >
                    {developers.map((developer) => (
                      <MenuItem
                        key={developer.id}
                        value={`${developer.id}`}
                      >
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
        rowStyle: {},
        headerStyle: {
          textAlign: "center",
        },
      }}
      align="center"
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(async () => {
              const { data } = await asyncAddProject({
                project: {
                  ...newData,
                  stack: personName,
                  developers: developersName,
                },
              });
              await asyncSetProjects();
              resolve();
              setTable((prevState) => {
                const res = [...prevState.data, elementToRow(data)];
                return { ...prevState, data: res };
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
  asyncAddProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
