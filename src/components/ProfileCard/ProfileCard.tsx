import React from 'react'
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { dublicateCard } from '../utils/types';

const useStyles = makeStyles(() => ({
    card_box: {
      display: "inline-block",
    },
    card: {
      maxWidth: 350,
      height: 460
    },
    delete_option: { color: "red" },
    under_img: { display: "flex", justifyContent: "space-between" },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    textDescription: {
      overflowWrap: 'anywhere'
    }
  }));

  type Props = {
    elem: dublicateCard, 
    handleOpenModal:()=>void, 
    setItemMenu:(elem_id:string)=>void, 
    itemMenu:string,
    setAnchorEl:(elem:Element|null)=>void,
    anchorEl:Element|null, 
  }
function ProfileCard(props:Props) {
  const { elem, handleOpenModal, setItemMenu, itemMenu,setAnchorEl,anchorEl } = props;

    const handleClick = (event:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
      setAnchorEl(event.currentTarget);
      setItemMenu(event.currentTarget.id);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setItemMenu("");
    };

    const classes = useStyles();
    return (
        <Box className={classes.card_box} m={4} width="260px">
        <Card className={classes.card}>
          <Link className={classes.link} to={`/people/${elem.id}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="270"
                image={elem.image_url}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Link>
          <CardContent>
            <Box className={classes.under_img}>
              <Typography gutterBottom variant="h5" component="h2">
                {elem.name}
              </Typography>
              <CardActions>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  ...
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link
                      className={classes.link}
                      to={`/people/${itemMenu}`}
                    >
                      Edit Profile
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleOpenModal}
                    className={classes.delete_option}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </CardActions>
            </Box>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.textDescription}>
              {elem.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
}


export default ProfileCard;