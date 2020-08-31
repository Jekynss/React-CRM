import React from "react";
import { CardMedia, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {Profile} from '../utils/types'

const useStyles = makeStyles(() => ({
  image: {
    width: "30px",
    display: "inline",
    borderRadius: "100%",
    border: "2px black solid",
  },
}));

type Props = {
  developers: Profile[]|undefined,
}

export default function DevelopersCell(props:Props) {
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
              title={elem.name}
              className={classes.image}
            />
          </Link>
        </Box>
      ))}
    </>
  );
}
