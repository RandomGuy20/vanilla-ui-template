import { Audio } from '../Subpages/audio.js';
import { Video } from '../Subpages/video.js';



const routes = 
{
  //Add your routes into here
};


//This is how you grab the correct page from the router
export function NavigatePage(pageName) 
{
  const component = routes[pageName];
  if (component) 
  {
    return component();
  } 
  else 
  {
    console.error(`Page "${pageName}" not found in routes.`);
    return `<div>Page not found</div>`;
  }
}