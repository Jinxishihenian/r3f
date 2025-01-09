import {create} from 'zustand';

const useBearStore = create((set) => ({
    // 存放模型.
    models: {},
    // 存放动画. 
    animations: {},
    // 存放静态.
    statics: {},
    // 添加模型.
    addModel: (name, model) => set((state) => ({models: {...state.models, [name]: model}})),
    // 添加动画.
    addAnimation: (name, animation) => set((state) => ({animations: {...state.animations, [name]: animation}})),
    // 添加镜头.
    bears: 0,
    increasePopulation: () => set((state) => ({bears: state.bears + 1})),
    removeAllBears: () => set({bears: 0})
}));

export default useBearStore;