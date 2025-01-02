import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './demo/App.tsx'
import Nursing from "./nursing";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*<App />*/}
        <Nursing/>
    </StrictMode>,
)
