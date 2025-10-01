import '../css/audiopage.css';





//Object Based import -,. Will help when going to vue
export function Audio()
{

    return`
    <div class="${audioContainerClasses.join(' ')}">


    </div>


    `;
}

const audioContainerClasses = ["audio-container"];


let micControls;
let micGauges;
let isInitialized = false;

const micGaugeLevels = {};





export function InitializeAudioPage()
{
    //Intialize your listeners and set your variables and watchers here

}



