// 播放器.
import useBearStore from "../zustand";

const usePlay = () => {
    // 所有需要操作的glb引用.
    const models = useBearStore((state) => state.models);
    // 获取事件.

    // 由事件兑换影视信息.

    // 根据影视开始进行播放.

    // 还原场景信息(接收影视，还原场景).
    const restore = () => {
    }

    // 播放.
    const play = ({name}) => {
        // 可能存在异步.
        switch (name) {
            case 1:
            case 2:
            case 3:
        }

    };

    return {play, restore};
}
export default usePlay;