import {ActionMap} from "../const/events.ts";
import Goods from "../const/goods.ts";
import {INFUSION_PUMPS} from "../const/animation.ts";

type Movie = {
    movieType: MovieType,
    parameters: any,
}
// 类型.
// const movie: Movie = {
//     movieType: MovieType.MOVE,
//     parameters: {},
// }

// 影视类型.
enum MovieType {
    // 点击拾取.
    CLICK_PICKUP,
    // 位移(跳步部分).
    // TRANSFIGURATION
    MOVE,
    // 模型动画(跳步部分).
    MODEL_ANIMATION,
    // 镜头动画.
    CAMERA_ANIMATION,
    // 镜头还原动画.
    CAMERA_RESTORE_ANIMATION,
    // 输液单校对动画1.
    LIQUID_CALIBRATION_ANIMATION1,
    // 输液单校对动画2.
    LIQUID_CALIBRATION_ANIMATION2,
    // 输液单校对动画3.
    LIQUID_CALIBRATION_ANIMATION3,
    // 人物对话.
    CHARACTER_TALK,
    // 拾取.
    PICKUP,
    // 合成(组合).
    COMBINE,
    // 显示物品.
    SHOW_ITEM,
    // 隐藏物品.
    parameters
}

// 根据对应动作播放对应动画.
// 暂未启用(负责历史记录).
// 事件映射影视.
const EventMapMovie = {
    // 场景初始化.
    // 缺少一个初始化.
    // 步骤1.
    [ActionMap.SYB_SQ]: [
        {
            movieType: MovieType.CLICK_PICKUP,
            parameters: {
                sessionId: "",
                name: Goods.SYB_JT.name,
                form: "",
                to: "",
                timestamp: "",
                sceneState: {
                    objectStates: {
                        position: [0.5, 2, 1],
                        rotation: [],
                    }
                },
            },
        },
        // {
        //     movieType: MovieType.CAMERA_ANIMATION,
        //     parameters: {},
        // }
    ],
    [ActionMap.SYB_FZ1]: [
        {
            movieType: MovieType.MOVE,
            parameters: {
                sessionId: "",
                name: Goods.SYB_JT.name,
                form: "",
                to: "",
                timestamp: "",
                sceneState: {
                    objectStates: {
                        position: [0.5, 0.7, 1],
                        rotation: [],
                    }
                },
            },
        },
        // {
        //     movieType: MovieType.CAMERA_ANIMATION,
        //     parameters: {},
        // }
    ],
    // 步骤2.
    [ActionMap.SYQ_Dj1]: [
        {
            movieType: MovieType.MODEL_ANIMATION,
            parameters: {
                sessionId: "",
                name: Goods.SYB_DH.name,
                form: "",
                to: "",
                timestamp: "",
                sceneState: {
                    objectStates: {
                        animation: INFUSION_PUMPS.PQ,
                        position: [0.5, 0.7, 1],
                        rotation: [],
                    }
                },
            },
        },
    ],
    [ActionMap.ANT_QR1]: [
        {movieType: MovieType.CLICK_PICKUP},
    ],
    [ActionMap.ANT_QR2]: [
        {movieType: MovieType.CLICK_PICKUP},
    ],
    [ActionMap.AN_QR3]: [
        {
            movieType: MovieType.MODEL_ANIMATION,
            parameters: {
                sessionId: "",
                name: Goods.SYB_DH.name,
                form: "",
                to: "",
                timestamp: "",
                sceneState: {
                    objectStates: {
                        animation: INFUSION_PUMPS.WAIBAOZ,
                        position: [0.5, 0.7, 1],
                        rotation: [],
                    }
                },
            },
        },
    ],
    // 步骤3.
    [ActionMap.SYQ_DJ2]: [],
    [ActionMap.AN_QR4]: [],
    // 步骤4.
    [ActionMap.LZZ_CK1]: [],
    [ActionMap.AN_QR5]: [],
    [ActionMap.MQ_SQ]: [],
    [ActionMap.JED_ZQ]: [],
    [ActionMap.AN_QR6]: [],
    // 步骤5.
    [ActionMap.LZZ_CK2]: [],
    [ActionMap.AN_QR7]: [],
    [ActionMap.SYQ_SQ]: [],
    [ActionMap.LZZ_LJ]: [],
    [ActionMap.AN_QR8]: [],
    // 步骤6.
    [ActionMap.SYB_DJ1]: [],
    [ActionMap.SYB_YZ]: [],
    [ActionMap.SYB_DS]: [],
    [ActionMap.AN_SYB]: [],
    [ActionMap.SYB_DJ2]: [],
    [ActionMap.SYB_KP]: [],
    [ActionMap.AN_QR9]: [],
    // 步骤7.
    [ActionMap.DZP_DJ1]: [],
    [ActionMap.AN_QR10]: [],
    [ActionMap.WD_Dj1]: [],
    [ActionMap.AN_QR11]: [],
    [ActionMap.DH_SJ]: [],
    [ActionMap.AN_DH]: [],
    [ActionMap.SYD_DJ]: [],
    [ActionMap.AN_QR]: [],
    // 步骤8.
    [ActionMap.SYQ_DJ3]: [],
    [ActionMap.LZZ_CK3]: [],
    [ActionMap.AN_QR12]: [],
    [ActionMap.HSB_SQ]: [],
    [ActionMap.SYB_DJ3]: [],
    [ActionMap.SYB_TZ]: [],
    [ActionMap.AN_QR13]: [],
    [ActionMap.LZZ_CK4]: [],
    [ActionMap.AN_QR14]: [],
};

export {EventMapMovie, MovieType}