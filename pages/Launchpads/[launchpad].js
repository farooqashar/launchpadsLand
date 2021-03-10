import { useRouter } from 'next/router'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from 'next/link';
import Head from 'next/head';
import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LinkIcon from '@material-ui/icons/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const useStyles = makeStyles({
  root: {
    color: "#0000FF",
  },
});

const SpecificLaunchPad = ( {allData} ) =>  {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [open, setOpen] = useState(false);

    const handleClick = (e) => {
      e.preventDefault();
      return;
   }

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const handleFavorites = (favorites) => {
      (favorites? setOpen(false) : setOpen(true))
      setFavorites(!favorites);

    };
  
    const handleFavoritesClose = (reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
  return (
      <>

      <Head>
          <title>Selected LaunchPad Information</title>
      </Head>

      <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Main Page
          </Link>
          <Link color="inherit" href="/Launchpads" onClick={handleClick}>
            All Launchpads
          </Link>
          <Link color="inherit" href={{pathname: `/Launchpads/${allData.id}`}} onClick={handleClick}>
            Specific Launchpad
          </Link>
        </Breadcrumbs>

        
      <b><center><h1 className={classes.root}>Information</h1></center></b>        

      <Card >

        <CardHeader
          avatar={
            <Avatar aria-label="Name" >
              LL
            </Avatar>
          }
          title= {allData.name}
          subheader = {allData.full_name}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {allData.details}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>

        <IconButton aria-label="Favorites" onClick = {() => handleFavorites(favorites)}>
          {(favorites? <FavoriteIcon/> : <FavoriteBorderOutlinedIcon /> )}

        </IconButton>

        <Snackbar open={open} autoHideDuration={1500} onClose={handleFavoritesClose}>
          <MuiAlert elevation={6} variant="filled">
              {allData.name} has been added to Favorites!
          </MuiAlert>
        </Snackbar>

        <Link href="https://www.spacex.com/">
          <IconButton aria-label="Link">
            <LinkIcon />
          </IconButton>
        </Link>

        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="More"
        >
          <ExpandMoreIcon />
        </IconButton>

        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>

        <CardContent>
          
          <Typography paragraph>
            Locality: {allData.locality}
          </Typography>

          <Typography paragraph>
            Longitude : {allData.longitude}
          </Typography>

          <Typography paragraph>
            Time Zone : {allData.timezone}
          </Typography>

          <Typography paragraph>
            Status : {allData.status}
          </Typography>

          <Typography paragraph>
            ID : {allData.id}
          </Typography> 

        </CardContent>
        </Collapse>

      </Card>

        </>
      )
    };


export const getStaticProps = async (context) => {

  const response_data = await axios.get(`https://api.spacexdata.com/v4/launchpads/${context.params.launchpad}`);

  return { props: { allData: response_data.data } };

};

export async function getStaticPaths() {

  return {
    paths:  [ 
      {params: { launchpad: "5e9e4501f5090910d4566f83"} },
      {params: { launchpad: "5e9e4501f509094ba4566f84"} },
      {params: { launchpad: "5e9e4502f5090927f8566f85"} },
      {params: { launchpad: "5e9e4502f5090995de566f86"} },
      {params: { launchpad: "5e9e4502f509092b78566f87"} },
      {params: { launchpad: "5e9e4502f509094188566f88"} }],
    fallback: false,
  }
}


    export default SpecificLaunchPad;