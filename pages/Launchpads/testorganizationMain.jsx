import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import OrganizationSelected from './organizationSelected';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


export default function OrganizationMain() {

  const [allData, setAllData] = useState([]);
  const [orgURL, setOrgURL] = useState("https://api.spacexdata.com/v4/launchpads");
  const [details, setDetails] = useState([]);
  const [name,setName] = useState();
  const [locality,setLocality] = useState();
  const [longitude,setLongitude] = useState();
  const [time,setTime] = useState();
  const [status,setStatus] = useState();
  const [id,setID] = useState();
  const [orgSelected, setOrgSelected] = useState(null);

  const orgAxios = async () => {
    const response = await axios.get(orgURL);
    setAllData(response.data);
  };

  useEffect(() => {
    orgAxios();
  }, [orgURL]);

  function onclick(value){
      const { details, name, locality, longitude, timezone, status, id, full_name } = value
      setDetails(details);
      setName(name);
      setLocality(locality);
      setLongitude(longitude);
      setTime(timezone);
      setStatus(status);
      setID(id);
      setOrgSelected(full_name);
  }

    if (details.length != 0) {
        return (
            <Link target="_blank" href="/organizationSelected">
              <OrganizationSelected longitude = {longitude} id = {id} status = {status}  time = {time} locality = {locality} name = {name} selectedData = {details} orgSelected = {orgSelected}></OrganizationSelected>
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

            <CardContent>
              <Typography variant="h1" component="h2" gutterBottom>
                  <center>Welcome to Launchpads Land</center>        
              </Typography>

              <Typography  variant="h4" component="h2" gutterBottom>
                  <center>This is a simple interface for finding some information about SpaceX Launchpads!</center>        
              </Typography>

              <Typography variant="h6" component="h2" gutterBottom>
                  <center>To get started, click on a Launchpad below!</center>        
              </Typography>

            </CardContent>

          <CardActions style={{justifyContent: 'center'}}>

            <Link href="/">
              <Button>Back to Home</Button>
            </Link>

          </CardActions>

      </Card>

        <p></p>

        <center>
          
        {allData.map((value,index) => (
            <Card 
            onClick = {() => onclick(value)}
            >
              <Typography variant="h5" component="h5" gutterBottom>
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