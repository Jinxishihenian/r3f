import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './demo/App.tsx'
import Nursing from "./nursing";
// import {SomeMachineContext} from "../steps";
import {SomeMachineContext} from "./steps";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SomeMachineContext.Provider>
            <Nursing/>
        </SomeMachineContext.Provider>
    </StrictMode>,
)
