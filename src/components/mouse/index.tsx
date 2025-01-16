import {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import viteLogo from '/vite.svg'
import SYB from '/syb.png'
import SYB2 from '/syb2.png'
import {GlobalMachineContext} from "../../machine";

const MouseFollower = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const player = GlobalMachineContext.useSelector((state) => state?.context?.player);
    // console.log()
    useEffect(() => {
        console.log('player');
        console.log(player);
    }, [player.hand.collectName]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({x: e.clientX, y: e.clientY});
        }
        // 监听全局鼠标移动事件.
        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, []);
    // 使用React.createPortal 渲染到body中.
    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: position.y - 50 + 50 + 10,
                left: position.x - 50,
                width: "100px",
                height: "100px",
                backgroundColor: "red",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 999,
            }}
        >
            <img width={'100%'} src={SYB2} className="logo" alt="Vite logo"/>
        </div>,
        document.body
    );
}
export default MouseFollower;