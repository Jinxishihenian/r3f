import {useEffect, useRef} from 'react'
import {Canvas} from "@react-three/fiber";
import {AxesHelper} from 'three';
import {CameraControls, Environment, useGLTF} from '@react-three/drei';
import styles from './index.module.css';
import GLBModel from "../loader";
import {INVALID, INFUSION_PUMPS} from "../const/animation.ts";
import Gui from "../gui";
import {ActionMap, BehaviorMap} from "../action/const.ts";
import {eventQueue, eventManager} from "../action/aueue.ts";
import {startStep, steps} from "../action";
import {SomeMachineContext} from "../steps";
import {play} from "../movie";
import {Modal} from "antd";


let lock = false;

function Nursing() {
    const someActorRef = SomeMachineContext.useActorRef();
    useEffect(() => {
        if (!lock) {
            // console.log('初始化');
            // eventQueue.initialize(BehaviorMap[5]["5-1"]);
            // eventQueue.start();
            startStep(0);
            eventQueue.onComplete((event) => {
                console.log(event);
                console.log(`小丑的把戏:${event}`);
                Modal.confirm({
                    content: <div>播放:   {event}   对应影视</div>,
                    onOk: () => {
                    },
                    onCancel: () => {
                    }
                });
                // TODO影视层.
                // console.log(play[event]);

                // if (event == 'clickObjectA') {
                //     console.log('表现clickObjectA')
                // }
                // if (event == 'clickObjectB') {
                //     console.log('表现clickObjectB')
                // }
                // if (event == 'confirmAction') {
                //     console.log('表现confirmAction')
                // }
                // // eventQueue.currentIndex >= eventQueue.queue.length
                if (eventQueue.currentIndex >= eventQueue.queue.length) {
                    console.log('当前步骤完成~~~');
                    someActorRef.send({type: 'COMPLETE'});
                }
            });
            lock = true;
        }
    }, []);
    const cameraControlRef = useRef<CameraControls | null>(null);

    // 病房场景搭建.
    return (
        <div className={styles.main}>
            <Gui/>
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
                {/*输液泵静态*/}
                <GLBModel
                    url="/HL_ShuYeBeng.glb"
                    position={[1, 0.7315777257693641, 0.8779830113159199]}
                    rotation={[0, Math.PI, 0]}
                />
                {/*棉签*/}
                <GLBModel
                    url="/HL_YiYongMianQianBaoZhuang.glb"
                    position={[1.2, 0.62, 0.8779830113159199]}
                    // position={[-6, 0, 0]}
                    click={() => {
                        eventManager.emit("clickObjectA-2", "clickObjectA-2");
                    }}
                />
                <GLBModel
                    url="/HL_SM_HuShiBiao.glb"
                    position={[1.2, 0.62, 0.7]}
                    click={() => {
                        eventManager.emit("clickObjectA-1", "clickObjectA-1");
                    }}
                    // position={[-6, 0, 0]}
                />
                {/*吉尔碘*/}
                <GLBModel
                    url="/HL_JiErDianXiaoDuYe.glb"
                    position={[1.3, 0.64, 0.8779830113159199]}
                    click={(e) => {
                        // console.log(e);
                        // console.log(e.object.name);
                        // console.log('模拟执行');
                        // eventManager.emit(ActionMap.AN_QR7);
                        // eventManager.emit(ActionMap.AN_DH);
                        // 阻止冒泡.
                        eventManager.emit("confirmAction", "confirmAction");
                        // eventManager.emit("ObjectB");
                        // eventManager.emit("confirmAction");
                        e.stopPropagation();
                    }}
                    // position={[-6, 0, 0]}
                />
                {/*男性病人*/}
                <GLBModel
                    url="/HL_NanXingBingRen.glb"
                    position={[-0.3, 0.7, 0.6779830113159199]}
                    rotation={[0, Math.PI, 0]}
                    animationName={INVALID.ACTION}
                    // position={[-6, 0, 0]}
                    click={(e) => {
                        // console.log(e);
                        // console.log(e.object.name);
                        // console.log('模拟执行');
                        // eventManager.emit(ActionMap.AN_QR7);
                        // eventManager.emit(ActionMap.AN_DH);
                        // 阻止冒泡.

                        // eventManager.emit("confirmAction");
                        eventManager.emit("clickObjectB", "clickObjectB");
                        // eventManager.emit("clickObjectA", "clickObjectA");
                        e.stopPropagation();
                    }}
                />
                {/*输液泵动画*/}
                <GLBModel
                    url="/HL_ShuYeBeng-DongHua.glb"
                    // position: [6.506, 1.006, 0.968],
                    position={[-6, 0, 0]}
                    // rotation={[0, Math.PI, 0]}
                    // animationName={INFUSION_PUMPS.CONNECT}
                    animationName={"1.5少量液体滴入弯盘内"}
                    playOnce={true}
                    click={(e) => {
                        // console.log(e);
                        // console.log(e.object.name);
                        // console.log('模拟执行');
                        // eventManager.emit(ActionMap.AN_QR7);
                        // eventManager.emit(ActionMap.AN_DH);
                        // 阻止冒泡.
                        // eventManager.emit("confirmAction", "confirmAction");
                        // eventManager.emit("clickObjectC", "clickObjectC");
                        // eventManager.emit("clickObjectB", "clickObjectB");
                        // eventManager.emit("confirmAction", "confirmAction");
                        // eventManager.emit("clickObjectB", "clickObjectB");
                        eventManager.emit("clickObjectA", "clickObjectA");
                        // eventQueue.processNext();
                        // eventManager.emit("ObjectB");
                        // eventManager.emit("confirmAction");
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
