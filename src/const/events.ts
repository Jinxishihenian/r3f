// 动作描述.
const ActionMap = {
    // 初始化事件.
    INIT: "场景初始化",
    SYB_SQ: "拾取-输液泵",
    SYB_FZ1: "放置-输液泵(放置至输液架)",
    SYQ_Dj1: "点击-输液器(排气)",
    ANT_QR1: "点击-按钮(打开输液器)",
    ANT_QR2: "点击-按钮(关闭输液器)",
    AN_QR3: "点击-按钮(输液器末端放置输液器外包装内)",
    SYQ_DJ2: "点击-输液器(拾取)",
    AN_QR4: "点击-按钮(输液器末端放置输液器外包装内)",
    LZZ_CK1: "点击-留置针(打开留置针,取下胶布)",
    AN_QR5: "点击-按钮(打开留置针,取下胶布)",
    MQ_SQ: "拾取-棉签",
    JED_ZQ: "蘸取-吉尔碘消毒液",
    AN_QR6: "点击-按钮(吉尔碘消毒)",
    LZZ_CK2: "点击-留置针(评估)",
    AN_QR7: "点击-按钮(评估留置针)",
    SYQ_SQ: "拾取-输液器",
    LZZ_LJ: "点击-留置针(连接)",
    AN_QR8: "点击-按钮(连接留置针)",
    SYB_DJ1: "点击-输液泵(视角锁定)",
    SYB_YZ: "点击-预制",
    SYB_DS: "点击-滴数",
    AN_SYB: "点击-按钮(设置输液泵参数)",
    SYB_DJ2: "点击-输液泵(打开调节器)",
    SYB_KP: "点击-快排",
    AN_QR9: "点击-按钮(快排,在此步骤假设将输液泵还原到桌子上)",
    DZP_DJ1: "点击-电子屏",
    AN_QR10: "点击-电子屏(确认)",
    WD_Dj1: "点击-腕带(核对输液单信息)",
    AN_QR11: "点击-按钮(核对患者信息)",
    DH_SJ: "点击-对话()",
    AN_DH: "点击-按钮(对话结束)",
    SYD_DJ: "点击-输液单(核对)",
    AN_QR: "点击-按钮(输液单)",
    SYQ_DJ3: "点击-输液器(拾取)",
    LZZ_CK3: "点击-留置针(链接)",
    AN_QR12: "点击-按钮(连接留置针)",
    HSB_SQ: "点击-护士表拾取",
    SYB_DJ3: "点击-输液泵(核对)",
    SYB_TZ: "点击-输液泵(停止)",
    AN_QR13: "点击-按钮(停止)",
    LZZ_CK4: "点击-留置针(观察)",
    AN_QR14: "点击-按钮",
}

// 行为描述.
// const BehaviorMap = {
//     // 固定输液器.
//     1: {
//         '1-1': [ActionMap.SYB_SQ, ActionMap.SYB_FZ1],
//     },
//     // 排气.
//     2: {
//         '2-1': [ActionMap.SYQ_Dj1, ActionMap.ANT_QR1, ActionMap.ANT_QR2, ActionMap.AN_QR3],
//     },
//     // 固定输液器.
//     3: {
//         '3-1': [ActionMap.SYQ_DJ2, ActionMap.AN_QR4],
//     },
//     // 消毒留置针正压接口.
//     4: {
//         '4-1': [ActionMap.LZZ_CK1, ActionMap.AN_QR5],
//         '4-2': [ActionMap.MQ_SQ, ActionMap.JED_ZQ, ActionMap.AN_QR6],
//     },
//     // 评估留置针.
//     5: {
//         '5-1': [
//             ActionMap.LZZ_CK2,
//             ActionMap.AN_QR7,
//         ],
//         '5-2': [
//             ActionMap.SYQ_SQ,
//             ActionMap.LZZ_LJ,
//             ActionMap.AN_QR8,
//         ],
//     },
//     // 设置输液泵参数并排气.
//     6: {
//         '6-1': [
//             ActionMap.SYB_DJ1,
//             ActionMap.SYB_YZ,
//             ActionMap.SYB_DS,
//             ActionMap.AN_SYB,
//         ],
//         '6-2': [
//             ActionMap.SYB_DJ2,
//             ActionMap.SYB_KP,
//             ActionMap.AN_QR9,
//         ],
//     },
//     // 操作中核对患者信息.
//     7: {
//         '7-1': [
//             ActionMap.DZP_DJ1,
//             ActionMap.AN_QR10,
//             ActionMap.WD_Dj1,
//             ActionMap.AN_QR11,
//             ActionMap.DH_SJ,
//             ActionMap.AN_DH,
//             ActionMap.SYD_DJ,
//             ActionMap.AN_QR,
//         ],
//     },
//     // 开始输液.
//     8: {
//         '8-1': [
//             ActionMap.SYQ_DJ3,
//             ActionMap.LZZ_CK3,
//             ActionMap.AN_QR12,
//
//         ],
//         '8-2': [
//             ActionMap.HSB_SQ,
//             ActionMap.SYB_DJ3,
//             ActionMap.SYB_TZ,
//             ActionMap.AN_QR13,
//         ],
//         '8-3': [
//             ActionMap.LZZ_CK4,
//             ActionMap.AN_QR14,
//         ],
//     }
// }

export {ActionMap};