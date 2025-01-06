import styles from './index.module.css';
import {Button, List, Typography} from 'antd';
import {SomeMachineContext, StepsStatus} from "../steps";
import {useEffect, useState} from "react";
import {steps} from "../action";
import {eventManager, eventQueue} from "../action/aueue.ts";

// 列表.
function Gui() {
    // const data = [
    //     '动作1,动作1,动作1,动作1,动作1',
    //     '动作1,动作1,动作1,动作1,动作1',
    //     '动作1,动作1,动作1,动作1,动作1',
    //     '动作1,动作1,动作1,动作1,动作1',
    //     '动作1,动作1,动作1,动作1,动作1',
    // ];
    const [data, setDate] = useState([]);
    const [hint, setHint] = useState(eventQueue.queue[eventQueue.currentIndex]);
    const {step, currentStepId, currentSubTaskId} = SomeMachineContext.useSelector((state) => state?.context?.info);
    const index = SomeMachineContext.useSelector((state) => state?.context?.index);
    const someActorRef = SomeMachineContext.useActorRef();
    // const running = step.filter((item: any) => true);
    useEffect(() => {
        // 将进行中的过滤出来.
        someActorRef.subscribe((event) => {
            const running = Object.values(step).filter((item: any) => {
                return item.stepsStatus == StepsStatus.Running;
            });
            const list = Object.values(running[0].children).map((item) => item.events.join(' || '));
            setDate(list);
        });
    }, []);
    return (
        <div className={styles.main}>

            <List
                header={<div style={{fontWeight: 600}}>步骤{currentStepId}：进行中的行为{currentSubTaskId}</div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={(item: string) => (
                    <List.Item
                        onClick={() => {
                            console.log('假设完成');
                            someActorRef.send({type: 'COMPLETE'});
                        }}
                    >
                        <p>{item}</p>
                        {/*<p>{eventQueue.queue[eventQueue.currentIndex]}</p>*/}
                    </List.Item>
                )}
            />
            <div style={{color: "red"}}>请操作：{hint}</div>
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
        </div>
    );
}

export default Gui;
