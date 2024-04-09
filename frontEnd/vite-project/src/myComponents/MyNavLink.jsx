import {NavLink} from "react-router-dom";
import "./mynavlink.css"
import axios from "axios"

export default function MyNavLink(){

    const handleLogout = async () => {
        await axios.post('http://localhost:5000/logout')
            .then(response => {
                console.log(response.data.message);
                // Handle successful logout here, like redirecting to the login page
            })
            .catch(error => {
                console.error('Logout failed:', error);
                // Handle logout errors here
            });
    };
    


    return(
        <header>
            <h1>
                <NavLink to = "/mainpage">Home</NavLink>
                <NavLink to = "/advicepage">Advisor</NavLink>
                <NavLink to = "/goalpage">Goals</NavLink>
                <NavLink to = "/" onClick = {handleLogout}>Logout</NavLink>
            </h1>
        </header>
    )
}