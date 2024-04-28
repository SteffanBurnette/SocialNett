import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./mychat.css"
import MyLoadingScreen from "./MyLoadingScreen.jsx"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import Lottie from "lottie-react"
import animationData from "/src/animations/playbutton.json"
import { GiAbstract066 } from "react-icons/gi";
import trashData from "/src/animations/trashcan.json"
import { TbTrashX } from "react-icons/tb";

//isCompleted
//isCompleted

export default function MyChat() { 
    //Used to store the information from the advice table
    const [advises, setAdvises] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //Controls the loading screen
    const [inputValue, setInputValue] = useState(''); //Holds the input value
    const [selectedAdvise, setSelectedAdvise] = useState(null); // State for selected advice


    const fetchData = async () => {
           
        try {
            setIsLoading(true); // Start loading
            const response = await axios.get('http://localhost:5000/getadvise');
            setAdvises(response.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
            
        }
        setIsLoading(false); // Stop loading regardless of success or error
    };
    
    useEffect(() => {
        // Define an async function inside useEffect
        const fetchData = async () => {
           
            try {
                setIsLoading(true); // Start loading
                const response = await axios.get('http://localhost:5000/getadvise');
                setAdvises(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
                
            }
            setIsLoading(false); // Stop loading regardless of success or error
            
        };

        // Call the async function
        fetchData();
    }, []);

    //Controls the users input//////////////////////////////////////////////////////
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    //Controls the sent input value
    const handleSend = async () => {
        if (!inputValue.trim()) return; // Check if the input is not just empty spaces
    
        try {
            setIsLoading(true); // Start loading
            const response = await axios.post('http://localhost:5000/createadvice', { "prompt": inputValue });
            // Handle response or update UI as needed
            console.log(response.data);
             // Update advises state with the new item
            fetchData(); //Triggers the rerender
            setInputValue(''); // Clear the input field after sending
            setIsLoading(false); // Stop loading regardless of success or error
            setSelectedAdvise(null) //Rerenders everything if selected advice was choose
        } catch (error) {
            // Handle error
            console.error('Error sending message:', error);
        }
        
        setInputValue(''); // Clear the input field after sending
        setIsLoading(false); // Stop loading regardless of success or error
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    // Function to handle clicking on a menu item
const handleMenuItemClick = (adviseId) => {
  if (selectedAdvise && selectedAdvise.id === adviseId) {
      // If the selected advice is already selected, set it to null
      setSelectedAdvise(null);
  } else {
      // Find the advice by ID and set it as the selected advice
      const selectedAdvice = advises.find(advise => advise.id === adviseId);
      setSelectedAdvise(selectedAdvice);
  }
};


    if (isLoading) {
        return <MyLoadingScreen />;
    }
  

    //Handles the delete logic
    const handleDelete = async (id, event) => {
        event.stopPropagation();
        console.log("Delete Clicked for ID:", id);  // To check if it receives the correct ID
        try {
            setIsLoading(true); 
            const response = await axios.delete(`http://localhost:5000/deleteadvice/${id}`);
            console.log(response.data.message);
            
        } catch (error) {
            console.error("Error deleting advice:", error);
        } finally {
            fetchData();
            setIsLoading(false);
            setSelectedAdvise(null)
        }
    };
    


    return (
        <>
          {isLoading ? (
            <div className="loading-screen"><MyLoadingScreen/></div>
          ) : (
            <div className="main-container"> {/* Flex parent container */}
              <Sidebar className="sidebar">
                <Menu className="menu">
                  {advises.map((advise, index) => (
                    <MenuItem className="menu-item" key={advise.id} onClick={() => handleMenuItemClick(advise.id)}>
                     <div style={{ display: 'flex', alignItems: 'center' }}>
  
  <span style={{ marginLeft: '5px' }}>{advise.prompt}</span>
</div>

                    </MenuItem>
                  ))}
                </Menu>
              </Sidebar>
      
              <div className="chat-container"> {/* Chat and input area */}
                <div className="px-4 sm:px-0 chat-area">
                
                {selectedAdvise ? (
            <div className="mt-6 border-t border-gray-100">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
              <div style={{
  display: 'flex', // Enables flexbox
  alignItems: 'center', // Align items vertically in the center
  justifyContent: 'space-between' // Space between the text and the button
}}>
  <span style={{
    marginRight: '10px' // Adds some space between the text and the button
  }}>
    {selectedAdvise.prompt}
  </span>
  <button
    key={selectedAdvise.id}
    style={{ 
      backgroundColor: "beige",
      padding: '0',
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px', // Ensure you include units (px)
      height: '40px' // Ensure you include units (px)
    }} 
    onClick={(event) => handleDelete(selectedAdvise.id, event)}
  >
      <Lottie animationData={trashData} style={{ fontSize: '50px' }} /> {/* Adjust the fontSize to fit your button */}

  </button>
</div>
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {selectedAdvise.response}
              </p>
            </div>
          ) : (
            advises.map((advise, index) => (
              <div className="mt-6 border-t border-gray-100" key={index}>
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                <div style={{
  display: 'flex', // Enables flexbox
  alignItems: 'center', // Align items vertically in the center
  justifyContent: 'space-between' // Space between the text and the button
}}>
  <span style={{
    marginRight: '10px' // Adds some space between the text and the button
  }}>
    {advise.prompt}
  </span>
  <button
    key={advise.id}
    style={{ 
      backgroundColor: "beige",
      padding: '0',
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30px', // Ensure you include units (px)
      height: '30px' // Ensure you include units (px)
    }} 
    onClick={(event) => handleDelete(advise.id, event)}
  >
      <Lottie animationData={trashData} style={{ fontSize: '40px' }} /> {/* Adjust the fontSize to fit your button */}

  </button>
</div>

                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {advise.response} 
                </p>
              </div>
            ))
          )}
          <h3 className="text-base font-semibold leading-7 text-gray-900">Meet your new AI advisor! This bot is designed to assist you in
                     navigating through your decision-making process. It strives to offer 
                     the most accurate and useful advice possible, but it's 
                     always wise to verify the information and conduct your own
                      research to ensure you make the most informed decisions.
                  </h3>
                </div>
                <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Type your message here..." 
                    style={{ flex: '1' }} // This ensures the input field takes up the majority of the space
                    onChange ={handleInputChange}
                  />
                  <button 
  style={{ 
    marginLeft: '0px', 
    backgroundColor: 'beige', 
    padding: '0', 
    border: 'none', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '40px',  // Adjust as needed
    height: '40px'  // Adjust as needed
  }} 
  onClick={handleSend}
>
  <Lottie animationData={animationData} style={{ fontSize: '40px' }} /> {/* Adjust the fontSize to fit your button */}
</button>


                </div>
              </div>
            </div>
          )}
        </>
      );
      
      
}

/** 
<div
  style={{
    backgroundColor: #e8e2a1,
  }}
>
  <div
  style={{
    backgroundColor: #e8e2a1,
  }}
>
  <TbTrashX
    style={{
      color: #ffffff,
    }}
  />
</div>
  />
</div>
**/