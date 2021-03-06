import React,{useState, ChangeEvent} from "react";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {Card} from '../utils/types';

type Props = {
  classes:any,
  card:Card,
  avatar:any,
  setAvatar:any,
}

export default function ImageInput(props:Props) {
  const { classes, card, setAvatar } = props;

  return (
    <Grid>
      <input
        accept="image/*"
        className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        name="avatar"
        onChange={(e:ChangeEvent<HTMLInputElement>) => {const target = e.target as HTMLInputElement ; setAvatar(target.files)}}
      />
      <Box mt={2.8} mr={4}>
        <label htmlFor="raised-button-file">
          <CardMedia
            component="img"
            alt="Human"
            height="270"
            className={classes.imagePlaceHolder}
            image={
              card.image_url
                ? card.image_url
                : "https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png"
            }
            title="Contemplative Reptile"
          />
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.upload_button}
          >
            Upload
          </Button>
        </label>
      </Box>
    </Grid>
  );
}
