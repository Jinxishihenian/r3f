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
    // const handleClick = (event) => {
    //     const clickedObject = event.object;
    //     console.log('Clicked on:', clickedObject.name);
    //     click && click(event);
    // };
    useEffect(() => {
        // console.log('==actions==');
        // console.log(actions)
        // callback(actions);
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
            //     event?.stop();
            // });
            action?.play();
            // if (animations.length == 31) {
            //     console.log("输液泵动画");
            //     mixer.addEventListener("finished", (e) => {
            //         // if (e.event === actionA) {
            //         //     // 播放 B 动画
            //         //     actionB.reset().play();
            //         // }
            //         console.log('播放完成');
            //         // const randomElement = animations[Math.floor(Math.random() * animations.length)];
            //         const keys = Object.keys(actions);
            //         const randomKeys = keys[Math.floor(Math.random() * keys.length)];
            //         const randomElement = actions[randomKeys];
            //         // const randomElement1 =actions[Math.floor(Math.random() * actions.length)];
            //         console.log('==对比==')
            //         console.log(randomElement)
            //         console.log(actions['2.3安装输液管路'])
            //         // actions['2.3安装输液管路']?.reset().play();
            //         actions['2.3安装输液管路']?.reset().play();
            //     });
            // }
        } else {
            action?.play();
        }

    }, []);
    return (
        <group
            ref={group as any}
            {...props}
            // onClick={(event) => {
            //     click && handleClick(event);
            // }}
            onClick={click}
        >
            <primitive object={scene}/>
        </group>
    );
    // return ;
}

export default GLBModel;
