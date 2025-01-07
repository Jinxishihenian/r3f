// type StepsType = {
//     // 步骤.
//     [key: string]: {
//         // 子步骤.
//         children: StepsType[],
//         // 状态.
//         states: {
//             [key: string]: {
//                 // 是否运行中.
//                 running?: boolean,
//                 // 动作是否有顺序.
//                 actionsOrderly: boolean,
//                 // 动作.
//                 actions?: {
//                     // 描述.
//                     describe: string,
//                     // 行为状态.
//                     behaviorStatus?: BehaviorStatus,
//                 }[],
//             },
//         },
//     },
// }
// 上下文.
import {ActionMap} from "../const/events.ts";
import {setup, assign} from 'xstate';
import {createActorContext} from "@xstate/react";
// 步骤状态.
const StepsStatus = {
    // 未开始.
    UnStart: "未开始",
    // 进行中.
    Running: "进行中",
    // 已完成.
    Finished: "已完成",
}
// 行为状态.
const BehaviorStatus = {
    // 未开始.
    UnStart: "未开始",
    // 进行中.
    Running: "进行中",
    // 已完成.
    Finished: "已完成",
    // 已失败.
    Failed: "已失败",
}
// 事件无状态(由事件管理系统与事件队列管理).

const step: any = {
    // 步骤.
    "1": {
        children: {
            // 行为.
            "1-1": {
                behaviorStatus: BehaviorStatus.Running,
                // 动作
                events: [ActionMap.SYB_SQ, ActionMap.SYB_FZ1],
            }
        },
        stepsStatus: StepsStatus.Running,
    },
    "2": {
        children: {
            "2-1": {
                behaviorStatus: BehaviorStatus.UnStart,
                events: [ActionMap.SYQ_Dj1, ActionMap.ANT_QR1, ActionMap.ANT_QR2, ActionMap.AN_QR3],
            }
        },
        stepsStatus: StepsStatus.UnStart,
    },
    "3":
        {
            children: {
                "3-1": {
                    behaviorStatus: BehaviorStatus.UnStart,
                    events: [ActionMap.SYQ_DJ2, ActionMap.AN_QR4],
                }
            },
            stepsStatus: StepsStatus.UnStart,
        },
    "4": {
        children: {
            "4-1": {
                behaviorStatus: BehaviorStatus.UnStart,
                events: [ActionMap.LZZ_CK1, ActionMap.AN_QR5],
            },
            "4-2": {
                behaviorStatus: BehaviorStatus.UnStart,
                events: [ActionMap.MQ_SQ, ActionMap.JED_ZQ, ActionMap.AN_QR6],
            }
        },
        stepsStatus:
        StepsStatus.UnStart,
    },
    "5":
        {
            children: {
                "5-1": {
                    behaviorStatus: BehaviorStatus.UnStart,
                    events: [
                        ActionMap.LZZ_CK2,
                        ActionMap.AN_QR7,
                    ],
                },
                "5-2": {
                    behaviorStatus: BehaviorStatus.UnStart,
                    events: [
                        ActionMap.SYQ_SQ,
                        ActionMap.LZZ_LJ,
                        ActionMap.AN_QR8,
                    ],
                }
            },
            stepsStatus:
            StepsStatus.UnStart,
        },
    "6":
        {
            children: {
                "6-1": {
                    behaviorStatus: BehaviorStatus.UnStart,
                    events: [
                        ActionMap.SYB_DJ1,
                        ActionMap.SYB_YZ,
                        ActionMap.SYB_DS,
                        ActionMap.AN_SYB,
                    ],
                },
                "6-2": {
                    behaviorStatus: BehaviorStatus.UnStart,
                    events: [
                        ActionMap.SYB_DJ2,
                        ActionMap.SYB_KP,
                        ActionMap.AN_QR9,
                    ],
                }
            },
            stepsStatus:
            StepsStatus.UnStart,
        },
    "7": {
        children: {
            "7-1": {
                behaviorStatus: BehaviorStatus.UnStart,
                events: [
                    ActionMap.DZP_DJ1,
                    ActionMap.AN_QR10,
                    ActionMap.WD_Dj1,
                    ActionMap.AN_QR11,
                    ActionMap.DH_SJ,
                    ActionMap.AN_DH,
                    ActionMap.SYD_DJ,
                    ActionMap.AN_QR,
                ],
            }
        },
        stepsStatus:
        StepsStatus.UnStart,
    },
    "8":
        {
            children: {
                "8-1": {
                    behaviorStatus: BehaviorStatus.UnStart,
                    events: [
                        ActionMap.SYQ_DJ3,
                        ActionMap.LZZ_CK3,
                        ActionMap.AN_QR12,
                    ],
                },
                "8-2": {
                    behaviorStatus: BehaviorStatus.UnStart,
                    events: [
                        ActionMap.HSB_SQ,
                        ActionMap.SYB_DJ3,
                        ActionMap.SYB_TZ,
                        ActionMap.AN_QR13,
                    ],
                }
            },
            stepsStatus:
            StepsStatus.UnStart
        }
}


