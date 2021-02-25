import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import CollegeSelected from './collegeSelected';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import styles from './app.module.css';


export default function collegeMain() {

  const [allData, setAllData] = useState({});
  const [data, setData] = useState([]);
  const [collegeURL, setCollegeURL] = useState("http://universities.hipolabs.com/search?country=United%20States");
  const [selectedData, setSelectedData] = useState([]);
  const [collegeSelected, setCollegeSelected] = useState(null);


  
  const collegeAxios = async () => {
    const response = await axios.get(collegeURL);

    // parseData(response.data);
    setAllData(response.data);

    const allValues = [];
    var i;
    for (i = 0; i < response.data.length; i++) { 
      allValues.push(response.data[i]);
    }
    setData(allValues);
  };

  useEffect(() => {
    collegeAxios();
  }, [collegeURL]);

  function onclick(value){
      setSelectedData(value);
      setCollegeSelected(value.name);
  }

    if (selectedData.length != 0) {
        return (
            <Link target="_blank" href="/collegeSelected">
              <CollegeSelected selectedData = {selectedData} collegeSelected = {collegeSelected}></CollegeSelected>
            </Link>
        )
    }

  return (

    <div>
      <Head>
        <title>College Land</title>
      </Head>

      <main>

          <div>

          <Card variant="outlined">

          <CardActionArea>
            <CardContent>
              <Typography className = {styles.cardLarge} variant="h1" component="h2" color="primary" gutterBottom>
                  <center>Welcome to College Land</center>        
              </Typography>

              <Typography className = {styles.cardMain} variant="h4" component="h2" color="primary" gutterBottom>
                  <center>This is a simple interface for finding links to random colleges!</center>        
              </Typography>

              <Typography className = {styles.cardLight} variant="h6" component="h2" color="primary" gutterBottom>
                  <center>To get started, click on some colleges below!</center>        
              </Typography>

            </CardContent>
          </CardActionArea>

          <CardActions style={{justifyContent: 'center'}}>

            <Link href="/">
              <Button color = "primary">Back to Home</Button>
            </Link>

            <Button onClick = {() => onclick(data[Math.floor(Math.random() * data.length) + 1])} color = "primary">I am Feeling Lucky!</Button>


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