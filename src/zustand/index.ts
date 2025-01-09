import {create} from 'zustand';

const useBearStore = create((set) => ({
    // 存放模型.
    models: {},
    // 添加模型.
    addModel: (name, model) => set((state) => ({models: {...state.models, [name]: model}})),
    bears: 0,
    increasePopulation: () => set((state) => ({bears: state.bears + 1})),
    removeAllBears: () => set({bears: 0})
}));

export default useBearStore;