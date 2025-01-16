import {useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from 'three';
import {AxesHelper} from "three";

const TestTAP = () => {
    const [clicked, setClicked] = useState(false)
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
    return (
        // <group>
        <mesh
            ref={meshRef as any}
            // position={position['positionA']}
            onClick={(e) => {
                e.stopPropagation();
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
            {/*<primitive object={new AxesHelper(0.3)}/>*/}
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