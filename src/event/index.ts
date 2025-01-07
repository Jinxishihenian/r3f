// import {eventManager, eventQueue} from "./queue.ts";
import {step} from "../steps/machine";
import eventQueue from "./queue.ts";
import eventManager from "./emitter.ts";

let currentStepIndex = 0;
let currentBehaviorIndex = 0;
// 结构.
// const steps = [
//     {
//         id: "step1",
//         behaviors: [
//             {
//                 id: "behavior1",
//                 events: ["clickObjectA", "clickObjectB", "confirmAction"],
//             },
//             {
//                 id: "behavior2",
//                 events: ["clickObjectA-1"],
//             },
//         ],
//     },
//     {
//         id: "step2",
//         behaviors: [
//             {
//                 id: "behavior1",
//                 events: ["clickObjectA-2"],
//             },
//         ],
//     },
//     {
//         id: "step3",
//         behaviors: [
//             {
//                 id: "behavior3",
//                 events: ["clickObjectA-3"],
//             },
//         ],
//     },
// ];
// step
// const step = step
// TODO 该部分需要重写.
let steps = [];
let index = 0;
Object.values(step).forEach(value => {
    let j = 0;
    steps.push({
        id: index,
        behaviors: [],
    });

    Object.values(value.children).forEach(value1 => {
        steps[index]['behaviors'][j] = {
            id: j,
            events: value1.events,
        };
        j++;
    });
    index++;
})

// 开始步骤.
function startStep(stepIndex) {
    currentStepIndex = stepIndex;
    // const step = steps[stepIndex];
    // console.log(`开始步骤：${step.id}`);
    startBehavior(0); // 从第一个行为开始
}

function startBehavior(behaviorIndex) {
    const step = steps[currentStepIndex];
    const behavior = step.behaviors[behaviorIndex];
    currentBehaviorIndex = behaviorIndex;
    // console.log(`开始行为：${behavior.id}`);
    // 初始化事件队列
    eventQueue.initialize(behavior.events);
    // 所有的事件产生的视觉效果将会在这里完成.
    // eventQueue.onComplete((event) => {
    //     console.log(`丑陋的把戏:${event}`);
    //     if (event == 'clickObjectA') {
    //         console.log('表现clickObjectA')
    //     }
    //     if (event == 'clickObjectB') {
    //         console.log('表现clickObjectB')
    //     }
    //     if (event == 'confirmAction') {
    //         console.log('表现confirmAction')
    //     }
    // });

    // 启动事件队列
    eventQueue.start();

    // 队列完成时更新行为状态
    eventQueue.processNext = function () {
        // console.log('processNext1');
        // console.log(eventManager.eventNames())

        if (eventQueue.currentIndex >= eventQueue.queue.length) {
            // console.log(`行为完成：${behavior.id}===========`);
            if (behaviorIndex + 1 < step.behaviors.length) {
                // console.log(`行为完成===${behaviorIndex}`);
                startBehavior(behaviorIndex + 1);
            } else {
                // 一个步骤.
                // 步骤完成.
                // console.log(`步骤完成：${step.id}===`);
                // console.log('currentStepIndex')
                // console.log(currentStepIndex)
                // console.log(currentStepIndex + 1)
                currentStepIndex = currentStepIndex + 1;
                startBehavior(0);
                // startStep(currentStepIndex + 1);
            }
            // startBehavior(behaviorIndex + 1);
        } else {
            const currentEvent = eventQueue.queue[eventQueue.currentIndex];
            // console.log(`开始处理事件：${currentEvent}`);
            eventManager.on(currentEvent, eventQueue.handleEventComplete.bind(eventQueue));
        }
        // console.log('==注册的事件==');
        // console.log(eventManager.eventNames())
    };
}

export {startStep, steps};