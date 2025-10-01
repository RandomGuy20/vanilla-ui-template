

const { WebXPanel, isActive, WebXPanelConfigParams, WebXPanelEvents } = window.WebXPanel.getWebXPanel(!window.WebXPanel.runsInContainerApp());


if(isActive) 
{
  WebXPanelConfigParams.host = "192.168.1.163";
  WebXPanelConfigParams.ipId = "0x03";

  console.log("Initializing WebXPanel with config: " + JSON.stringify(WebXPanelConfigParams));
  WebXPanel.initialize(WebXPanelConfigParams);
}

let connected = false;


window.addEventListener(WebXPanelEvents.CONNECT_WS, ({ detail }) => 
{
  console.log(`WebXPanel websocket connection: ${JSON.stringify(detail)}`);
});


window.addEventListener(WebXPanelEvents.CONNECT_CIP, ({ detail }) =>
{
  console.log(`WebXPanel CIP connection: ${JSON.stringify(detail)}`);
  connected = true;
});


window.addEventListener(WebXPanelEvents.AUTHENTICATION_FAILED, ({ detail }) =>
{
  console.log(`WebXPanel authentication: ${JSON.stringify(detail)}`);
});


window.addEventListener(WebXPanelEvents.NOT_AUTHORIZED, ({ detail }) => 
{
  console.log(`WebXPanel token request: ${JSON.stringify(detail)}`);
  window.location = detail.redirectTo;
});


window.addEventListener(WebXPanelEvents.ERROR_WS, ({ detail }) => 
{
  console.log(`WebXPanel connection failed: ${JSON.stringify(detail)}`);
  connected = false;
});


window.addEventListener(WebXPanelEvents.DISCONNECT_WS, ({ detail }) => 
{
  console.log(`WebXPanel WS connection lost: ${JSON.stringify(detail)}`);
  connected = false;
});


window.addEventListener(WebXPanelEvents.DISCONNECT_CIP, ({ detail }) => 
{
  console.log(`WebXPanel CIP connection lost: ${JSON.stringify(detail)}`);
  connected = false;
});

function checkOnlineStatus() 
{
  console.log('Checking online status...');
  if (window.navigator.onLine && connected) 
{
    console.log('We are connected');
    if (window.location.pathname === "/vite-example-project/offline.html") 
    {
      window.location.href = './index.html';
    }
  } 
  else 
  {
    console.log('We are not connected');
    if (window.location.pathname === "/vite-example-project/index.html") 
    {
        window.location.href = './offline.html';
    }
  }
}

setInterval(checkOnlineStatus, 5000);