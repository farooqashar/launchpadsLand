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

const SpecificLaunchPad = () =>  {

  const [allData, setAllData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);

  const router = useRouter()

  const DataAxios = async () => {
    const { launchpad } = router.query
    const orgURL = `https://api.spacexdata.com/v4/launchpads/${launchpad}`
    console.log(orgURL)
    const response = await axios.get(orgURL);
    setAllData(response.data);
  };

    useEffect(() => {
      DataAxios();
    }, []);

    function handleClick(e) {
        e.preventDefault();
      }

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const handleFavorites = (user) => {
      const newFavorites = [...favorites];
      newFavorites.push(user);
      setFavorites(newFavorites);
      setOpen(true);
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

        
        <b><center><h1>Information</h1></center></b>        
      
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

        <IconButton aria-label="Favorites" onClick = {() => handleFavorites(allData.name)}>
          <FavoriteIcon />
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

    export default SpecificLaunchPad;