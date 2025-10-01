import hdmiImage from '../assets/images/hdmi-cable.png';
import wonkyDisplay from '../assets/images/tv-app.png';
import '../css/videopage.css';


//Static Create Example 
export function Video()
{
    return`
            <div class="${videoContainerClasses.join(' ')}">


            </div>
    `;
}

const videoContainerClasses = ["video-container"];


let currentSource
let sources;
let destButton;
let currValue;




export function InitializeVideoPage()
{
    //Intialize your listeners and set your variables and watchers here

    
}

