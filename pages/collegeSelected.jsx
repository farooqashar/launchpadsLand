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


export default function CollegeSelected(props) {
    
    {(props.selectedData ? props.selectedData : {country:"null",alpha_two_code:"US"})}

    return (
        <div>
            <Head>
                <title>Selected College Info!</title>
            </Head>

            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Typography className = {styles.cardLarge} variant="h3" component="h2" color="blue" gutterBottom>
                      <center>Information! Information! Information!</center>        
                  </Typography>

                  <Typography className = {styles.cardMain} variant="h5" component="h2" color="blue" gutterBottom>
                      <center>You will find info about <i>{props.collegeSelected}</i> below!</center>        
                  </Typography>

              </CardContent>
            </CardActionArea>

          <CardActions style={{justifyContent: 'center'}}>

            <Link href="/">
              <Button color = "primary">Back to Home</Button>
            </Link>

          </CardActions>

      </Card>

            <Card variant="outlined">
              <CardContent>

              <Typography className = {styles.facts} variant="h5" component="h2" color="primary" gutterBottom>
                    {/* {(props.selectedData ? props.selectedData : {country:"null",alpha_two_code:"US"})} */}
                    {/* <center><b>Country:</b> {props.selectedData.country} [{props.selectedData.alpha_two_code}]</center>    */}
                    <center>
                      <Link href={props.selectedData.web_pages[0]}>
                        <Button color = "primary"><b>Go to {props.selectedData.name}'s Website</b></Button>
                      </Link>     
                    </center>

              </Typography>
              

              </CardContent>

            </Card>

        </div>
      )
  }