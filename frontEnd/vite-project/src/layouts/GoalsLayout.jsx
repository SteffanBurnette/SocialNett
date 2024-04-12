import React, { useEffect } from 'react'; // Import useEffect
import lottie from 'lottie-web'; // Use lottie-web for JSON animations
import MyNavLink from "/src/myComponents/MyNavLink.jsx";
import MyGoals from "/src/myComponents/MyGoals.jsx";
import { Outlet } from "react-router-dom";
import "./goals.css"

export default function GoalsLayout() {
    useEffect(() => {
        // Load the animation on component mount
        const animation = lottie.loadAnimation({
            container: document.getElementById('lottie-bg'), // The container for the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/src/animations/programmer.json' // Use path for lottie-web
        });

        // Optional: Clean up on component unmount
        return () => animation.destroy();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div id="lottie-bg" style={{
                  position: 'absolute',
                  width: '500px', // Set the width of the animation
                  height: '500px', // Set the height of the animation
                  zIndex: 1,
                  left: '50%', // Center horizontally
                  top: '50%', // Center vertically
                  transform: 'translate(-50%, -50%)' // Adjust the position to truly center
            }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <MyNavLink />
                <MyGoals />
                <Outlet />
            </div>
        </div>
    );
}

//<Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>
