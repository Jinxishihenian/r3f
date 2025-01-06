import {ActionMap} from "../action/const.ts";

type Movie = {
    movieType: MovieType,
    parameters: any,
}
const movie: Movie = {
    movieType: MovieType.MOVE,
    parameters: {},
}

// 影视类型.
enum MovieType {
    // 位移(跳步部分).
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
const play = {
    [ActionMap.SYB_SQ]: [
        {
            movieType: MovieType.MOVE,
            parameters: {},
        },
        {
            movieType: MovieType.CAMERA_ANIMATION,
            parameters: {},
        }
    ],
    // ......
};

export {play, MovieType}