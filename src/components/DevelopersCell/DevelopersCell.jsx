import React from "react";
import { CardMedia, Box } from "@material-ui/core";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "30px",
    display: "inline",
    borderRadius: "100%",
    border: "2px black solid",
  },
}));

export default function DevelopersCell(props) {
  const { developers } = props;
  const classes = useStyles();
  return (
    <>
      {developers?.map((elem) =>(
        <Box component="span" mx={1} key={`${elem.id}`}>
          <Link to={`/people/${elem.id}`}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="30"
              image={elem.image_url}
              title="Contemplative Reptile"
              className={classes.image}
            />
          </Link>
        </Box>
      ))}
    </>
  );
}
