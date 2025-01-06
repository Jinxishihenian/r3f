import styles from './index.module.css';
import {Button, List, Typography} from 'antd';
import {SomeMachineContext, StepsStatus} from "../steps";
import {useEffect, useState} from "react";

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
            const list = Object.values(running[0].children).map((item) => item.events.join(','));
            setDate(list);
        });
    }, []);
    return (
        <div className={styles.main}>
            <div>测试数据{index}</div>
            <List
                header={<div>步骤{currentStepId}===进行中的行为{currentSubTaskId}</div>}
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
                        {item}
                    </List.Item>
                )}
            />
            <Button
                type="primary"
                onClick={() => {}}
            >
                模拟各种按钮
            </Button>
        </div>
    );
}

export default Gui;