const machine = setup({
    types: {
        context: {} as any,
        events: {} as { type: 'COMPLETE' } | { type: 'FAIL' }

    },
    actions: {} as any,
}).createMachine({
    initial: "进行中",
    context: {
        info: {
            step: step,
            currentStepId: "1", // 当前激活的步骤
            currentSubTaskId: "1-1", // 当前运行的行为.
        },
        index: 0,
        // 拖拽状态上下文.
        draggable: false,
        // 锁屏状态上下文.
    },
    states: {
        // 最小单位为行为.
        "进行中": {
            on: {
                // 当前行为完成(事件).
                COMPLETE: {
                    actions: assign({
                        info: ({context, event}) => {
                            // console.log('原本信息');
                            // console.log(context1)
                            const {info: context1} = context;
                            // console.log('上下文');
                            // console.log(context1)

                            // 当前行为索引.
                            const currentBehaviorId = context1.currentSubTaskId;
                            // 下一步行为索引.
                            const nextBehaviorId = incrementLastNumberInString(currentBehaviorId);
                            // 当前步骤索引.
                            const currentStepId = context1.currentStepId;
                            // 下一步步骤索引.
                            const nextStepId = incrementLastNumberInString(currentStepId);

                            // 将当前行为状态设置为已完成.
                            context1.step[currentStepId].children[currentBehaviorId].behaviorStatus = BehaviorStatus.Finished;
                            // 判断是否有下一个行为.
                            if (context1.step[currentStepId].children[nextBehaviorId]) {
                                // 设置下一个行为为当前行为.
                                context1.currentSubTaskId = nextBehaviorId;
                                // 将下一个行为设置进行中.
                                context1.step[currentStepId].children[nextBehaviorId].behaviorStatus = BehaviorStatus.Running;
                            } else {
                                // 将当前步骤设置为已完成.
                                context1.step[currentStepId].stepsStatus = StepsStatus.Finished;
                                // 判断是否有下一个步骤.
                                if (context1.step[nextStepId]) {
                                    // 将下一个步骤设置为进行中.
                                    context1.step[nextStepId].stepsStatus = StepsStatus.Running;
                                    // 设置下一个步骤为当前步骤.
                                    context1.currentStepId = nextStepId;
                                    // 设置下一个步骤的第一个子任务为进行中.
                                    const firstSubTask = Object.keys(context1.step[nextStepId].children)[0];
                                    context1.step[nextStepId].children[firstSubTask].behaviorStatus = BehaviorStatus.Running;
                                    context1.currentSubTaskId = firstSubTask;
                                } else {
                                    // console.log("全部完成啦");
                                }
                            }
                            // console.log('新的信息');
                            // console.log(context1);
                            return {
                                step: context1.step,
                                currentStepId: context1.currentStepId, // 当前激活的步骤
                                currentSubTaskId: context1.currentSubTaskId, // 当前运行的行为.
                            };
                        },
                        index: ({context, event}) => {
                            return 2;
                        }
                    }),
                },
                // 行为失败(事件,暂不处理).
                FAIL: assign({
                    context: (context, event) => {
                    }
                }),
                // 启用物品拖拽.
                START_DRAG: {
                    actions: assign({
                        draggable: true,
                    })

                },
                // 关闭物品拖拽.
                STOP_DRAG: {
                    actions: assign({
                        draggable: false,
                    })
                },
                // 'TEST': {
                //     actions: 'aa'
                // }
            },
        }
    },
});

const GlobalMachineContext = createActorContext(machine);
// const machine


// 动作已由事件队列代替管理.
// 已由事件队列代替管理.
// const enum BehaviorStatus {
//     // 未开始.
//     UnStart,
//     // 进行中.
//     Running,
//     // 已完成.
//     Finished,
//     // 已失败.
//     Failed,
// }
function incrementLastNumberInString(str) {
    // 使用正则表达式查找字符串中的最后一个数字
    const match = str.match(/(\d+)(?!.*\d)/);

    if (!match) {
        throw new Error('No numbers found in the string.');
    }

    const lastNumber = match[0]; // 提取最后一个数字
    const incrementedNumber = parseInt(lastNumber, 10) + 1; // 将数字 +1

    // 使用替换将字符串中的最后一个数字替换为加 1 后的数字
    const result = str.replace(new RegExp(`${lastNumber}(?!.*\\d)`), incrementedNumber);

    return result;
}

export {StepsStatus, BehaviorStatus, GlobalMachineContext, step};