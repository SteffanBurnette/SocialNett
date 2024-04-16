import Lottie from 'lottie-react'
import animationData from "/src/animations/guyChilling.json"
import {Outlet} from "react-router-dom"
import MyNavLink from "/src/myComponents/MyNavLink.jsx" //lottie background animation
import chatgptData from "/src/animations/chatgpticon.json"
import "./advice.css"
import MyChat from "/src/myComponents/MyChat.jsx"
import {useEffect} from "react"
import lottie from 'lottie-web'; // Use lottie-web for JSON animations
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 200px)', // Adjust based on the total header and footer height
    lineHeight: '120px',
    
    flexGrow: 1, /* Allows content to expand and fill available space */
  overflowY: "auto", /* Adds scroll to content if overflow */
  };

export default function AdviceLayout(){
    //<Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>
    useEffect(() => {
        // Load the animation on component mount
        const animation = lottie.loadAnimation({
            container: document.getElementById('lottie-bg'), // The container for the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path:  "/src/animations/chatgpticon.json" // Use path for lottie-web
        });

        // Optional: Clean up on component unmount
        return () => animation.destroy();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column' }}> {/* Ensures layout is flex and column direction */}
        
        
        <div id="lottie-bg" style={{
              position: 'absolute',
              width: '600px', // Set the width of the animation
              height: '600px', // Set the height of the animation
              zIndex: 1,
              left: '50%', // Center horizontally
              top: '50%', // Center vertically
              transform: 'translate(-50%, -50%)' // Adjust the position to truly center
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
            
           

               <MyChat/>
           </div>
          
           </Layout>
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