

const { WebXPanel, isActive, WebXPanelConfigParams, WebXPanelEvents } = window.WebXPanel.getWebXPanel(!window.WebXPanel.runsInContainerApp());


let isConn;

// if (typeof window.WebXPanel === 'undefined')
// {
//     console.error('WebXPanel is not loaded. Ensure the UMD library is included in your index.html.');
// } 
// else 
// {
    // Add event listeners
    WebXPanel.addEventListener(WebXPanelEvents.CONNECTED, () => 
    {
        console.log('WebXPanel is connected to the control system.');
        isConn = true;
    });

    WebXPanel.addEventListener(WebXPanelEvents.DISCONNECTED, () => 
    {
        console.log('WebXPanel is disconnected from the control system.');
        isConn = false;
    });

    WebXPanel.addEventListener(WebXPanelEvents.ERROR, (error) => 
    {
        console.error('WebXPanel encountered an error:', error);
    });

    WebXPanel.addEventListener(WebXPanelEvents.RECONNECTING, () => 
    {
        console.log('WebXPanel is attempting to reconnect to the control system...');


    });

    WebXPanel.addEventListener(WebXPanelEvents.RECONNECTED, () => 
    {
        console.log('WebXPanel successfully reconnected to the control system.');
    });
// }




function CreateConnection()
{
    console.log("Creating connection to WebXPanel...");

    if(isActive)
    {
        WebXPanelConfigParams.host = "192.168.1.163";
        WebXPanelConfigParams.ipId = "0x03";

        WebXPanel.initialize(WebXPanelConfigParams);
        console.log("WebXPanel initialized with config:", WebXPanelConfigParams);
    }


}

CreateConnection();




export function ConfigWebXpanel()
{

    isConn = false;
    setInterval(CreateConnection,5000);





}