import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import CitySelected from './citySelected';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import styles from './app.module.css';


export default function collegeMain() {

  const [allData, setAllData] = useState({});
  const [data, setData] = useState([]);
  const [cityURL, setCityURL] = useState("https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/scores/");
  const [selectedData, setSelectedData] = useState([]);
  const [citySelected, setCitySelected] = useState(null);


  
  const cityAxios = async () => {
    const response = await axios.get(cityURL);
    setAllData(response.data.categories);

    const allValues = [];
    var i;
    for (i = 0; i < response.data.categories.length; i++) { 
      allValues.push(response.data.categories[i]);
    }
    setData(allValues);
  };

  useEffect(() => {
    cityAxios();
  }, [cityURL]);

  function onclick(value){
      setSelectedData(value.score_out_of_10);
      setCitySelected(value.name);
  }

    if (selectedData.length != 0) {
        return (
            <Link target="_blank" href="/citySelected">
              <CitySelected selectedData = {selectedData} citySelected = {citySelected}></CitySelected>
            </Link>
        )
    }

  return (

    <div>
      <Head>
        <title>City Land</title>
      </Head>

      <main>

          <div>

          <Card variant="outlined">

          <CardActionArea>
            <CardContent>
              <Typography className = {styles.cardLarge} variant="h1" component="h2" color="primary" gutterBottom>
                  <center>Welcome to City Land</center>        
              </Typography>

              <Typography className = {styles.cardMain} variant="h4" component="h2" color="primary" gutterBottom>
                  <center>This is a simple interface for finding some information about San Francisco!</center>        
              </Typography>

              <Typography className = {styles.cardLight} variant="h6" component="h2" color="primary" gutterBottom>
                  <center>To get started, click on a category below!</center>        
              </Typography>

            </CardContent>
          </CardActionArea>

          <CardActions style={{justifyContent: 'center'}}>

            <Link href="/">
              <Button color = "primary">Back to Home</Button>
            </Link>

            {/* <Button onClick = {() => onclick(data[Math.floor(Math.random() * data.length) + 1])} color = "primary">I am Feeling Lucky!</Button> */}

          </CardActions>

      </Card>

        <p></p>

        <center>
          
        {data.map((value,index) => (
            <Card 
            onClick = {() => onclick(value)}
            >
              <Typography className = {styles.numbers} variant="h5" component="h5" color="primary" gutterBottom>
              {value.name}
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