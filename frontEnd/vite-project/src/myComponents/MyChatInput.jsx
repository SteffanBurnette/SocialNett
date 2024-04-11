import axios from "axios"
import "./mychatinput.css"
import {useState} from "react"

export default function MyChatInput() {
const [inputValue, setInputValue] = useState('');

const handleInputChange = (e) => {
    setInputValue(e.target.value);
};

const handleSend = async () => {
    if (!inputValue.trim()) return; // Check if the input is not just empty spaces

    try {
        const response = await axios.post('http://localhost:5000/createadvice', { "prompt": inputValue });
        // Handle response or update UI as needed
        console.log(response.data);
    } catch (error) {
        // Handle error
        console.error('Error sending message:', error);
    }

    setInputValue(''); // Clear the input field after sending
};



  return(
    <>
    <div class="chat-input-container">
    <input type="text" id="chatInput" placeholder="Type your message here..."  onChange ={handleInputChange}/>
    
</div>
<button id="sendButton" onClick = {handleSend}>Send</button>
</>

  );
}
