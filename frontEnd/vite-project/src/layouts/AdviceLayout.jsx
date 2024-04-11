import Lottie from 'lottie-react'
import animationData from "/src/animations/guyChilling.json"
import {Outlet} from "react-router-dom"
import MyNavLink from "/src/myComponents/MyNavLink.jsx"

import "./advice.css"
import MyChat from "/src/myComponents/MyChat.jsx"

export default function AdviceLayout(){
    //<Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>

    return (
        <div >
            <MyNavLink />
           

               <MyChat/>

        
    </div>
    );
    
    
}

/**
 * <div class="container">
    <div class="sidebar">
        <!-- Sidebar content here -->
    </div>
    <div class="main-content">
        <div class="chat-area">
            <!-- Chat messages will go here -->
        </div>
        <div class="input-field-container">
            <input type="text" class="input-field" placeholder="Type your message here..." />
        </div>
    </div>
</div>

 */

/**
 *   return (
        <div className="container">
            <div className="mySidebar">
                <MySidebar />
            </div>
            <div className="main-content">
                <MyNavLink />
                
                
                <Outlet />
            </div>
            <div className = "mui">
                    <Mymuiinput />
                    </div>
        </div>
    );
 */