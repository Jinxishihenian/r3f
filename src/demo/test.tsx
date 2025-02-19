import {useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from 'three';
import {AxesHelper} from "three";
import Goods from "../const/goods.ts";
import useBearStore from "../zustand";

const TestTAP = () => {
    const {models} = useBearStore((state) => state);
    const meshRef2 = useRef<any>(models);
    const initPosition = [0, 0, 0];
    const [quaternion, setQuaternion] = useState();
    // const [clicked, setClicked] = useState(true)
    const clicked = useRef(true);
    const {camera, raycaster, mouse} = useThree();
    const distance = 2;
    const offsetX = 0.7;
    const [position, setPosition] = useState<any>({
        'positionA': [-1.2, 1, 1],
        'positionB': [1.2, 0, 0],
    });
    const meshRef = useRef();
    // 4×4矩阵
    const rotationMatrix = new THREE.Matrix4();
    // 四元数.
    const targetQuaternion = new THREE.Quaternion();
    // 位置.
    const positionEnd = new THREE.Vector3();
    // useFrame(() => {
    //     if (meshRef.current) {
    // console.log('每帧更新');
    // meshRef.current?.quaternion.rotateTowards(targetQuaternion, 2);
    // meshRef.current?.position.copy(positionEnd);
    // meshRef.current?.quaternion.rotateTowards(targetQuaternion, 0.1);
    // meshRef.current?.position.copy(positionEnd);
    // meshRef.current?.position.lerp(positionEnd, 0.1);
    // }
    // });
    useEffect(() => {
        // console.log('四元数记录', meshRef.current.quaternion);
        // 四元数.
        // setQuaternion(meshRef.current.quaternion.clone());
    }, []);
    useEffect(() => {
        // camera.getWorldDirection(normal);
        // 设置新平面.
        // planeRef.current.setFromNormalAndCoplanarPoint(normal, camera.position.clone().add(normal.multiplyScalar(2)));
        // modelsRef
        meshRef2.current = models;
        console.log('==models信息==');
        console.log(models)
        // console.log('==获取的模型==')
        // console.log(models)
        // console.log(modelsRef.current[Goods.SYB_JT.name])
    }, [models]);
    return (
        <group
            onClick={(e) => {
                e.stopPropagation();
                // setClicked(!clicked);
                clicked.current = !clicked.current;
                if (clicked.current) {
                    const old = meshRef2.current[Goods.SYB.name].clone();
                    meshRef.current.position.copy(old.position);
                    meshRef.current.quaternion.copy(old.quaternion);
                    console.log('位置还原');
                    console.log(quaternion)
                    return;
                }
                // if (!clicked) {
                //     const old = meshRef2.current[Goods.SYB.name].clone();
                //     meshRef.current.position.copy(old.position);
                //     meshRef.current.quaternion.copy(old.quaternion);
                //     console.log('位置还原');
                //     console.log(quaternion)
                //     return;
                // }
                const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
                const position = camera.position.clone().add(cameraDirection.multiplyScalar(0.24));
                positionEnd.copy(position);
                if (meshRef.current) {
                    meshRef.current.position.copy(positionEnd);
                    rotationMatrix.lookAt(camera.position, meshRef.current?.position, meshRef.current?.up);
                    // 保存变化.
                    targetQuaternion.setFromRotationMatrix(rotationMatrix);
                    meshRef.current.quaternion.copy(targetQuaternion);
                }
            }}
        >
            {
                Object.keys(meshRef2.current).length <= 0 ?
                    <mesh></mesh> :
                    <primitive ref={meshRef} position={[0, 0, 0]} object={meshRef2.current[Goods.SYB.name]?.clone()}/>
            }
            {/*<primitive object={new AxesHelper(1)}/>*/}
        </group>

    );
    return (
        // <group>
        <mesh
            ref={meshRef as any}
            // position={position['positionA']}
            onClick={(e) => {
                e.stopPropagation();
                // setClicked(!clicked);
                if (clicked) {
                    meshRef.current.position.copy(new THREE.Vector3(0, 0, 0));
                    meshRef.current.quaternion.copy(quaternion);
                    console.log('位置还原');
                    console.log(quaternion)
                    return;
                }
                console.log('==点击红色==');
                console.log(meshRef.current?.position);
                console.log(meshRef.current?.up)
                // return;

                // return;
                const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
                // const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
                // const positionA = camera.position.clone().add(cameraDirection.multiplyScalar(distance - offsetX / 2));
                const position = camera.position.clone().add(cameraDirection.multiplyScalar(2));
                positionEnd.copy(position);
                // meshRef.current?.quaternion.copy(targetQuaternion);
                // meshRef.current?.position.copy(positionEnd);
                // 直接应用旋转和位置更新
                if (meshRef.current) {
                    meshRef.current.position.copy(positionEnd);
                    rotationMatrix.lookAt(camera.position, meshRef.current?.position, meshRef.current?.up);
                    // 保存变化.
                    targetQuaternion.setFromRotationMatrix(rotationMatrix);
                    meshRef.current.quaternion.copy(targetQuaternion);
                }

                // const positionB = camera.position.clone().add(cameraDirection.multiplyScalar(distance + offsetX / 2));
                // const positionB = camera.position.clone().add(cameraDirection.multiplyScalar(1.2));

                // const positionA = position.clone().add(new THREE.Vector3(-offsetX, 0, 0)); // 使模型B在模型A的右边
                // const positionB = position.clone().add(new THREE.Vector3(+offsetX, 0, 0)); // 使模型B在模型A的右边
                // setPosition({
                //     'positionA': position,
                //     'positionB': position,
                // });

            }}
        >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={"#E0FFFF"}/>
            {/*辅助线*/}
            {/*<primitive object={new AxesHelper(1)}/>*/}
        </mesh>
        // <mesh position={position['positionB']}>
        //     <boxGeometry args={[0.3, 0.2, 0.3]}/>
        //     <meshStandardMaterial color={"blue"}/>
        // </mesh>
        // <primitive object={new AxesHelper(1)}/>
        // </group>
    )
}
export default TestTAP;