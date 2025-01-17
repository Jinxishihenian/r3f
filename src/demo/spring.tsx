import {useSpring} from '@react-spring/core'
import {a} from '@react-spring/three'


import {useState} from "react";

function Box(props) {
    const min = 1;
    const max = 9;

// 生成随机数的函数
    const getRandomValue = () => Math.floor(Math.random() * (max - min + 1)) + min;

    const [scaleRange, setScaleRange] = useState<any>([0, 5]);
    const [active, setActive] = useState(0)

    const {spring} = useSpring({
        spring: active,
        config: {mass: 5, tension: 400, friction: 50, precision: 0.0001}
    })

    // interpolate values from commong spring
    const scale = spring.to([0, 1], scaleRange)
    const rotation = spring.to([0, 1], [0, Math.PI])
    const color = spring.to([0, 1], ['#6246ea', '#e45858'])

    return (
        <a.group
            position-x={9}
            position-y={scale}
            onClick={(e) => {
                console.log('动画效果');
                // 点击时生成新的随机范围
                const reuslt = getRandomValue();
                console.log('===reuslt===');
                console.log(reuslt);
                setScaleRange([0, reuslt]);
            }}
        >
            <a.mesh onClick={() => setActive(Number(!active))}>
                <boxGeometry attach="geometry" args={[1, 1, 1]}/>
                <a.meshStandardMaterial roughness={0.5} attach="material"/>
            </a.mesh>
        </a.group>
    )
}

export default Box