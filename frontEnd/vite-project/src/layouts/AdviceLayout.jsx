import Lottie from 'lottie-react'
import animationData from "/src/animations/guyChilling.json"
import {Outlet} from "react-router-dom"
import MyNavLink from "/src/myComponents/MyNavLink.jsx"
import MySidebar from "/src/myComponents/MySidebar.jsx"

export default function AdviceLayout(){
    
    return(
        <div>
            <MyNavLink />
            <MySidebar/>
            <Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>

           <Outlet/>
        </div>
    );
}