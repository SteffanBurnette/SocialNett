import {Flex, Progress, Anchor, Col, Row} from 'antd';
import { PieChart, Pie } from 'recharts';
import {useEffect, useState, useRef} from "react"
import backgroundImage from "C:\\Users\\Burne\\Pictures\\your goal manager.png"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from 'lottie-react'
import animationData from "/src/animations/detectiveWalking.json"
import chatGPTData from "/src/animations/chatgpticon.json"
import diamondData from '/src/animations/cubetodiamond.json'
import trashData from '/src/animations/trashcan.json'
import communityData from '/src/animations/guyUpdate.json'
import completeData from '/src/animations/completed.json'
import uncompleteData from '/src/animations/inProgress.json'
import updateData from '/src/animations/updatearrow.json'
import circleData from '/src/animations/circlebeige.json'

export default function MainPage(){

   



    return(
        <div>
     
        
          <div
            id="part-1"
            style={{
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`, // Use the imported image
                marginTop: '8vh',
                backgroundSize: '100% 100%', // Set the background size to 100% width and 100% height
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              }}
          >
         
          </div>
          <div
  id="part-2"
  style={{
    height: '50vh',
    background: 'rgba(0,255,0,0.02)',
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  }}
>
<ul style={{
    listStyle: 'none',
    padding: 0,
    margin: 0,
    height: '100%',
    overflowY: 'auto', // Add this to make the content scrollable
    width: '50%', // Adjust the width as needed
    backgroundColor:'black',
    color:'beige',
    opacity: 20,
  }}>
    
    <h1 style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Add this to center the elements horizontally
  margin: 0, // Remove the default margin of the h1 element
  padding: 0, // Remove the default padding of the h1 element
  gap: 0// Add a small gap between the text and the Lottie animation
}}>
  The Advisor
  <Lottie animationData={animationData} style={{
    width: 50,
    height: 50,
    marginLeft: 10 // Add a small margin to the left of the Lottie animation
  }} />
</h1 >

<p style={{ display: 'flex', alignItems: 'center' }}>
  <Lottie animationData={chatGPTData} style={{
    width: 50,
    height: 50,
    marginRight: 10 // Add a small margin to the right of the Lottie animation
  }} />
  The advisor section is an AI assistant. You are able to ask it any ethical questions and it 
  will provide you a sufficient answer. In the AI advisor you are able to:
</p>
    <li style={{ display: 'flex', alignItems: 'center' }}> <Lottie animationData={diamondData} style={{
    width: 40,
    height: 40,
    marginRight: 0 // Add a small margin to the right of the Lottie animation
  }} /> Send a prompt via the  text box.</li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
  <Lottie animationData={diamondData} style={{width: 40,height: 40,marginRight: 0}}/>  Click on an individual prompt to view  its solution in the left panel.</li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
    <Lottie animationData={diamondData} style={{width: 40, height: 40,marginRight: 0}}/>  Delete a specific prompt/response by clicking on the respective trashcan icon on the 
      top right corner of the  response card: <Lottie animationData={trashData} style={{width: 40, height: 40,marginRight: 0}}/></li> 
    <p>It is important to understand that you should always fact check the advisor
      if your asking for crucial information.This can be done through Google or other reliable sources
    </p>
   
  </ul>
  <ul style={{
    listStyle: 'none',
    padding: 0,
    margin: 0,
    height: '100%',
    overflowY: 'auto', // Add this to make the content scrollable
    width: '50%', 
    backgroundColor:'black',
    color:'beige',
    opacity: 20,
  }} 
  >
    <h1 style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Add this to center the elements horizontally
  margin: 0, // Remove the default margin of the h1 element
  padding: 0, // Remove the default padding of the h1 element
  gap: 0// Add a small gap between the text and the Lottie animation
}}>Your Goals
 <Lottie animationData={communityData} style={{
    width: 50,
    height: 50,
    marginLeft: 10 // Add a small margin to the left of the Lottie animation
  }} />
</h1>
<p>In the goals section of the applictaion, you will be able to create, keep track of
  and augment your goals. The method to do so was made efficient and easy to use so that 
  the user can efficently manage tasks without much hassel.
</p>
    <li style={{ display: 'flex', alignItems: 'center' }}>
    <Lottie animationData={diamondData} style={{width: 60,height: 60,marginRight: 0}}/>
       You will be able to create a goal by clicking the creat goal button located on the bottom.
      Newly created goals will have their completion status set to uncompleted upon creation.
    </li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
    <Lottie animationData={circleData} style={{width: 40, height: 40,marginRight: 0}}/>
       A completed goal has the icon: <Lottie animationData={completeData} style={{width: 40,height: 40,marginRight: 0}}/> </li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
    <Lottie animationData={circleData} style={{width: 40, height: 40,marginRight: 0}}/>
       A uncompleted goal has the icon: <Lottie animationData={uncompleteData} style={{width: 40,height: 40,marginRight: 0}}/></li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
    <Lottie animationData={circleData} style={{width: 40, height: 40,marginRight: 0}}/>
      To update a goal click the arrow icon: <Lottie animationData={updateData} style={{width: 40,height: 40,marginRight: 0}}/>
    </li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
    <Lottie animationData={circleData} style={{width: 40, height: 40,marginRight: 0}}/>
      To delete a goal click the trash icon: <Lottie animationData={trashData} style={{width: 40, height: 40,marginRight: 0}}/>
    </li>

  </ul>
</div>
          
       
      

      
    </div>
    )
}

/**
 * 
 *   <PieChart width={730} height={250}>
  <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={50}
    fill="#8884d8"
    label={(entry) => entry.name}
  />
</PieChart>
 */

/**
 *     <div
  id="part-2"
  style={{
    height: '100vh',
    background: 'rgba(0,255,0,0.02)',
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  }}
>
  <Grid container direction="row" justifyContent="space-between">
    <Grid item>
      <Paper
        sx={{
          height: 140,
          width: 'calc(50% - 8px)', // Adjust the width of the paper to take up half of the available space
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      />
    </Grid>
    <Grid item>
      <Paper
        sx={{
          height: 140,
          width: 'calc(50% - 8px)', // Adjust the width of the paper to take up half of the available space
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      />
    </Grid>
  </Grid>
</div>
 */