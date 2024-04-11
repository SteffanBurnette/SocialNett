// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./sidebar.css"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import MyLoadingScreen from "./MyLoadingScreen.jsx"
import "./loading.css"


const MySidebar = () => {
    const [advises, setAdvises] = useState([]);
    const [propt, setPrompt] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //Controls the loading screen

    useEffect(() => {
        setIsLoading(true); // Start loading
        axios.get('http://localhost:5000/getadvise') 
            .then(response => {
                setAdvises(response.data);
            })
            .catch(error => {
                setError(error.response ? error.response.data.message : error.message);
            }).finally(()=>{setIsLoading(false)});// Stop loading
                
    }, []);

   

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!advises.length) {
        return <div>No advises found</div>;
    }

    return (
        <Sidebar className="sidebar">
            {isLoading ? ( <div className = "loading-screen"><MyLoadingScreen/> </div> // This can be a spinner or any loading component
        ) : (
    <Menu className="menu">
        {advises.map((advise, index) => (
            <MenuItem className="menu-item" key={advise.id}>
                {advise.prompt} 
            </MenuItem>
        ))}
    </Menu>
    )}
</Sidebar>

    );
    
};

export default MySidebar;


/**
 * import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

<Sidebar>
  <Menu>
    <SubMenu label="Charts">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</Sidebar>;
 */

/**
 *   return (
        <div className="sidebar">
            <h2>Advises</h2>
            <ul>
                {advises.map((advise, index) => (
                    <li key={index}>{advise.prompt} - {advise.response}</li>
                ))}
            </ul>
        </div>
    );
 */

    /**
     *      <Sidebar className="sidebar">
    <Menu className="menu">
        {advises.map((advise, index) => (
            <MenuItem className="menu-item" key={index}>
                {advise.prompt} - {advise.response}
            </MenuItem>
        ))}
    </Menu>
</Sidebar>
     */