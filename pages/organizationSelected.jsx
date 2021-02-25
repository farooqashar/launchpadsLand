import Link from 'next/link';
import Head from 'next/head';
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from './app.module.css';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function OrganizationSelected(props) {
    
  const details = props.selectedData;
  const name = props.name;
  const locality = props.locality;
  const longitude = props.longitude;
  const time = props.time;
  const status = props.status;
  const id = props.id;

  const [expanded, setExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);

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
        <div>
            <Head>
                <title>Selected LaunchPad Info!</title>
            </Head>

            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Typography className = {styles.cardLarge} variant="h3" component="h2" color="blue" gutterBottom>
                      <center>Information! Information! Information!</center>        
                  </Typography>

                  <Typography className = {styles.cardMain} variant="h5" component="h2" color="blue" gutterBottom>
                      <center>You will find info about <i>{props.orgSelected}</i> below!</center>        
                  </Typography>

              </CardContent>
            </CardActionArea>

          <CardActions style={{justifyContent: 'center'}}>

            <Link href="/">
              <Button color = "primary">Back to Home</Button>
            </Link>

          </CardActions>
          </Card>

            <Card >

              <CardHeader
                className = {styles.cardLight}

                avatar={
                  <Avatar aria-label="Name" >
                    LL
                  </Avatar>
                }

                action={
                  <Link href="/">
                  <IconButton aria-label="Name">
                    <MoreVertIcon />
                  </IconButton>
                  </Link>
                }
                title= {name}
                subheader = {props.orgSelected}
              />

              <CardMedia
              title = {name}
              />

              <CardContent>
              <Typography className = {styles.cardLight} variant="body2" color="textSecondary" component="p">
                {details}
              </Typography>
              </CardContent>

              <CardActions disableSpacing>

              <IconButton aria-label="Favorites" onClick = {() => handleFavorites(name)}>
                <FavoriteIcon />
              </IconButton>

              <Snackbar open={open} autoHideDuration={1500} onClose={handleFavoritesClose}>
                <MuiAlert elevation={6} variant="filled">
                    {name} has been added to Favorites!
                </MuiAlert>
              </Snackbar>

              <Link href="https://www.spacex.com/">
                <IconButton aria-label="Share">
                  <ShareIcon />
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
                  Locality: {locality}
                </Typography>

                <Typography paragraph>
                  Longitude : {longitude}
                </Typography>

                <Typography paragraph>
                  Time Zone : {time}
                </Typography>

                <Typography paragraph>
                  Status : {status}
                </Typography>

                <Typography paragraph>
                  ID : {id}
                </Typography> 

              </CardContent>
              </Collapse>
        
        </Card>
        </div>
      )
  }