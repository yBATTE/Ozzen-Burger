import React from 'react';
import ReactDOM from 'react-dom/client';
import App,{configureSite,type SiteConfig} from './App';
import fallback from '../public/config.json';
async function boot(){let config:SiteConfig=fallback;try{const response=await fetch('/config.json',{cache:'no-store'});if(!response.ok)throw new Error('config');const loaded=await response.json();config={local:{...fallback.local,...loaded.local},menu:{...fallback.menu,...loaded.menu,categories:Array.isArray(loaded.menu?.categories)?loaded.menu.categories:[]}}}catch{console.warn('Se utiliza la configuración incluida.')}configureSite(config);ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)}boot();
