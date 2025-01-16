const Goods = {
    SYB_JT: {
        // 别名.
        name: "输液泵_静态",
        id: 'HL_ShuYeBeng_1',
    },
    SYB_DH: {
        name: "输液泵_动画",
        id: '',
        children: {
            SHB_BJ_SYE: {
                name: "输液器",
                id: '',
            },
            SHB_BJ_AN: {
                name: "输液器",
                id: '',
            },
        }
    },
    DF: {
        // HL_JiErDianXiaoDuYe_2
        name: "碘伏",
        id: 'HL_JiErDianXiaoDuYe_1',
    },
    // 医用棉签.
    YYMQ: {
        name: "医用棉签",
        id: 'HL_YiYongMianQianBaoZhuang',
    }
    // HL_YiYongMianQianBaoZhuang
};
// 模型真实名称.
// const Moulds = {
//     ''
// }
export default Goods;