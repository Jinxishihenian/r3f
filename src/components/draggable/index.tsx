import {useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {GlobalMachineContext} from "../../machine";
import useBearStore from "../../zustand";
// TODO 测试功能,并不完善.
// 拖拽视图层.
const Draggable = (param) => {
    const [clones, setClones] = useState([]);
    // 目标初始位置. 
    // const targetPosition;
    const globalActorRef = GlobalMachineContext.useActorRef();
    // 拖拽层位置.
    const meshRef = useRef<any>();
    // 目标层位置.
    const targetRef = useRef<any>();
    // 是否正在拖拽.
    const [isDragging, setIsDragging] = useState(false);
    // 获取Threejs上下文.
    const {camera, raycaster, mouse, gl, scene} = useThree();
    // 固定距离.
    const fixedDistance = 1;

    // 用于拖拽的平面.
    const planeRef = useRef(new THREE.Plane());
    // 交点,用于更新位置.
    const intersectPoint = new THREE.Vector3();
    // 记录拖拽的偏移量.
    // const dragOffset = useRef(new THREE.Vector3());
    const offsetVector = new THREE.Vector3(
        // param?.position?.length > 0 ? param?.position[0] : 0,
        // param?.position?.length > 0 ? param?.position[1] : 0,
        // param?.position?.length > 0 ? param?.position[2] : 0,
        0, 0, 0
    ); // 偏移量
    // 鼠标拖拽事件监听
    const onPointerDown = (e) => {
        // console.log('==鼠标按下事件==拾取');
        // console.log(e.object)
        param?.click(e.object);
        e.stopPropagation();
        setIsDragging(true);
        // 获取鼠标点击位置的法向方向(与相机视线方向一致)
        const normal = new THREE.Vector3();
        camera.getWorldDirection(normal);
        // 定义拖拽平面,设置平面的位置为固定距离.
        planeRef.current.setFromNormalAndCoplanarPoint(normal, camera.position.clone().add(normal.multiplyScalar(fixedDistance)));
        // scene.orbitControls.enabled = false;
        // 发送事件并传值.
        globalActorRef.send({type: 'START_DRAG', payload: e.object.name});
        console.log('开始拖拽');
    }

    const onPointerUp = (e) => {
        console.log('鼠标抬起事件');
        e.stopPropagation();
        // 停止拖拽.
        // setIsDragging(false);
        // globalActorRef.send({type: 'STOP_DRAG'});
        console.log('停止拖拽');
    }
    useFrame(() => {
        if (isDragging) {
            // targetRef
            if (targetRef) {
                // console.log('测试位置获取');
                // console.log(targetRef.current.position)
                // targetRef.current.position;
            }
            // console.log('枯藤老树昏鸦')
            // console.log('动态检测');
            // console.log('开始更新')
            // console.log('信息1', meshRef.current);
            // console.log('信息2', meshRef.current?.position);
            // 使用 Raycaster 计算鼠标指向的位置.
            raycaster.setFromCamera(mouse, camera);
            raycaster.ray.intersectPlane(planeRef.current, intersectPoint);
            if (meshRef.current) {
                meshRef.current.position.copy(intersectPoint).add(offsetVector).add(new THREE.Vector3(0, -0.2, 0));
            }
            // 获取拖拽物体的方向向量.
            // const direction = new THREE.Vector3();
            // direction.subVectors(meshRef.current?.position, camera.position).normalize();

            // 计算新的位置,使物体始终保持固定位置.
            // const newPosition = new THREE.Vector3();
            // newPosition.copy(camera.position).add(direction.multiplyScalar(fixedDistance));

            // 更新物体位置.
            // meshRef.current.position.copy(newPosition);
        }
    });

    // return (
    //     <div>
    //         </div>
    // );
    /*return (
        <group>
            {/!*拖拽层*!/}
            <group
                ref={meshRef as any}
            >
                <mesh
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    position={[1, 1, 1]}
                >
                    <boxGeometry args={[0.1, 0.1, 0.1]}></boxGeometry>
                    <meshStandardMaterial color="orange"/>
                </mesh>
            </group>
        </group>
    );*/
    return (
        <group
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
        >
            {/*拖拽层(拷贝层)*/}
            <group ref={meshRef as any}>
                {clones.map((clone, index) => <primitive key={index} object={clone}/>)}
            </group>
            {/*group*/}
            {/*目标层*/}
            <group ref={targetRef as any} onClick={(event) => {
                console.log('==点击物品==');
                console.log(event.object)
                event.stopPropagation();
                // console.log('克隆一个吧');
                // 克隆一个.
                const clone = event.object.clone();
                // clone.position.copy(new THREE.Vector3(0, 0, 0));
                if (clones.length > 0) {
                    console.log('停止拖拽并,清理克隆物品');
                    setClones(() => []);
                    setIsDragging(false);
                    globalActorRef.send({type: 'STOP_DRAG'});
                } else {
                    setClones((prev) => [...prev, clone]);
                }
            }}>
                {param.children}
                {/*<mesh
                    position={[1, 1, 1]}
                >
                    <boxGeometry args={[0.1, 0.1, 0.1]}></boxGeometry>
                    <meshStandardMaterial color="orange"/>
                </mesh>*/}
            </group>

        </group>
    );
}

export default Draggable;