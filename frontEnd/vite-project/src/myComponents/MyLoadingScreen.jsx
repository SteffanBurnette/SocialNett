import Lottie from "lottie-react"
import animationData from "/src/animations/testloading.json"
import programanimationData from "/src/animations/programmer.json"

export default function MyloadingScreen(){



    return(
        <div>
           <Lottie animationData = {animationData}  style={{ width: '600px', height: '600px' }}/>
        </div>

    );
}

export function MyloadingProgrammer(){
    return(
        <div>
           <Lottie animationData = {programanimationData}  style={{ width: '600px', height: '600px' }}/>
        </div>

    );
}