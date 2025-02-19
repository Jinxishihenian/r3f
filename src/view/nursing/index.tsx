import {useEffect, useRef, useState} from 'react'
import {Canvas} from "@react-three/fiber";
import {AxesHelper} from 'three';
import {CameraControls, Environment} from '@react-three/drei';
import styles from './index.module.css';
import GLBModel from "../../components/loader";
import {INVALID, INFUSION_PUMPS} from "../../const/animation.ts";
import Gui from "../../steps/gui";
import {startStep} from "../../event";
import {GlobalMachineContext} from "../../machine";
import eventQueue from "../../event/queue.ts";
import eventManager from "../../event/emitter.ts";
import Draggable from "../../components/draggable";
import useMovie from "../../hooks";
import Goods from "../../const/goods.ts";
import MouseFollower from "../../components/mouse";
import MouseFollowerLayout from "../../components/mouse/index2.tsx";
import TestTAP from "../../demo/test.tsx";
import Box from "../../demo/spring.tsx";


let lock = false;

function Nursing() {
    const globalActorRef = GlobalMachineContext.useActorRef();
    const cameraControlRef = useRef<CameraControls | null>(null);
    const {draggable, player} = GlobalMachineContext.useSelector((state) => state?.context);
    // const bears = useBearStore((state) => state.bears);
    // const increasePopulation = useBearStore((state) => state.increasePopulation)
    // const models = useBearStore((state) => state.models);
    const {play} = useMovie();
    // 操作器(双手).
    // const hand = useState({
    // 手中是否有东西.
    // 当前手中物品.
    // });
    // 相机轨道器是否启用.
    // const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);

    useEffect(() => {
        if (!lock) {
            // console.log('初始化');
            // eventQueue.initialize(BehaviorMap[5]["5-1"]);
            // eventQueue.start();
            // 步骤启动.
            startStep(0);
            // 表现层.
            eventQueue.onComplete(async (event) => {
                if (eventQueue.currentIndex >= eventQueue.queue.length) {
                    // console.log('当前步骤完成~~~');
                    globalActorRef.send({type: 'COMPLETE'});
                }
                // console.log('==事件==');
                // console.log(event)
                // 事件操作记录层(每一个有效事件都会被记录).
                // 表现层.
                // console.log('==表现层==');
                // console.log(models)
                await play(event);
                console.log('eventQueue.onComplete方法调用结束');
                // 伪代码.
                // alert(event);
                // if (event) {
                //     // 设置位置.
                //     player({type: '', ref: '', position: ''});
                // }
                // if (event) {
                //     // 播放动画.
                //     player({type: '', ref: '', position: ''});
                // }
                // console.log(event);
                // console.log(`小丑的把戏:${event}`);
                // Modal.confirm({
                //     content: <div>播放: {event} 对应影视</div>,
                //     onOk: () => {
                //     },
                //     onCancel: () => {
                //     }
                // });
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

            });
            lock = true;
        }
        globalActorRef.subscribe((e) => {
            // console.log('==监听变化==draggable');
            // console.log(draggable)
        });
    }, []);

    const collect = (name) => {
        console.log('点击物品');
        console.log(name)
        // player
        // 清空手中物品.
        if (player.hand.collectName == name) {
            globalActorRef.send({type: 'START_DRAG', payload: ""});
        } else {
            // 拾取点击物品.
            globalActorRef.send({type: 'START_DRAG', payload: name});
        }
    }


    // useEffect(() => {
    //
    //     if (models["输液泵"]) {
    //         models["输液泵"].position.set(0, 0, 0);
    //         console.log('222models222')
    //         console.log(models)
    //     }
    // }, [models]);

    // const player = (pamams) => {
    // }
    // 病房场景搭建.
    return (
        <div className={styles.main}>
            {/*<div onClick={increasePopulation}>是否在拖拽状态中:{draggable.toString()}:{bears}</div>*/}
            <Gui/>
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                <color attach="background" args={["#008000"]}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                <Draggable/>
                {/*相机控制器 */}
                <CameraControls ref={cameraControlRef} enabled={!draggable}/>
                {/*辅助线*/}
                <primitive object={new AxesHelper(20)}/>
                {/*加载房间*/}
                {/*<group*/}
                {/*    // onClick={(e) => {*/}
                {/*    // console.log('==开始捕获==');*/}
                {/*    // console.log(e.object)*/}
                {/*    // e.stopPropagation();*/}
                {/*>*/}
                <group
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log('====点击内容====');
                        console.log(e.object.name);
                        Object.values(Goods).forEach((item) => {
                            const {name, id} = item;
                            if (e.object.name == id) {
                                // console.log('==名称==');
                                // console.log(name)
                                collect(name);
                            }
                        });
                    }}
                >
                    <GLBModel url="/bf.glb" position={[-6, 0, 0]}/>
                    {/*</group>*/}
                    {/*移动式输液架 */}
                    <GLBModel
                        // click={(e) => {
                        //     console.log('==输液架==')
                        //     console.log(e)
                        //     eventManager.emit(ActionMap.SYB_FZ1, ActionMap.SYB_FZ1);
                        // }}
                        url="/HL_SM_YiDongShiShuYeJia.glb"
                        position={[-6, 0, 0]}
                    />
                    {/*治疗车*/}
                    <GLBModel url="/HL_ZhiLiaoChe_BingFang.glb" position={[-6, 0, 0]}/>
                    {/*输液泵静态*/}
                    {/*<Draggable*/}
                    {/*    click={(e) => {*/}
                    {/*        console.log(ActionMap.SYB_SQ);*/}
                    {/*        eventManager.emit(ActionMap.SYB_SQ, ActionMap.SYB_SQ);*/}
                    {/*    }}*/}
                    {/*>*/}
                    <GLBModel
                        url="/HL_ShuYeBeng.glb"
                        // position={[1, 0.7315777257693641, 0.8779830113159199]}
                        position={[1, 0.7315777257693641, 0.8779830113159199]}
                        rotation={[0, Math.PI, 0]}
                        // name="输液泵"
                        name={Goods.SYB_JT.name}
                        click={(e) => {
                            // globalActorRef.send({type: 'START_DRAG', payload: e.object.name});
                            // console.log(`点击内容${Goods.SYB_JT.name}`);
                            // globalActorRef.send({type: 'START_DRAG', payload: Goods.SYB_JT.name});

                        }}
                    />
                    {/*</Draggable>*/}
                    {/*棉签*/}
                    <GLBModel
                        url="/HL_YiYongMianQianBaoZhuang.glb"
                        position={[1.2, 0.62, 0.8779830113159199]}
                        name={Goods.YYMQ.name}
                        // position={[-6, 0, 0]}
                        click={() => {
                            eventManager.emit("clickObjectA-2", "clickObjectA-2");
                        }}
                    />
                    {/*护士表*/}
                    {/*<Draggable>*/}
                    <GLBModel
                        url="/HL_SM_HuShiBiao.glb"
                        position={[1.2, 0.62, 0.7]}
                        click={() => {
                            eventManager.emit("clickObjectA-1", "clickObjectA-1");
                        }}
                        // position={[-6, 0, 0]}
                    />
                    {/*</Draggable>*/}
                    {/*吉尔碘*/}
                    <GLBModel
                        url="/HL_JiErDianXiaoDuYe.glb"
                        position={[1.3, 0.64, 0.8779830113159199]}
                        name={Goods.DF.name}
                        click={(e) => {
                            // console.log(e);
                            // console.log(e.object.name);
                            // console.log('模拟执行');
                            // eventManager.emit(ActionMap.AN_QR7);
                            // eventManager.emit(ActionMap.AN_DH);
                            // 阻止冒泡.
                            // eventManager.emit("confirmAction", "confirmAction");
                            // eventManager.emit("ObjectB");
                            // eventManager.emit("confirmAction");
                            // e.stopPropagation();
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
                            // eventManager.emit("clickObjectB", "clickObjectB");
                            // eventManager.emit("clickObjectA", "clickObjectA");
                            // e.stopPropagation();
                        }}
                    />
                    {/*输液泵动画*/}
                    <GLBModel
                        url="/HL_ShuYeBeng-DongHua.glb"
                        // position: [6.506, 1.006, 0.968],
                        position={[-6, 0, 0]}
                        // rotation={[0, Math.PI, 0]}
                        // animationName={INFUSION_PUMPS.CONNECT}
                        // animationName={"1.5少量液体滴入弯盘内"}
                        playOnce={true}
                        name={Goods.SYB_DH.name}
                        click={(e) => {
                            console.log(e.object.name);
                            // console.log('模拟执行');
                            // eventManager.emit(ActionMap.AN_QR7);
                            // eventManager.emit(ActionMap.AN_DH);
                            // 阻止冒泡.
                            // eventManager.emit("confirmAction", "confirmAction");
                            // eventManager.emit("clickObjectC", "clickObjectC");
                            // eventManager.emit("clickObjectB", "clickObjectB");
                            // eventManager.emit("confirmAction", "confirmAction");
                            // eventManager.emit("clickObjectB", "clickObjectB");
                            // eventManager.emit("clickObjectA", "clickObjectA");
                            // eventQueue.processNext();
                            // eventManager.emit("ObjectB");
                            // eventManager.emit("confirmAction");
                            // e.stopPropagation();
                        }}

                        // position={[-6, 0, 0]}
                    />
                    <GLBModel
                        url="/HL_ShuYeDan_ShuYeBeng.glb"
                        position={[0.77, 0.6, 0.8]}
                        rotation={[0, -Math.PI / 2, 0]}
                        name={Goods.SYB.name}
                        // position={[-6, 0, 0]}
                        click={(e) => {
                            // console.log(e);
                            // console.log(e.object.name);
                            // console.log('模拟执行');
                            // eventManager.emit(ActionMap.AN_QR7);
                            // eventManager.emit(ActionMap.AN_DH);
                            // 阻止冒泡.

                            // eventManager.emit("confirmAction");
                            // eventManager.emit("clickObjectB", "clickObjectB");
                            // eventManager.emit("clickObjectA", "clickObjectA");
                            // e.stopPropagation();
                        }}
                    />
                </group>
                <TestTAP/>
                {/*<Box/>*/}
                {/*TestTAP*/}
                {/*<mesh position={[-1.2, 0, 0]}>*/}
                {/*    <boxGeometry args={[1, 1, 1]}/>*/}
                {/*    <meshStandardMaterial color={"red"}/>*/}
                {/*</mesh>*/}
                {/*<mesh position={[1.2, 0, 0]}>*/}
                {/*    <boxGeometry args={[1, 1, 1]}/>*/}
                {/*    <meshStandardMaterial color={"blue"}/>*/}
                {/*</mesh>*/}
                {/*HDR */}
                <Environment files={'/qwantani_dusk_2_1k.hdr'}/>
                {/*拿取物品的悬浮层*/}
                {
                    player.hand.collectName != "" && <MouseFollowerLayout/>
                }
            </Canvas>
        </div>
    );
}

export default Nursing
