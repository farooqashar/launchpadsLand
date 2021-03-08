import Link from 'next/link';
import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const App = () =>  {

  return (

    <>

          <Typography variant="h1" component="h2" color="blue" gutterBottom>
                <center>Welcome to Launchpads Land</center>        
            </Typography>

          <Typography variant="h4" component="h2" color="blue" gutterBottom>
                <center>This is a simple interface for finding basic information about SpaceX Launchpads!</center>        
          </Typography>

          <Link href={{ pathname: '/Launchpads'}}>
              <center><Button variant="contained" color="primary">Click Here To Get Started</Button></center>
          </Link>

    </>
  )
}

export default App;        