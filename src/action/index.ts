import {eventManager, eventQueue} from "./aueue.ts";

let currentStepIndex = 0;
let currentBehaviorIndex = 0;
const steps = [
    {
        id: "step1",
        behaviors: [
            {
                id: "behavior1",
                events: ["clickObjectA", "clickObjectB", "confirmAction"],
            },
        ],
    },
];

function startStep(stepIndex) {
    currentStepIndex = stepIndex;
    const step = steps[stepIndex];

    console.log(`开始步骤：${step.id}`);
    startBehavior(0); // 从第一个行为开始
}

function startBehavior(behaviorIndex) {
    const step = steps[currentStepIndex];
    const behavior = step.behaviors[behaviorIndex];

    currentBehaviorIndex = behaviorIndex;

    console.log(`开始行为：${behavior.id}`);

    // 初始化事件队列
    eventQueue.initialize(behavior.events);

    // 启动事件队列
    eventQueue.start();

    // 队列完成时更新行为状态
    eventQueue.processNext = function () {
        console.log('processNext1');
        if (eventQueue.currentIndex >= eventQueue.queue.length) {
            console.log(`行为完成：${behavior.id}`);
            if (behaviorIndex + 1 < step.behaviors.length) {
                startBehavior(behaviorIndex + 1);
            } else {
                console.log(`步骤完成：${step.id}`);
            }
        } else {
            const currentEvent = eventQueue.queue[eventQueue.currentIndex];
            console.log(`开始处理事件：${currentEvent}`);
            eventManager.on(currentEvent, eventQueue.handleEventComplete.bind(eventQueue));
        }
    };
}

export default startStep;