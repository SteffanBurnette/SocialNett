import Lottie from 'lottie-react'
import animationData from "/src/animations/programmer.json"
import {Outlet} from "react-router-dom"
import MyNavLink from "/src/myComponents/MyNavLink.jsx"
import MyGoals from "/src/myComponents/MyGoals.jsx"

export default function GoalsLayout(){
    
    return(
        <div>
            <MyNavLink />
            <MyGoals/>
            <Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>
            <Outlet/>
        </div>
    );
}