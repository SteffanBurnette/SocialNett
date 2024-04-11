import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'; //Used to add textfields to the modal
import "./comp.css"
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import "./signup.css"
import Lottie from "lottie-react"
import animationData from "/src/animations/alert.json"
import MyLoadingScreen from "./MyLoadingScreen.jsx"
import "./loading.css"

//Modal styling
const style = { //The styling of the modal
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #f5f5dc',
    boxShadow: 24,
    p: 4,
  };

//Error modal logic
const ErrorModal = ({ open, errorMessage, onClose }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#f5f5dc",  display: 'flex', 
      alignItems: 'center', 
      gap: '10px' // Adjust the gap as needed
     }}>
          <Lottie 
  animationData={animationData}
  style={{ width: '100px', height: '100px' }} // Example dimensions
/>{errorMessage} 
          </Typography>
       

          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              mt: 2,
              backgroundColor: '#f5f5dc', // Beige background
              color: 'black', // Black text
              '&:hover': {
                backgroundColor: '#e0e0c8' // Slightly darker beige for hover effect
              }
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    );
};




export default function MyLogin() {
    //Used to handle the modal opening and closing
  const [open, setOpen] = useState(false);
  //Two functions that opens and closes the form
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Used to collect the inputted values of the modal
  const [username, setUserName] = useState('');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  // useState for controlling the modal open state
const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false); //Controls the loading screen

// Call this function to open the modal
const showErrorModal = (message) => {
  setErrorMessage(message);
  setIsErrorModalOpen(true);
};

// Call this to close the modal
const handleCloseErrorModal = () => {
  setIsErrorModalOpen(false);
  setErrorMessage('');
};




async function handleSubmit(){
    console.log(username + " " + password)
    //alert("Information Submitted!");
   // event.preventDefault();
   setIsLoading(true); // Start loading
   try {
    const response = await axios.post('http://localhost:5000/login', { "username": username, "password" : password });
    console.log(response.data);
 
    // Handle successful response here
    handleClose();
    setUserName('');
    setPassword('');
    navigate("mainpage");
 } catch (error) {
    console.error('There was an error!', error);
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data.message || 'An error occurred on the server');
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response was received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('An error occurred while making the request');
      }
      
    setIsErrorModalOpen(true); // This line should show the modal
    // Handle successful response here
    handleClose();
    setUserName('');
    setPassword('');
    
}
setIsLoading(false); // Stop loading regardless of success or error
 
  }


  return (
    <div>
        {isLoading ? ( <div className = "loading-screen"><MyLoadingScreen/> </div> // This can be a spinner or any loading component
        ) : (<div>
      <Button onClick={handleOpen}
       sx={{ 
        border: '2px solid black',
        '&:hover': {
          border: '2px solid black',
          backgroundColor: 'black', // Background color on hover
          color: 'white', // Change text color on hover, if needed
        }
      }}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color = "white">
            Please enter your login credentials:
          </Typography>
          
          <TextField
    label="Username"
    value={username}
    onChange={(e) => setUserName(e.target.value)}
    fullWidth
    margin="normal"
    sx={{
        '& label': { color: '#f5f5dc' }, // Label color
        '& input': { color: '#f5f5dc' }, // Input text color
        '& .MuiInput-underline:before': { borderBottomColor: '#f5f5dc' }, // Underline color when not focused
        '& .MuiInput-underline:after': { borderBottomColor: '#f5f5dc' }, // Underline color when focused
        '& .MuiOutlinedInput-root': { // For outlined variant
          '& fieldset': { borderColor: '#f5f5dc' }, // Border color
          '&:hover fieldset': { borderColor: '#f5f5dc' }, // Border hover color
          '&.Mui-focused fieldset': { borderColor: '#f5f5dc' }, // Border color when focused
        },
      }}
  />

  <TextField
    label="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    fullWidth
    margin="normal"
    sx={{
        '& label': { color: '#f5f5dc' }, // Label color
        '& input': { color: '#f5f5dc' }, // Input text color
        '& .MuiInput-underline:before': { borderBottomColor: '#f5f5dc' }, // Underline color when not focused
        '& .MuiInput-underline:after': { borderBottomColor: '#f5f5dc' }, // Underline color when focused
        '& .MuiOutlinedInput-root': { // For outlined variant
          '& fieldset': { borderColor: '#f5f5dc' }, // Border color
          '&:hover fieldset': { borderColor: '#f5f5dc' }, // Border hover color
          '&.Mui-focused fieldset': { borderColor: '#f5f5dc' }, // Border color when focused
        },
      }}
  />
  {/* Submit Button */}
  <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mt: 2, 
            mr: 1,
            backgroundColor: '#f5f5dc', // Beige background
            color: 'black', // Black text
            '&:hover': {
              backgroundColor: '#e0e0c8' // Slightly darker beige for hover effect
            }
          }}
        >
          Submit
        </Button>

        {/* Close Button */}
        <Button
          variant="contained"
          color = "primary"
          onClick={handleClose}
          sx={{
            mt: 2,
            backgroundColor: '#f5f5dc', // Beige background
            color: 'black', // Black text
            '&:hover': {
              backgroundColor: '#e0e0c8' // Slightly darker beige for hover effect
            }
          }}
        >
          Close
        </Button>
        </Box>
      </Modal>
      <ErrorModal 
  open={isErrorModalOpen} 
  errorMessage={errorMessage} 
  onClose={handleCloseErrorModal} 
/>
        </div>)}</div>
  );
}