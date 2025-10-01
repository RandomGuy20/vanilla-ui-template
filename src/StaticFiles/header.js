
import '../css/header.css';


export function Header()
{
    return`<header>

        <p class="large-text bold-font coral-text-shadow">
            SIMPLE Vanilla JS Example
        </p>

        <p id="date-time-display" class="date-time-display coral-text-shadow">
            ${DateAndTime()}
        </p>



        </header> `;
}




function DateAndTime() 
{
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    let hours = date.getHours(); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    const formattedTime = `${hours}:${minutes} ${amPm}`;

    return `${formattedTime}`;
}


document.addEventListener("DOMContentLoaded", () => 
{
    setInterval(() => 
    {
        const dateTimeDisplay = document.getElementById('date-time-display');
        if (dateTimeDisplay) 
        {
            dateTimeDisplay.textContent = DateAndTime();
        }
    }, 1000); // Update every 1000ms (1 second)

});