import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './demo/App.tsx'
import Nursing from "./view/nursing";
// import {SomeMachineContext} from "../steps";
import {SomeMachineContext} from "./steps/machine";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SomeMachineContext.Provider>
            <Nursing/>
        </SomeMachineContext.Provider>
    </StrictMode>,
)
