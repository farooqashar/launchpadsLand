import Head from 'next/head';
import Link from 'next/link';
import React from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function App() {

  return (
    
    <div>

      <Head>
        <title>Launchpads Land</title>
      </Head>

      <main>
      
            <Typography variant="h1" component="h2" color="blue" gutterBottom>
                <center>Welcome to Launchpads Land</center>        
            </Typography>

            <Typography variant="h4" component="h2" color="blue" gutterBottom>
                <center>This is a simple interface for finding basic information about SpaceX Launchpads!</center>        
            </Typography>

          <Link href={{ pathname: '/organizationMain'}}>
              <center><Button variant="contained" color="primary">Click Here To Get Started</Button></center>
          </Link>

          <Link href="/Launchpads/[launchpad]">
              <center><Button variant="contained" color="primary">Launchpad</Button></center>
          </Link>
      </main>

    </div>
  )

}
