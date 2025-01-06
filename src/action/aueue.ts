import EventEmitter from "eventemitter3";

const eventManager = new EventEmitter()

class EventQueue {
    queue: any[];
    currentIndex: number;
    isProcessing: boolean;
    onCompleteCallback: any;

    constructor() {
        this.queue = []; // 事件队列
        this.currentIndex = 0; // 当前处理的事件索引
        this.isProcessing = false; // 是否正在处理队列
        this.onCompleteCallback = null;
    }

// 设置所有事件完成时的回调
    onComplete(callback) {
        this.onCompleteCallback = callback;
    }

    // 初始化队列（传入行为需要的事件列表）
    initialize(events) {
        this.queue = events;
        this.currentIndex = 0;
        this.isProcessing = false;
    }

    // 处理队列中的下一个事件
    processNext(): any {
        console.log('processNext2');
        if (this.currentIndex >= this.queue.length) {
            console.log("所有事件已处理完成");
            this.isProcessing = false;
            return true; // 队列完成
        }

        const currentEvent = this.queue[this.currentIndex];
        console.log(`开始处理事件：${currentEvent}`);
        this.isProcessing = true;
        // 监听当前事件的完成
        eventManager.on(currentEvent, this.handleEventComplete.bind(this));
        // eventManager.on(currentEvent, () => {
        //     console.log('总有一天你会出现在我身边.')
        // });
    }

    // 当事件完成时的回调
    handleEventComplete(event) {
        console.log(`事件完成：${event}`);

        eventManager.off(event, this.handleEventComplete.bind(this)); // 移除监听
        this.currentIndex++; // 处理下一个事件
        // 如果设置了回调，调用它
        if (this.onCompleteCallback) {
            this.onCompleteCallback(`${event}`);
        }
        this.processNext();
    }

    // 启动队列处理
    start() {
        if (this.queue.length === 0) {
            console.log("事件队列为空");
            return;
        }
        this.processNext();
    }
}

// 创建事件队列实例
const eventQueue = new EventQueue();
// eventManager.on
export {eventQueue, eventManager};