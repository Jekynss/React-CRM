import React,{useState,useEffect} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { Link, useHistory } from "react-router-dom";
import { addCard } from "../redux/actions/CardsAction";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import {createBrowserHistory} from 'history'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  input_texts: {
    width: "300px",
  },
  main_form: {
    width: "50%",
    textAlign: "center",
    margin: "50px auto",
  },
  about_text: {
    width: "100%",
    margin: "10% auto",
  },
  upload_button: {
    width: "100%",
  },
  submit_button: {
    width: "100px",
    height: "50px",
  },
  submit_wrapper: {
    display: "flex",
    justifyItems: "end",
    alignItems: "end",
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  imagePlaceHolder: {
    width: "250px",
    height: "250px",
  },
}));

function ProfilePage(props) {
  const [card,setCard] = useState({fullName:'',description:'',phone:'',website:'',email:'',address:'',imageUrl:''});
  const [redirect, setRedirect] = useState(false);
  const { addCard } = props;
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    card.id=Math.random().toString();
    card.imageUrl=`https://robohash.org/${Math.random()}?set=any`;
    addCard(card);
    setRedirect(!redirect);
  };

  const handleChange = (e) =>{
    const name=e.target.name;
    const value=e.target.value;
    setCard({...card,[name]:value});
  }

  useEffect(()=>{
    setRedirect(false);
    const current_id=props.match.params.id;
    const card = props.state.cards.find((card)=>card.id===current_id); 
    card ? setCard(card) : setCard({fullName:'',description:'',phone:'',website:'',email:'',address:'',imageUrl:''}); 
  },[])

  return (
    <div className={classes.profile_section}>
      {redirect && <Redirect push to="/people" />}
      <form className={classes.main_form} onSubmit={handleSubmit}>
        <Grid className={classes.form_container}>
          <Grid>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <Box mt={2.8}>
              <label htmlFor="raised-button-file">
                <CardMedia
                  component="img"
                  alt="Human"
                  height="270"
                  className={classes.imagePlaceHolder}
                  image={card.imageUrl ? card.imageUrl : "https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png"}
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
          <Grid
            container
            className={classes.input_texts}
            direction="column"
            justify="space-between"
            align="center"
          >
            <TextField id="Fullname" label="Fullname" value={card.fullName} onChange={handleChange} name='fullName' required />
            <TextField id="Phone"  value={card.phone} onChange={handleChange} name='phone' label="Phone" />
            <TextField id="Email" value={card.email} onChange={handleChange} name='email' label="Email" required />
            <TextField id="WebSite" value={card.website} onChange={handleChange} name='website' label="WebSite" />
            <TextField id="Address" value={card.address} onChange={handleChange} name='address' label="Address" />
          </Grid>
        </Grid>
        <TextField
          variant="outlined"
          id="about_me"
          type="text"
          name='description'
          onChange={handleChange}
          className={classes.about_text}
          label="About me"
          value={card.description}
        />
        <Box className={classes.submit_wrapper}>
          <Link className={classes.link} to={"/people"}>
            <Box mr={4}>
              <Button
                variant="outlined"
                id="submit"
                color="primary"
                className={classes.submit_button}
              >
                Back
              </Button>
            </Box>
          </Link>
          <Button
            variant="contained"
            id="submit"
            color="primary"
            type="submit"
            className={classes.submit_button}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {
  addCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
