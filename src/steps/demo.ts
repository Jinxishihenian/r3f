import {assign, createMachine} from "xstate";

const myMachine = createMachine(
    {
        context: {
            count: 0, // 初始化上下文
        },
        initial: 'idle',
        states: {
            idle: {
                on: {INCREMENT: {actions: 'incrementCount'}},
            },
        },
    },
    {
        actions: {
            incrementCount: assign({
                count: (context) => context.count + 1,
            }),
        },
    });