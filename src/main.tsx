import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './demo/App.tsx'
import Nursing from "./view/nursing";
// import {GlobalMachineContext} from "../steps";
import {GlobalMachineContext} from "./machine";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalMachineContext.Provider>
            <Nursing/>
        </GlobalMachineContext.Provider>
    </StrictMode>,
)
