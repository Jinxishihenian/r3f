import {useRef, useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Canvas} from "@react-three/fiber";


import Box from "./r3f.tsx";

import {AxesHelper} from 'three';
import {OrbitControls, useGLTF, Outlines, CameraControls, Environment} from '@react-three/drei';
import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Noise,
    Vignette,
    N8AO,
    SMAA,
    SSAO,
    Outline
} from '@react-three/postprocessing'
import {BlendFunction} from 'postprocessing'

function App() {
    // const { outlines } = useControls({ outlines: true })
    const [count, setCount] = useState(0);
    const meshRef = useRef();
    const cameraControlRef = useRef<CameraControls | null>(null);
    const [selected, setSelected] = useState(null);
    const handleClick = (event) => {
        const clickedObject = event.object;
        setSelected(clickedObject);
    }
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                <color attach="background" args={["#dfdfdf"]}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                <Box position={[-0.2, 0, 0]}/>
                <Box position={[0.2, 0.5, 0]}/>
                <CameraControls ref={cameraControlRef}/>
                {/* 创建一个简单的立方体模型 */}
                {/*<mesh ref={meshRef} position={[0, 0, 0]}>*/}
                {/*    <boxGeometry args={[2, 2, 2]}/>*/}
                {/*    <meshStandardMaterial color="orange"/>*/}
                {/*</mesh>*/}
                <primitive object={new AxesHelper(20)}/>
                {/*<GLBModel url="/room.glb"></GLBModel>*/}
                {/*<GLBModel url="/skull2.glb" position={[0, -90, 0]}></GLBModel>*/}
                <GLBModel url="/bf.glb" position={[-6, 0, 0]}/>
                {/*<GLBModel*/}
                {/*    url="/zlc.glb"*/}
                {/*    position={[2, 0.4, 1]}*/}
                {/*    onClick={(event) => {*/}
                {/*        console.log('点击');*/}
                {/*        console.log(event);*/}
                {/*        handleClick(event);*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<primitive object={useGLTF("/bf.glb")} />*/}
                {/*<OrbitControls/>*/}
                <Environment
                    // files={"apartment"}
                    // background
                    preset="apartment"
                />
                <EffectComposer enableNormalPass>
                {/*<EffectComposer>*/}
                    {/*<DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />*/}
                    {/*<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />*/}
                    {/*<Noise opacity={0.02} />*/}
                    {/*<Vignette eskil={false} offset={0.1} darkness={1.1} />*/}
                    {/*<SSAO*/}
                    {/*    intensity={20} // overall intensity of the effect*/}
                    {/*    blendFunction={BlendFunction.MULTIPLY} // blend mode Use NORMAL to see the effect*/}
                    {/*    samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)*/}
                    {/*    rings={0.001} // amount of rings in the occlusion sampling pattern*/}
                    {/*    color={'blue'}*/}
                    {/*    distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1*/}
                    {/*    distanceFalloff={0.0} // distance falloff. min: 0, max: 1*/}
                    {/*    rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1*/}
                    {/*    rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1*/}
                    {/*    luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion*/}
                    {/*    radius={20} // occlusion sampling radius*/}
                    {/*    scale={0.5} // scale of the ambient occlusion*/}
                    {/*    bias={0.5} // occlusion bias*/}
                    {/*/>*/}
                    {/*<Bloom mipmapBlur levels={7} intensity={1}/>*/}
                    {/*<N8AO halfRes color="black" aoRadius={4} intensity={10} aoSamples={16} denoiseSamples={16}/>*/}
                    {/*<Bloom mipmapBlur levels={7} intensity={1}/>*/}
                    {/*<OutlinePass*/}
                    {/*    visibleEdgeColor={'red'} // 轮廓线的颜色*/}
                    {/*    edgeStrength={10} // 轮廓线的强度*/}
                    {/*    edgeThickness={3} // 轮廓线的厚度*/}
                    {/*    blur={false} // 是否应用模糊*/}
                    {/*    selectedObjects={[meshRef.current]} // 为哪个对象添加轮廓*/}
                    {/*/>*/}
                    <SMAA/>
                    {/*<Outline selection={[selected]}></Outline>*/}
                    <Outlines angle={0} thickness={1.1} color="black"/>
                </EffectComposer>
            </Canvas>
        </div>
    );
    // return (
    //   <>
    //     <div>
    //       <a href="https://vite.dev" target="_blank">
    //         <img src={viteLogo} className="logo" alt="Vite logo" />
    //       </a>
    //       <a href="https://react.dev" target="_blank">
    //         <img src={reactLogo} className="logo react" alt="React logo" />
    //       </a>
    //     </div>
    //     <h1>Vite + React</h1>
    //     <div className="card">
    //       <button onClick={() => setCount((count) => count + 1)}>
    //         count is {count}
    //       </button>
    //       <p>
    //         Edit <code>src/App.tsx</code> and save to test HMR
    //       </p>
    //     </div>
    //     <p className="read-the-docs">
    //       Click on the Vite and React logos to learn more
    //     </p>
    //   </>
    // )
}

function GLBModel({url, ...props}) {
    const {scene} = useGLTF(url); // 使用 useGLTF 加载 .glb 模型
    return <primitive {...props} object={scene} scale={1}/>;
}

export default App
