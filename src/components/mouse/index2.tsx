import {useEffect, useRef} from "react";
import {useThree, useFrame} from "@react-three/fiber";
// import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";

const MouseFollowerLayout = () => {
    // 获取改模型.
    // 监听模型替换.
    // 拖拽层.
    const meshRef = useRef<any>();
    // 操作平面.
    const planeRef = useRef(new THREE.Plane());
    // 获取Threejs上下文.
    const {camera, raycaster, mouse} = useThree();
    // 交点,用于更新位置.
    const intersectPoint = new THREE.Vector3();

    useEffect(() => {
        // 相机法线.
        const normal = new THREE.Vector3();
        camera.getWorldDirection(normal);
        // 设置新平面.
        planeRef.current.setFromNormalAndCoplanarPoint(normal, camera.position.clone().add(normal.multiplyScalar(2)));
    }, []);

    useFrame(() => {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(planeRef.current, intersectPoint);
        if (meshRef.current) {
            meshRef.current.position.copy(intersectPoint).add(new THREE.Vector3(0, -0.4, 0));
            console.log('问君能有几多愁');
        }
    });

    return (
        <group
            // 模型移动.
            // onPointerDown={() => {
            // }}
            //
            // onPointerUp={() => {
            // }}
        >
            {/*模型移动 */}
            <mesh ref={meshRef} position={[1, 1, 1]}>
                {/*创建正方体几何体*/}
                <boxGeometry args={[0.4, 0.4, 0.4]}/>
                {/*添加基础材质 */}
                <meshStandardMaterial color="skyblue"/>
            </mesh>
            {/*替换为当前选中模型.*/}

        </group>
    )
}

export default MouseFollowerLayout;