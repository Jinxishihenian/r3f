import {Outlines, useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
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

function GLBModel({url, animationName, playOnce, click, ...props}) {
    const {scene, animations} = useGLTF(url); // 使用 useGLTF 加载 .glb 模型
    // 使用动画.
    const {actions, mixer} = useAnimations(animations, scene);
    const group = useRef();
    const [selected, setSelected] = useState(null);
    const handleClick = (event) => {
        const clickedObject = event.object;
        console.log('Clicked on:', clickedObject.name);
        click && click(event);
        // 设置被选中的对象
        console.log('高亮内容:')
        console.log(clickedObject)
        setSelected(clickedObject);
    };
    useEffect(() => {
        // 是否可播放.
        if (!(animations && actions[animationName])) {
            return;
        }
        const action = actions[animationName];
        // 播放一次且停留在最后一帧.
        if (playOnce) {
            // console.log('播放一次');
            action?.setLoop(THREE.LoopOnce, 1);
            action!.clampWhenFinished = true;
            // mixer.addEventListener('finished', () => {
            //     action?.stop();
            // });
            action?.play();
        } else {
            action?.play();
        }

    }, []);
    return (
        <group ref={group as any} {...props} onClick={click && handleClick}>
            <primitive object={scene}/>
            <EffectComposer>
                {selected && <Outline
                    // visibleEdgeColor={'#DC143C'}
                  selection={[selected]}
                  edgeStrength={10} // 边缘强度
                  pulseSpeed={0} // 边缘闪烁速度
                  visibleEdgeColor={"#DC143C"} // 可见边缘颜色
                  hiddenEdgeColor={"#DC143C"} // 隐藏边缘颜色
                />}
            </EffectComposer>
        </group>
    );
    // return ;
}

export default GLBModel;

