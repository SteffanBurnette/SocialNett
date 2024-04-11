import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./mychat.css"
import MyLoadingScreen from "./MyLoadingScreen.jsx"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import "./loading.css"
import Lottie from "lottie-react"
import animationData from "/src/animations/playbutton.json"
import { GiAbstract066 } from "react-icons/gi";
import trashData from "/src/animations/trashcan.json"
import { TbTrashX } from "react-icons/tb";


export default function MyChat() { 
    //Used to store the information from the advice table
    const [advises, setAdvises] = useState([]);
    const [prompt, setPrompt] = useState("");
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
        const selectedAdvice = advises.find(advise => advise.id === adviseId);
        setSelectedAdvise(selectedAdvice);
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
  <button key={advise.id}
    style={{ 
      marginLeft: '3px', 
      backgroundColor: "beige",
      padding: '0', 
      border: 'none', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '30',  // Adjust as needed
      height: '30px'  // Adjust as needed
    }} 
    onClick={(event) => handleDelete(advise.id, event)}
  >
     <TbTrashX
    style={{
      color: "black",
      fontSize: "30px"
    }}/>
  </button>
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
                {selectedAdvise.prompt}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {selectedAdvise.response}
              </p>
            </div>
          ) : (
            advises.map((advise, index) => (
              <div className="mt-6 border-t border-gray-100" key={index}>
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  {advise.prompt}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {advise.response}
                </p>
              </div>
            ))
          )}
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