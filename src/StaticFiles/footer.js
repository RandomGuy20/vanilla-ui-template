
import '../css/footer.css';
import '../css/main.css';

export function Footer()
{
    return`            
            <footer>
                <div class="${navButtonClasses.join(' ')}">
                </div>

                <div class="audio-controls">

                    <div class="${audioSliderClasses.join(' ')}">
                        <div class="${progressSliderClasses.join(' ')}">
                            <div class="${progressBarFillClasses.join(' ')}" style="${progressbarStyling.join(' ')}"></div>
                        </div>
                        <span class="${progressBArTextClasses.join(' ')}">50%</span>
                    </div>

                    <div class="${audioButtonClasses.join(' ')}">
                        <button value="${audioButtonJoins[0]}" name="${audioButtonNames[0]}" class="btn inactive">${audioButtonLabels[0]}</button>
                        <button value="${audioButtonJoins[1]}" name="${audioButtonNames[1]}" class="btn inactive">${audioButtonLabels[1]}</button>
                        <button value="${audioButtonJoins[2]}" name="${audioButtonNames[2]}" class="btn">${audioButtonLabels[2]}</button>
                    </div>
                    
                </div>
    
            </footer>`;
}


const navButtonClasses = ["nav-buttons"];
const navButtonNames = [];
const navButtonJoins = [];

const audioSliderClasses = ["audio-slider"];
const progressSliderClasses = ["progress-slider"];
const progressBarFillClasses = ["progress-bar-fill"];
const progressbarStyling = ["width: 50%;"];
const progressBArTextClasses = ["progress-bar-text"];

const audioButtonClasses = ["audio-buttons"];
const audioButtonLabels = ["Vol Up", "Vol Down", "Mute"];
const audioButtonJoins = [1, 2, 3];
const audioButtonNames = ["up", "down", "mute"];

const analognavigationJoinValue = 10;
const analogSliderJoinValue = 1;



let navButtons;
let roomAudioButtons ;
let progressBarFill;
let volGaugeText;


let scroller;




function SetFeedback(index, state)
{
    const button = Array.from(roomAudioButtons).find(btn => btn.value == index);

    if (state) 
    {
        button.classList.add("active");
        button.classList.remove("inactive");
    }
    else 
    {
        button.classList.remove("active");
        button.classList.add("inactive");
    }

}


function OnButtonpress(state, index)
{
    // console.log("Footer button pressed", state, index);
    CrComLib.publishEvent('b',String(index),state); 
}



function SetNavButtonFeedback(value)
{
    //Set yoru feedback for the nav buttons here
}


export function SetupFooterEventListeners(PageChangeCallback) 
{

    navButtons = document.querySelectorAll('.nav-buttons button');
    roomAudioButtons = document.querySelectorAll(".audio-buttons button");
    progressBarFill = document.querySelector(progressBarFillClasses.join(''));
    volGaugeText = document.querySelector(progressBArTextClasses.join(''));



    navButtons.forEach(button =>
    {
        button.addEventListener("click", (event) => 
        {
               window.CrComLib.publishEvent('n', String(analognavigationJoinValue), Number(event.target.value));
        });
    });


    window.CrComLib.subscribeState('n', String(analognavigationJoinValue), (value) =>
    {
        //trigger the PageChangeCallback Delegate, with the correct routed pages name, see comment below example
        // if(value == 1)
        //     PageChangeCallback('AudioPage');
        // else if(value == 2)
        //     PageChangeCallback('VideoPage');
        // else if(value == 3)
        //     PageChangeCallback('WidgetPage');
        // else if(value == 4)
        //     PageChangeCallback('ScrollingPage');

        SetNavButtonFeedback(value)
    });


    audioButtonJoins.forEach(element => 
    {
        CrComLib.subscribeState('b',String(element),(value)=>
        { 
            SetFeedback(element, value);
        });
    });
 
    
    CrComLib.subscribeState('n',String(analogSliderJoinValue), (value) => 
    { 
        volGaugeText.innerText = value + "%";
        progressBarFill.style.width = value + "%";
    }); 

    roomAudioButtons.forEach(button => 
    {

        if(!button.name.includes("mute")) 
        {
            button.addEventListener("mousedown", () => OnButtonpress(true,button.value));
            button.addEventListener("touchstart", () => OnButtonpress(true,button.value));
            button.addEventListener("mouseup", () => OnButtonpress(false,button.value));
            button.addEventListener("touchend", () => OnButtonpress(false,button.value));
        }
        else
        {
            button.addEventListener("click", () => 
            {
                OnButtonpress(true,button.value);

                setTimeout(() => 
                {
                    OnButtonpress(false,button.value);
                }, 50);
            });
        }

    });

}

