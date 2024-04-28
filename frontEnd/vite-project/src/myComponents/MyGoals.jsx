import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; // Import TextField
import Grid from '@mui/material/Grid';
import Lottie from "lottie-react"
import animationData from "/src/animations/trashcan.json"
import axios from "axios"
import MyLoadingScreen from "./MyLoadingScreen.jsx"
import updatearrowData from "/src/animations/updatearrow.json"
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import cubeData from "/src/animations/coolCube.json" //cube animation
import inProgresData from "/src/animations/inProgress.json" //In progress animation
import completedData from "/src/animations/completed.json" //completed animation



export default function MyGoals() {
  const [isLoading, setIsLoading] = useState(false); //Controls the loading screen
  const [goals, setGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const initialGoalState = { title: '', goal: '' };
  const [currentGoal, setCurrentGoal] = useState(initialGoalState);
  const [newGoal, setNewGoal] = useState({ title: '', goal: '', isCompleted: false });
  const [openNewGoalModal, setOpenNewGoalModal] = useState(false);



//Modal styling
const modalStyle = { //The styling of the modal
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

//Opens the create goal modal
const handleCreateGoal = () => {
  setNewGoal({ title: '', goal: '', isCompleted:false }); // Reset the form to be empty initially
  setOpenNewGoalModal(true); // Correct modal to open
};


  
  const handleUpdateClick = (goal) => {
    setCurrentGoal(goal);
    setOpenModal(true);
  };
  


//Gets the users goals from the database
  const fetchGoals = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.get('http://localhost:5000/getgoals'); // Adjust the URL as needed
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
      // Handle error or set a state variable to show an error message
    }
    setIsLoading(false); // Start loading
    
  };

  //get the initail goals from the database
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get('http://localhost:5000/getgoals'); // Adjust the URL as needed
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
        // Handle error or set a state variable to show an error message
      }
      setIsLoading(false); // Start loading
    };

    fetchGoals();
  }, []); // Empty dependency array to ensure this runs once on component mount

  //Closes the modal
  const handleClose = () => {
    setOpenModal(false);
    setCurrentGoal(initialGoalState); // Reset the form fields on close
  };

  //The update logic whenthe user decides to update their goals
  const handleUpdate = async (id, event) => {
    event.preventDefault();
    console.log("Updating goal with id ", id);
    try {
      setIsLoading(true);
      const response = await axios.put(`http://localhost:5000/updategoal/${id}`, currentGoal);
      console.log(response.data.message);
      setOpenModal(false); // Close modal after update
      fetchGoals(); // Refresh goals
    } catch (error) {
      console.error("Error updating goal:", error);
    } finally {
      setIsLoading(false);
      setCurrentGoal(initialGoalState);
      

    }
  };
  
  //Handles the new goal being created
const handleSubmitGoal = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  try {
    setIsLoading(true);
    const response = await axios.post('http://localhost:5000/creategoal', newGoal);
    if (response.status === 201) {
      console.log('Goal created:', response.data);
      setNewGoal({ title: '', goal: '' }); // Clear the form
    }
  } catch (error) {
    console.error('Error creating goal:', error);
  }finally {
    //Stops the loading and closes the modal
    setIsLoading(false);
    setOpenNewGoalModal(false);
    fetchGoals();
  }
}; 

//Handles the user request to delete a goal
const handleDelete = async (id, event) => {
  event.stopPropagation();
  console.log("Delete Clicked for ID:", id); 
  // Delete logic here
  // Then, you might want to update 'goals' state to reflect the deletion
  try {
    setIsLoading(true); 
    const response = await axios.delete(`http://localhost:5000/deletegoal/${id}`);
    console.log(response.data.message);
    
} catch (error) {
    console.error("Error deleting advice:", error);
} finally {
    fetchGoals();
    setIsLoading(false);
}
};
  
