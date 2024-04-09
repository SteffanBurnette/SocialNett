import MyLogin from "/src//myComponents/MyLogin.jsx"
import MySignup from "/src//myComponents/MySignup.jsx"
import "./rootlayout.css"
import Lottie from 'lottie-react'
import animationData from "/src/animations/community.json"
import {Outlet} from "react-router-dom";

export default function RootLayout(){

    return(
        <div className="parent-div">
              <div className="outer-div">
                <Lottie animationData = {animationData} className = "lottie-animation"/>
              </div>
              <div className = "div-buttons">
              <h1 className = "header-style">SocialNett</h1>
              <p className = "main-text">A platform that allows you to bring out your best!</p>
             
              <div className="bottom-left-container">
            
                
                  <div className="login">
                    <div className="landing-page">
                      <MyLogin className = "button-large"/>
                    </div>
                  </div>
          
                  <div className="signup">
                    <MySignup className = "button-large"/>
                  </div>
                
              </div>
              </div>
            <Outlet/>
            </div>
    )
}