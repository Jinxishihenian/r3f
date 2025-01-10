// 播放器.
import useBearStore from "../zustand";
import {EventMapMovie, MovieType} from "../movie";
import {ActionMap} from "../const/events.ts";
import {useEffect, useRef} from "react";
import * as THREE from "three";

const useMovie = () => {
    // 所有需要操作的glb引用.
    const {animations, models} = useBearStore((state) => state);
    const modelsRef = useRef(models);
    const animationsRef = useRef(animations);
    // 获取事件.

    // 由事件兑换影视信息.
    // const movies = EventMapMovie[ActionMap.SYB_SQ];
    useEffect(() => {
        modelsRef.current = models;
        animationsRef.current = animations;
        console.log()
        console.log('==动画==')
        console.log(animations)
    }, [models, animations]);
    // 根据影视开始进行播放.
    // useEffect(() => {
    //
    //     if (models["输液泵"]) {
    //         models["输液泵"].position.set(0, 0, 0);
    //         console.log('222models222')
    //         console.log(models)
    //     }
    // }, [models]);

    // 还原场景信息(接收影视，还原场景).
    const restore = () => {
    }

    // 播放.
    const play = async (eventName) => {
        // console.log('影视播放')
        // console.log(movies);
        // 影视.
        const movieDescribes = EventMapMovie[eventName];
        // if (movieDescribes) {
        //     console.log('没有对应影视');
        // }
        // try {
        // 可能存在异步.
        for (const describe of movieDescribes) {
            // 播放.
            await movieActive(describe, models);
        }
        // } catch (e) {
        //     console.log('甭播放了嗷');
        // }

    };

    const movieActive = async (describe, models) => {
        // console.log('激活影视');
        // console.log(describe)
        // console.log(modelsRef.current)
        // TODO 此方法需要剥离.
        switch (describe.movieType) {
            case MovieType.CLICK_PICKUP:
                // console.log('点击拾取')
                // alert('点击拾取');
                console.log('点击事件');
                break;
            case MovieType.MOVE:
                // 移动位置方法.
                const mesh = modelsRef.current[describe.parameters.name];
                const position = describe.parameters.sceneState.objectStates.position;
                mesh.position.set(position[0], position[1], position[2]);
                break;
            case MovieType.MODEL_ANIMATION:
                console.log('全部信息');
                console.log(describe.parameters.name);
                const animations = animationsRef.current[describe.parameters.name];
                if (animations) {
                    const action = animations[describe.parameters.sceneState.objectStates.animation];
                    action?.getMixer().stopAllAction();
                    // console.log('开始播放');
                    // console.log(animations[describe.parameters.sceneState.objectStates.animation])
                    // animations[describe.parameters.sceneState.objectStates.animation].play();
                    action?.setLoop(THREE.LoopOnce, 1);
                    action!.clampWhenFinished = true;
                    action.play();
                }
                // console.log('播放排气动画');
                // console.log(animations)
                break;
            case MovieType.CAMERA_ANIMATION:
                break;
            default:
                break;
        }
    }

    return {play, restore};
}
export default useMovie;