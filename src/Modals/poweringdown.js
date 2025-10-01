import '../css/main.css';

export function PoweringDown()
{
    return`
        <div class="${poweringDownContainerClasses.join(' ')}">

        <section class="${poweringDownSectionClasses.join(' ')}">

        <p class="${poweringDownTextClasses.join(' ')}">
            System is powering down please wait <br> 
            <span class="${poweringDownNumberClasses.join(' ')}">3</span> seconds
        </p>


        </section>

        </div>
    `;
}

const stringValueToListenForCountdown = 72;
const boolValueToWatchForVisibility = 72;


const poweringDownContainerClasses = ["powering-down-container", "hidden"];
const poweringDownSectionClasses = ["powering-down-section"];
const poweringDownTextClasses = ["power-countdown-text"];
const poweringDownNumberClasses = ["power-countdown-number"];

let timerText;
let container;


document.addEventListener("DOMContentLoaded", () => 
{

    timerText = document.querySelector(".power-countdown-number");
    container = document.querySelector(".powering-down-container");


    CrComLib.subscribeState('s',String(stringValueToListenForCountdown),(value) => 
    { 
        timerText.innerText = value;
    });      

    CrComLib.subscribeState('b',String(boolValueToWatchForVisibility),(value) =>
    { 
        if(value)
        {
            container.classList.remove("hidden");
            container.classList.add("visible");
        }
        else
        {
            container.classList.remove("visible");
            container.classList.add("hidden");
        }
    }); 


});