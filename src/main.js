import '../src/css/main.css'
import {Header} from './StaticFiles/header.js'
import {Footer, SetupFooterEventListeners} from './StaticFiles/footer.js'
import {NavigatePage} from './Router/router.js'
import {Power} from './Modals/power.js'
import {PoweringDown} from './Modals/poweringdown.js'




document.querySelector('#app').innerHTML = 
`
${Power()}
${PoweringDown()}

${Header()}

    <div class="subpage-container" id="dynamic-content"></div>
${Footer()}


`;


function MountPage(pageName)
{
    const content = NavigatePage(pageName); // from the router
    // Use this to initialize the pages we have routed
}




//This is the method we imported, and the param is yoru callback delegate
SetupFooterEventListeners(MountPage);
MountPage("AudioPage"); //Cheesy way to put default page