//Controls when the loading screen pops up
  if (isLoading) {
    return <MyLoadingScreen />;
}

  return (
    <>{isLoading ? (
      <div className="loading-screen"><MyLoadingScreen/></div>
    ) : (
    <Grid sx={{ flexGrow: 1,}} container spacing={2} >
      <Grid item xs={12} style={{ height: '500px', overflowY: 'auto' }}>
        <h3>
          This Section is used to track your goals and make sure that you complete them.
        </h3>
        <Grid container justifyContent="center" spacing={2}>
          {goals.map((goal) => (
            <Grid key={goal.id} item >
              <Card variant="outlined" sx={{ maxWidth: 360, bgcolor: 'rgba(128, 128, 128, 0.5)' }}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div"  sx={{ fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {goal.title}  
                      {goal.isCompleted ? (
        <button 
          key={goal.id}
          style={{ 
            marginLeft: '10px', 
            backgroundColor: "beige",
            padding: '0', 
            border: 'none', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '30px',  // Ensure you specify the unit 'px'
            height: '30px' ,
            borderRadius: '15px'
          }}
        >
          <Lottie animationData={completedData} style={{ width: '30px', height: '30px' }}/>
        </button>
      ) : (
        <button 
          key={goal.id}
          style={{ 
            marginLeft: '10px', 
            backgroundColor: "beige",
            padding: '0', 
            border: 'none', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '30px',  // Ensure you specify the unit 'px'
            height: '30px',
            borderRadius: '15px'
          }}
        >
          <Lottie animationData={inProgresData} style={{ width: '30px', height: '30px' }}/>
        </button>
      )}
      </div>
                    </Typography>
                  </Stack>
                  <Divider />
                  <Typography color="black" variant="body2"  sx={{ fontWeight: 'bold' }}>
                  {goal.goal}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button 
                  key={goal.id}
                    style={{ 
                      marginLeft: '3px', 
                      backgroundColor: "beige",
                      padding: '0', 
                      border: 'none', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      width: '30', 
                      height: '30px' 
                    }} 
                    onClick={(event) => handleDelete(goal.id, event)}
                  >
                    <Lottie animationData={animationData} style={{ width: '30px', height: '30px' }}/>
                  </button>
                  <button 
                  key={goal.id}
                    style={{ 
                      marginLeft: '3px', 
                      backgroundColor: "beige",
                      padding: '0', 
                      border: 'none', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      width: '30', 
                      height: '30px' 
                    }} 
                    onClick={() => handleUpdateClick(goal)}
                  >
                    <Lottie animationData={updatearrowData} style={{ width: '30px', height: '30px' }}/>
                  </button>
                 
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    
    )}{/* Create Goal Button */}
    <Button 
  variant="contained"
  color="primary"
  onClick={handleCreateGoal}
  sx={{
    position: 'fixed',
    width: '50%',
    bottom: 16,
    height: '50px', // Set an explicit height for the button
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'black',
    borderRadius: '20px',
    padding: '6px 12px', // Reduced padding
    fontSize: '0.875rem', // Adjust font size as needed
    display: 'flex', // Use flex to manage space inside the button
    justifyContent: 'center', // Adjust this as needed
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#333'
    }
  }}
>
  <span>Create Goal</span> {/* Wrapped text in a span for better control */}
  <Lottie 
    animationData={cubeData} 
    style={{
      width: '70px', // Larger animation size
      height: '70px',
      flexShrink: 0 // Prevent animation from shrinking
    }}
  />
</Button>


    <Modal
    open={openModal}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={openModal}>
      <Box sx={modalStyle}> {/* Add your styling for the modal */}
        <form onSubmit={(event) => handleUpdate(currentGoal.id, event)}>
          <TextField
            label="Title"
            value={currentGoal.title}
            onChange={(e) => setCurrentGoal({ ...currentGoal, title: e.target.value })}
            fullWidth
             InputLabelProps={{
    style: { color: 'beige' } // Styles the label text
  }}
  InputProps={{
    style: { color: 'beige' } // Styles the input text
  }}
          />
          <TextField
            label="Goal"
            value={currentGoal.goal}
            onChange={(e) => setCurrentGoal({ ...currentGoal, goal: e.target.value })}
            fullWidth
            multiline
             InputLabelProps={{
    style: { color: 'beige' } // Styles the label text
  }}
  InputProps={{
    style: { color: 'beige' } // Styles the input text
  }}
          />
          <TextField  /** The boolean value*/
    label="Is Completed?"
    value={currentGoal.isCompleted}
    defaultValue={currentGoal.isCompleted}
    onChange={(e) => setCurrentGoal({ ...currentGoal, isCompleted: e.target.value})}
    fullWidth
   
    select
    SelectProps={{
      native: true,
    }}
    InputLabelProps={{
      style: {
        color: 'beige', // Styles the label text
        borderColor: 'beige', // Adds a beige border to the label
      }
    }}
    InputProps={{
      style: { color: 'beige' } // Styles the input text
    }}
  >
    <option value={true} style={{color: 'black', backgroundColor: 'beige'}}>True</option>
    <option value={false} style={{color: 'black', backgroundColor: 'beige'}}>False</option>
  </TextField>
          <Button type="submit">Update</Button>
        </form>
      </Box>
    </Fade>
  </Modal>
  {/**Modal that handles creating a new goal */}
  <Modal
    open={openNewGoalModal}
    onClose={() => setOpenNewGoalModal(false)}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{ timeout: 500 }}
  >
    <Fade in={openNewGoalModal}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" 
          sx={{ color: 'beige' }}  // Applying the color directly through the sx prop
          >
          Create New Goal
        </Typography>
        <form onSubmit={handleSubmitGoal}>
          <TextField
            label="Title"
            fullWidth
            value={newGoal.title}
            onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
            margin="normal"
            InputLabelProps={{
              style: { color: 'beige' } // Styles the label text
            }}
            InputProps={{
              style: { color: 'beige' } // Styles the input text
            }}
          />
          <TextField
            label="Goal"
            fullWidth
            multiline
            value={newGoal.goal}
            onChange={(e) => setNewGoal({...newGoal, goal: e.target.value})}
            margin="normal"
            InputLabelProps={{
              style: { color: 'beige' } // Styles the label text
            }}
            InputProps={{
              style: { color: 'beige' } // Styles the input text
            }}
          />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </Fade>
  </Modal>
    </>
  );
}


/**
 * Fetch the information from the goals table:userid, title, goal, id
 * Dynaically render the component with said values included
 * Add buttons to handle delete and update operations
 * 
 */
/**
 * <button key={advise.id}
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
               <Lottie animationData = {animationData}  style={{ width: '30px', height: '30px' }}/>

  </button>
 */
