import Lottie from 'lottie-react'
import animationData from "/src/animations/detectiveWalking.json"
import "./mainlayout.css"
import MainPage from "/src//myComponents/MainPage"

export default function MainLayout(){

    return(
        <div>
            <MainPage/>
        </div>
    )
}

// <Lottie animationData = {animationData}  style={{ width: '400px', height: '400px' }}/>
