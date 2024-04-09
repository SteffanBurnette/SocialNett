import Lottie from 'lottie-react'
import animationData from "/src/animations/detectiveWalking.json"
import MyNavLink from "/src/myComponents/MyNavLink.jsx"
import "./mainlayout.css"

export default function MainLayout(){

    return(
        <div>
            <MyNavLink />
            <Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>
        </div>
    )
}