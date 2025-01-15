// 播放器.
import useBearStore from "../zustand";
import {EventMapMovie, MovieType} from "../movie";
import {ActionMap} from "../const/events.ts";
import {useEffect, useRef} from "react";
import * as THREE from "three";
import Goods from "../const/goods.ts";

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
        // console.log()
        // console.log('==动画==')
        // console.log(animations)
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

    // 场景过滤至相应节点.
    const filtrate = () => {
        // 过滤物品变形(位移，旋转，透明).
        const arr2 = [
            // 物品名称,为唯一关键key,保证唯一.
            {
                'name': {}
            },
        ];

        // 过滤物品动画.
        const arr1 = [
            {
                'name': {}
            },
        ];

        // 包含物品同时出现位移于动画场景.

        // 拆分所有物品最终状态.
        // 返回当前帧.
        // 最终结果.
        const mapT = [
            {
                '物品a': '最终变形',
            },
            {
                '物品b': '最终变形',
            },
            // ...
        ];

        const mapA = [
            {
                '物品a': '最终动画',
            },
            {
                '物品b': '最终动画',
            },
            // ...
        ];
        return [];
    }

    // 还原场景信息(接收影视，还原场景).
    const restore = (history) => {

    }

    // 播放.
    const play = async (eventName) => {
        // console.log('影视播放')
        // console.log(movies);
        console.log('触发事件')
        console.log(eventName)
        // 影视.
        const movieDescribes = EventMapMovie[eventName];
        // console.log('影视层');
        // console.log(movieDescribes);
        // if (movieDescribes) {
        //     console.log('没有对应影视');
        // }
        // try {
        // 可能存在异步.
        for (const describe of movieDescribes) {
            // 播放.
            await movieActive(describe);
        }
        // } catch (e) {
        //     console.log('甭播放了嗷');
        // }

    };

    const movieActive = async (describe) => {
        // console.log('激活影视');
        // console.log(describe)
        // console.log(modelsRef.current)
        // console.log('==描述==');
        // console.log(describe)
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
                    console.log('1播放动画1');
                    console.log(describe.parameters.sceneState.objectStates.animation)
                    const action = animations[describe.parameters.sceneState.objectStates.animation];
                    action?.getMixer().stopAllAction();
                    // console.log('开始播放');
                    // console.log(animations[describe.parameters.sceneState.objectStates.animation])
                    // animations[describe.parameters.sceneState.objectStates.animation].play();
                    action?.setLoop(THREE.LoopOnce, 1);
                    action!.clampWhenFinished = true;
                    action.play();
                    // setTimeout(() => {
                    //     // 停止所有动画
                    //     console.log('停止所有动画');
                    //     action?.getMixer().stopAllAction();
                    // }, 10000);
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

    // 动画还原到最终状态.
    const restA = () => {
        // models.forE
        // Object.values(modelsRef.current).forEach((item) => {
        //     console.log('item');
        //     console.log(item)
        // });
        // 输液泵_动画
        console.log('输液泵_动画');
        console.log(modelsRef.current[Goods.SYB_DH.name])
        // const mesh = modelsRef.current[Goods.SYB_DH.name];
        // mesh.position.set(0, 0, 0);  // 恢复位置
        // mesh.rotation.set(0, 0, 0);  // 恢复旋转
        // mesh.scale.set(1, 1, 1);     // 恢复缩放

    }

    return {play, restore, movieActive, restA};
}
export default useMovie;