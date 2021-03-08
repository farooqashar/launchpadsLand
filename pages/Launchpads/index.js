import Link from 'next/link';
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: "#0000FF",
  },
});

const AllLaunchpads = ( { allData } ) =>  {

const classes = useStyles();

const handleClick = (e) => {
   e.preventDefault();
   return;
}

  return (
    <>

      <Head>
        <title>Launchpads Land</title>
      </Head>
  
      <center>
      <Breadcrumbs aria-label="breadcrumb">

        <Link color="inherit" href="/" onClick={handleClick}>
          Main Page
        </Link>
        <Link color="inherit" href="/Launchpads" onClick={handleClick}>
          All Launchpads
        </Link>

      </Breadcrumbs>


      <Card variant="outlined">

        <CardContent>
          
          <Typography variant="h1" component="h2" gutterBottom>
              <center className={classes.root} >Launchpads Land</center>        
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
              <center className={classes.root}>Click on a Launchpad below!</center>        
          </Typography>

        </CardContent>

      </Card>

      <br></br>

      {allData.map((value) => (
      
        <Card>
          <Link href={{pathname: `/Launchpads/${value.id}`}}>
                <Typography variant="h5" component="h5" gutterBottom>
                {value.full_name}
                </Typography>
          </Link>

        </Card>

        ))
        }
        </center>
        
      </>
    )
  }

 export const getStaticProps = async () => {
  const response_data = await axios.get("https://api.spacexdata.com/v4/launchpads");
  return { props: { allData: response_data.data } };
};
  
export default AllLaunchpads;