import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import clsx from "classnames/bind";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Box, CardMedia, TextField, Options } from "@material-ui/core";
import MaterialTable, { MTableEditField, Column } from "material-table";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import StatusMessage from "../StatusMessage/StatusMessage";
import { Project, Profile, ReduxState } from "../utils/types";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

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
  link: {
    textDecoration: "none",
    color: "black",
  },
});

type Props = {
  token:string,
  reduxProjects:Project[],
  developers: Profile[],
  asyncSetProjects:()=>void,
  asyncDeleteProject:(id:number)=>void,
  asyncAddProject:(object:{project:Project}) => Promise<void>,
}

function ProjectsTable(props:Props) {
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
  const [developersName, setDevelopersName] = React.useState<Profile[]>([]);

  const clearState = () => {
    setPersonName([]);
    setDevelopersName([]);
  };
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

  function elementToRow(element:Project) {
    return {
      id: element.id,
      name: (
        <Link to={`/projects/${element.id}`} className={classes.link}>
          {element.name}
        </Link>
      ),
      status: element.status,
      stack: <StackCell stacks={element.stack} />,
      price: `${element.price}$`,
      developers: <DevelopersCell developers={element.profiles} />,
    };
  }

  function setRowsByArray(projects:Project[]) {
    return projects.map((elem) => elementToRow(elem));
  }

  return (
    <>
      <StatusMessage />
      <Box width="80%" mx="auto">
        <MaterialTable
          title="Projects Table"
          columns={table.columns as Column<Project>[]}
          data={table.data as any[]}
          options={{
            actionsColumnIndex: -1,
            cellStyle: {
              textAlign: "center",
              verticalAlign: "center",
            } as CSSProperties,
            headerStyle: {
              textAlign: "center",
            } as CSSProperties,
          } as {actionsColumnIndex:number, cellStyle:CSSProperties, headerStyle:CSSProperties}} 
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
    </>
  );
}

const mapStateToProps = (state:ReduxState) => ({
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
