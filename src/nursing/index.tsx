import {useRef} from 'react'
import {Canvas} from "@react-three/fiber";
import {AxesHelper} from 'three';
import {CameraControls, Environment, useGLTF} from '@react-three/drei';
import './index.css';
import GLBModel from "../loader";
import {INVALID, INFUSION_PUMPS} from "../const/animation.ts";

function Nursing() {
    const cameraControlRef = useRef<CameraControls | null>(null);


    // 病房场景搭建.
    return (
        <div className={'main'}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                <color attach="background" args={["#008000"]}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                {/*相机控制器 */}
                <CameraControls ref={cameraControlRef}/>
                {/*辅助线*/}
                <primitive object={new AxesHelper(20)}/>
                {/*加载房间*/}
                <GLBModel url="/bf.glb" position={[-6, 0, 0]}/>
                {/*移动式输液架 */}
                <GLBModel url="/HL_SM_YiDongShiShuYeJia.glb" position={[-6, 0, 0]}/>
                {/*治疗车*/}
                <GLBModel url="/HL_ZhiLiaoChe_BingFang.glb" position={[-6, 0, 0]}/>
                {/*输液泵*/}
                <GLBModel
                    url="/HL_ShuYeBeng.glb"
                    position={[1, 0.7315777257693641, 0.8779830113159199]}
                    rotation={[0, Math.PI, 0]}
                    click={(e) => {
                        // console.log(e);
                        console.log(e.object);
                    }}
                />
                {/*棉签*/}
                <GLBModel
                    url="/HL_YiYongMianQianBaoZhuang.glb"
                    position={[1.2, 0.62, 0.8779830113159199]}
                    // position={[-6, 0, 0]}
                />
                {/*吉尔碘*/}
                <GLBModel
                    url="/HL_JiErDianXiaoDuYe.glb"
                    position={[1.3, 0.64, 0.8779830113159199]}
                    // position={[-6, 0, 0]}
                />
                {/*男性病人*/}
                <GLBModel
                    url="/HL_NanXingBingRen.glb"
                    position={[-0.3, 0.7, 0.6779830113159199]}
                    rotation={[0, Math.PI, 0]}
                    animationName={INVALID.ACTION}
                    // position={[-6, 0, 0]}
                />
                {/*输液泵动画*/}
                <GLBModel
                    url="/HL_ShuYeBeng-DongHua.glb"
                    // position: [6.506, 1.006, 0.968],
                    position={[-6, 0, 0]}
                    // rotation={[0, Math.PI, 0]}
                    animationName={INFUSION_PUMPS.CONNECT}
                    playOnce={true}
                    click={(e) => {
                        // console.log(e);
                        console.log(e.object.name);
                        // 阻止冒泡.
                        e.stopPropagation();
                    }}
                    // position={[-6, 0, 0]}
                />
                {/*HDR */}
                <Environment files={'/qwantani_dusk_2_1k.hdr'}/>
            </Canvas>
        </div>
    );
}

export default Nursing
