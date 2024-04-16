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
        <div style={{ position: 'relative', width: '100%', height: '97vh', overflow: 'hidden' }}>
    <div id="lottie-bg" style={{
        position: 'absolute',
        width: '80%',  // Full width for better background coverage
        height: '80vh', // Full viewport height
        zIndex: 0,       // Lower z-index since this is background
        left: 0,
        top: 0
    }}></div>
    <div style={{
        position: 'relative',
        zIndex: 2, // Higher z-index to ensure this content is above the background
        width: '100%',
        height: '100vh',
        overflow: 'auto', // Allows scrolling within this container if needed
    }}>
        <MyGoals />
    </div>
</div>

    );
}

//<Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>
