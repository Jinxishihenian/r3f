import styles from './index.module.css';
import {Button, List} from 'antd';
import {GlobalMachineContext, StepsStatus} from "../../machine";
import {useEffect, useState} from "react";
import {
    setCurrentBehaviorIndex,
    setCurrentStepIndex,
    startBehavior,
    startStep,
    steps
} from "../../event";
import eventQueue from "../../event/queue.ts";
import eventManager from "../../event/emitter.ts";
// import {eventManager, eventQueue} from "../../event/queue.ts";

// 步骤列表视图.
function Gui() {
    const [data, setDate] = useState([]);
    const [hint, setHint] = useState(eventQueue.queue[eventQueue.currentIndex]);
    const {step, currentStepId, currentSubTaskId} = GlobalMachineContext.useSelector((state) => state?.context?.info);
    // const index = GlobalMachineContext.useSelector((state) => state?.context?.index);
    const globalActorRef = GlobalMachineContext.useActorRef();
    // const running = step.filter((item: any) => true);
    const listSet = () => {
    }
    useEffect(() => {
        // 将进行中的过滤出来.
        globalActorRef.subscribe((event) => {
            console.log('subscribe1');
            const running = Object.values(step).filter((item: any) => {
                return item.stepsStatus == StepsStatus.Running;
            });
            const list = Object.values(running[0].children).map((item) => item.events.join(' || '));
            setDate(list);
        });
    }, []);
    return (
        <div className={styles.main}>
            <Button
                type="primary"
                onClick={() => {
                    // TODO 该部分为各种点击事件的合并.
                    const clickEvents = steps.map((item) => {
                        return item['behaviors'].map(item => {
                            return item['events'];
                        });
                    });
                    const clickEvents1 = clickEvents.flat().flat().reverse();
                    // console.log('clickEvents1');
                    // console.log('==事件总数==')
                    // console.log(clickEvents1.length)
                    clickEvents1.forEach((item) => {
                        eventManager.emit(item, item);
                    });
                    console.log('索引');
                    console.log(eventQueue.currentIndex);
                    console.log(eventQueue.queue);
                    setHint(eventQueue.queue[eventQueue.currentIndex])
                }}
            >
                万能按钮(模拟各种操作)
            </Button>
            <List
                header={<div style={{fontWeight: 600}}>步骤{currentStepId}：进行中的行为{currentSubTaskId}</div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={(item: string) => (
                    <List.Item
                        onClick={() => {
                            // console.log('假设完成');
                            globalActorRef.send({type: 'COMPLETE'});
                        }}
                    >
                        <p>{item}</p>
                        {/*<p>{eventQueue.queue[eventQueue.currentIndex]}</p>*/}
                    </List.Item>
                )}
            />
            <div style={{color: "red"}}>请操作：{hint}</div>

            <div>历史记录(用于跳步)</div>
            <div>
                {
                    // Object.values(step).map((item) => {
                    Object.keys(step).map((itemF) => {
                        // return <p>{item}</p>
                        // console.log('==item==')
                        // console.log(item)
                        // console.log()
                        // console.log('==item==')
                        // console.log(itemF)
                        const {children} = step[itemF];
                        // console.log('11step11');
                        // console.log(children)
                        // console.log('==children==');
                        // console.log(children);
                        // Object.values(children).map((item) => {
                        //     // console.log('ittt')
                        //     // console.log(item);
                        //     console.log(item)
                        // })
                        return (
                            <div key={itemF}>
                                {/*<h1>{}</h1>*/}
                                <ul>
                                    {
                                        Object.keys(children).map((item) => {
                                            const {events} = children[item];
                                            return (
                                                <li
                                                    key={events.toString()}
                                                    style={{
                                                        fontSize: 12,
                                                        maxWidth: 300,
                                                        color: 'blue',
                                                        userSelect: "none",
                                                    }}
                                                    onClick={() => {
                                                        // console.log('==事件队列==');
                                                        // console.log(Number(itemF) - 1)
                                                        // startStep(Number(itemF) - 1);
                                                        console.log('步骤');
                                                        setCurrentStepIndex(Number(itemF) - 1);
                                                        setCurrentBehaviorIndex(0);
                                                        startBehavior(0);
                                                        // startBehavior(Number(itemF) - 1);
                                                        // startStep(0);
                                                        globalActorRef.send({type: 'JUMP_STEP', payload: itemF});
                                                    }}
                                                >
                                                    {events.join(',')}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Gui;
