import {useRef} from 'react'
import {Canvas} from "@react-three/fiber";
import {AxesHelper} from 'three';
import {CameraControls, useGLTF} from '@react-three/drei';

function Nursing() {
    const cameraControlRef = useRef<CameraControls | null>(null);
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                <color attach="background" args={["#dfdfdf"]}/>
                {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>*/}
                {/*<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>*/}
                <CameraControls ref={cameraControlRef}/>
                <primitive object={new AxesHelper(20)}/>
                <GLBModel url="/bf.glb" position={[-6, 0, 0]}/>
            </Canvas>
        </div>
    );
}

function GLBModel({url, ...props}) {
    const {scene} = useGLTF(url); // 使用 useGLTF 加载 .glb 模型
    return <primitive {...props} object={scene} scale={1}/>;
}

export default Nursing
