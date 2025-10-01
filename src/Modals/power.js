import '../css/power.css';
import '../css/main.css';


export function Power()
{
    return`
        '<div class="${powerPageContainerClasses.join(' ')}">

        <section class="${sectionPowerControlsContainerClasses.join(' ')}">
        <button class="${canelButtonClasses.join(' ')}" id="power-btn" value="${cancelButtonValue}"
        >
        Cancel
        </button>

        <button class="${powerButtonClasses.join(' ')}" id="power-btn" value="${powerButtonValue}"
        >
        Power Down
        </button>

        </section>

        </div>
    `;
}


const powerPageContainerClasses = ["power-container", "hidden"];
const sectionPowerControlsContainerClasses = ["power-controls-container"];
const canelButtonClasses = ["btn", "cancel-btn", "power-page-btn"];
const cancelButtonValue = 71;
const powerButtonClasses = ["btn", "power-btn", "power-page-btn"];
const powerButtonValue = 72;

const signalToWatchForVisibility = 72; 

let buttons;
let container;



function OnPress(state, index)
{
    CrComLib.publishEvent("b", String(index), Boolean(state));
}

function SetFeedback(value)
{
    if(value == 1)
    {
        container.classList.remove("hidden");
        container.classList.add("visible");
    }
    else
    {
        container.classList.remove("visible");
        container.classList.add("hidden");
    }
        
}

document.addEventListener("DOMContentLoaded", () => 
{

    container = document.querySelector(".power-container");
     buttons = document.querySelectorAll("#power-btn");

    CrComLib.subscribeState('n',String(signalToWatchForVisibility), (value) => 
    { 
        SetFeedback(value)
    });
        
    
    buttons.forEach(button => 
    {

        button.addEventListener('pointerdown', (ev) =>
        {
            if (ev.pointerType === 'mouse' || ev.pointerType === 'touch') 
            {
                ev.preventDefault();
                OnPress(true, button.value);
            }
        });
    
    
        button.addEventListener('pointerup', (ev) =>
        {
            if (ev.pointerType === 'mouse' || ev.pointerType === 'touch') 
            {
                ev.preventDefault();
                OnPress(false, button.value)
            }
        });
    });




});




