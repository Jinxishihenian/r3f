import {useEffect, useRef} from "react";
import {useThree, useFrame} from "@react-three/fiber";
// import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import useBearStore from "../../zustand";
import Goods from "../../const/goods.ts";
import {GlobalMachineContext} from "../../machine";
// 该组件原理就是,从相机方向发射一条射线,命中与相机平行的面的交点即使,拖拽物品的位置.
const MouseFollowerLayout = () => {
    const {animations, models} = useBearStore((state) => state);
    const player = GlobalMachineContext.useSelector((state) => state?.context?.player);
    const modelsRef = useRef(models);
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
    // 相机法线.
    const normal = new THREE.Vector3();
    useEffect(() => {
        console.log('player');
        console.log(player);
        // modelsRef.current =
    }, [player.hand.collectName]);
    useEffect(() => {
        // camera.getWorldDirection(normal);
        // 设置新平面.
        // planeRef.current.setFromNormalAndCoplanarPoint(normal, camera.position.clone().add(normal.multiplyScalar(2)));
        // modelsRef
        modelsRef.current = models;
        // console.log('==获取的模型==')
        // console.log(models)
        // console.log(modelsRef.current[Goods.SYB_JT.name])
    }, [models]);

    useFrame(() => {
        camera.getWorldDirection(normal);
        // 设置新平面.
        planeRef.current.setFromNormalAndCoplanarPoint(normal, camera.position.clone().add(normal.multiplyScalar(0.5)));
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(planeRef.current, intersectPoint);
        if (meshRef.current) {
            meshRef.current.position.copy(intersectPoint).add(new THREE.Vector3(0, -0.2, 0));
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

            {/*替换为当前选中模型.*/}
            {
                Object.keys(modelsRef.current).length == 0 || player.hand.collectName == "" ?
                    <mesh ref={meshRef} position={[1, 1, 1]}>
                        {/*创建正方体几何体*/}
                        <boxGeometry args={[0.4, 0.4, 0.4]}/>
                        {/*添加基础材质 */}
                        <meshStandardMaterial color="skyblue"/>
                    </mesh> :
                    <primitive ref={meshRef} object={modelsRef.current[player.hand.collectName]?.clone()}/>
                // <group></group>
            }

        </group>
    )
}

export default MouseFollowerLayout;