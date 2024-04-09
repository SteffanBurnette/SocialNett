import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'; //Used to add textfields to the modal


const style = { //The styling of the modal
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyModal() {
    //Used to handle the modal opening and closing
  const [open, setOpen] = useState(false);
  //Two functions that opens and closes the form
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Used to collect the inputted values of the modal
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(){
    console.log(name + " " + email + " "+ password)
    alert("Information Submitted!");
    handleClose();
    //Clears the input fields after the user submits their information
    setName('');
    setEmail('');
    setPassword('');
  }


  return (
    <div>
      <Button onClick={handleOpen}>Sign Up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please enter your credentials for sign up:
          </Typography>
          
          <TextField
    label="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    fullWidth
    margin="normal"
  />

  <TextField
    label="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    fullWidth
    margin="normal"
  />
  <TextField
    label="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    fullWidth
    margin="normal"
  />
  {/* Submit Button */}
  <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, mr: 1 }}
        >
          Submit
        </Button>

        {/* Close Button */}
        <Button
          variant="contained"
          color = "primary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Close
        </Button>
        </Box>
        
      </Modal>
    </div>
  );
}