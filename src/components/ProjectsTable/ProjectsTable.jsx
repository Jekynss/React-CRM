import React from "react";
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
import { Box } from "@material-ui/core";
import MaterialTable from "material-table";
import StackCell from "../StackCell/StackCell";
import DevelopersCell from "../DevelopersCell/DevelopersCell";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    height: 950,
    width: "100%",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ProjectsTable(props) {
  const classes = useStyles();
  const status = "active";
  const stack = ["React","NodeJs","PostgreSQl"];
  const price = "200";
  const developers = [{id:1,image_url:'https://robohash.org/1?set=any'},{id:4,image_url:'https://robohash.org/14?set=any'}]

  const [table, setTable] = React.useState({
    columns: [
      { title: "Project name", field: "name" },
      { title: "Status", field: "status" },
      { title: "Stack", field: "stack" },
      {
        title: "Price",
        field: "price",
        type: "numeric",
      },
      {
        title: "Developers",
        field: "developers",
      },
    ],
    data: [
      { name: "Mehmet", status:<StatusBadge status={status} />, stack: <StackCell stacks={stack}/>, price:`${price}$`, developers: <DevelopersCell developers={developers}/>},
      { name: "Mehmet", status:<StatusBadge status={status} />, stack: <StackCell stacks={stack}/>, price:`${price}$`, developers: <DevelopersCell developers={developers}/> },
    ],
  });

  return (
    <MaterialTable
      title="Projects Table"
      columns={table.columns}
      data={table.data}
      options={{
        actionsColumnIndex: -1,
        cellStyle: {
          textAlign: 'center',
        },
        headerStyle: {
          textAlign: 'center',
        }
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
            setTimeout(() => {
              resolve();
              setTable((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
