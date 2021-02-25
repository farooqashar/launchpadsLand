import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import OrganizationSelected from './organizationSelected';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import styles from './app.module.css';


export default function OrganizationMain() {

  const [allData, setAllData] = useState([]);
  const [orgURL, setOrgURL] = useState("https://api.spacexdata.com/v4/launchpads");
  const [selectedData, setSelectedData] = useState([]);
  const [orgSelected, setOrgSelected] = useState(null);

  const orgAxios = async () => {
    const response = await axios.get(orgURL);
    console.log(response.data);
    setAllData(response.data);
  };

  useEffect(() => {
    orgAxios();
  }, [orgURL]);

  function onclick(value){
      setSelectedData(value);
      setOrgSelected(value.full_name);
  }

    if (selectedData.length != 0) {
        return (
            <Link target="_blank" href="/organizationSelected">
              <OrganizationSelected selectedData = {selectedData} orgSelected = {orgSelected}></OrganizationSelected>
            </Link>
        )
    }

  return (

    <div>
      <Head>
        <title>Launchpads Land</title>
      </Head>

      <main>

          <div>

          <Card variant="outlined">

          <CardActionArea>
            <CardContent>
              <Typography className = {styles.cardLarge} variant="h1" component="h2" color="primary" gutterBottom>
                  <center>Welcome to Launchpads Land</center>        
              </Typography>

              <Typography className = {styles.cardMain} variant="h4" component="h2" color="primary" gutterBottom>
                  <center>This is a simple interface for finding some information about SpaceX Launchpads!</center>        
              </Typography>

              <Typography className = {styles.cardLight} variant="h6" component="h2" color="primary" gutterBottom>
                  <center>To get started, click on a Launchpad below!</center>        
              </Typography>

            </CardContent>
          </CardActionArea>

          <CardActions style={{justifyContent: 'center'}}>

            <Link href="/">
              <Button color = "primary">Back to Home</Button>
            </Link>

          </CardActions>

      </Card>

        <p></p>

        <center>
          
        {allData.map((value,index) => (
            <Card 
            onClick = {() => onclick(value)}
            >
              <Typography className = {styles.numbers} variant="h5" component="h5" color="primary" gutterBottom>
              {value.full_name}
              </Typography>
 
            </Card>
        ))
        }
        </center>

      </div>
        
      </main>

    </div>
  )

}