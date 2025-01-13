import styles from './index.module.css';
import {Button, List} from 'antd';
import {GlobalMachineContext, StepsStatus} from "../../machine";
import {useEffect, useState} from "react";
import {steps} from "../../event";
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
                    Object.values(step).map((item) => {
                        // return <p>{item}</p>
                        // console.log('==item==')
                        // console.log(item)
                        // console.log()
                        const {children} = item;
                        console.log('11step11');
                        console.log(children)
                        // console.log('==children==');
                        // console.log(children);
                        // Object.values(children).map((item) => {
                        //     // console.log('ittt')
                        //     // console.log(item);
                        //     console.log(item)
                        // })
                        return (
                            <div>
                                {/*<h1>{}</h1>*/}
                                <ul>
                                    {
                                        Object.values(children).map((item) => {
                                            const {events} = item;
                                            return (
                                                <li
                                                    key={events}
                                                    style={{fontSize: 12}}
                                                    onClick={() => {
                                                        console.log('==点击内容==');
                                                        console.log(item)
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
