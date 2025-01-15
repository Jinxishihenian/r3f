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
import useMovie from "../../hooks";
import {EventMapMovie, MovieType} from "../../movie";

// 步骤列表视图.
function Gui() {
    const [data, setDate] = useState([]);
    const [hint, setHint] = useState(eventQueue.queue[eventQueue.currentIndex]);
    const {step, currentStepId, currentSubTaskId} = GlobalMachineContext.useSelector((state) => state?.context?.info);
    const globalActorRef = GlobalMachineContext.useActorRef();
    const listSet = () => {
    }
    // 用于恢复场景.
    const {play, movieActive} = useMovie();
    useEffect(() => {
        // 将进行中的过滤出来.
        globalActorRef.subscribe((event) => {
            // console.log('subscribe1');
            const running = Object.values(step).filter((item: any) => {
                return item.stepsStatus == StepsStatus.Running;
            });
            const list = Object.values(running[0].children).map((item) => item.events.join(' || '));
            setDate(list);
        });
    }, []);

    useEffect(() => {
        console.log('监听eventQueue.currentIndex,eventQueue.queue变化');
        console.log(eventQueue.queue[eventQueue.currentIndex]);
        setHint(eventQueue.queue[eventQueue.currentIndex])
    }, [eventQueue.queue[eventQueue.currentIndex]]);
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
            <div style={{minHeight: '200px', maxWidth: '300px'}}>
                <List
                    header={<div style={{fontWeight: 600}}>步骤{currentStepId}：进行中的行为{currentSubTaskId}</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item: string) => (
                        <List.Item
                            onClick={() => {
                                // console.log('假设完成');
                                // globalActorRef.send({type: 'COMPLETE'});
                            }}
                        >
                            <p>{
                                item.split(' || ').map((item) => {
                                    // console.log('列表更新');
                                    if (item == hint) {
                                        return <span key={item} style={{color: 'green', margin: '0 4px'}}>{item}</span>
                                    }
                                    return <span key={item} style={{color: 'black', margin: '0 4px'}}>{item}</span>
                                })
                            }</p>

                            {/*{*/}
                            {/*    events.map((item) => {*/}
                            {/*        if (item == hint) {*/}
                            {/*            return <span style={{color: 'red'}}>item</span>*/}
                            {/*        }*/}
                            {/*        return <span>{item}</span>*/}
                            {/*    })*/}
                            {/*}*/}
                            {/*<p>{eventQueue.queue[eventQueue.currentIndex]}</p>*/}
                        </List.Item>
                    )}
                />
            </div>

            <div style={{color: "green"}}>请操作：{hint}</div>
            <h3>历史记录(用于跳步)</h3>
            <div style={{maxWidth: "300px"}}>
                {
                    // Object.values(step).map((item) => {
                    Object.keys(step).map((itemF) => {
                        // return <p>{item}</p>
                        // console.log('==item==')
                        // console.log(item)
                        // console.log()
                        // console.log('==item==')
                        // console.log(itemF)
                        const {children, stepsStatus} = step[itemF];
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
                                <ul
                                    style={{
                                        padding: '2px 8px',
                                        margin: '0',
                                        background: stepsStatus == StepsStatus.Running ? 'white' : "transparent",
                                        border: '1px solid red'
                                    }}
                                    onClick={() => {
                                        // 跳步逻辑.
                                        const stepIndex = Number(itemF);
                                        // 事件恢复.
                                        setCurrentStepIndex(stepIndex - 1);
                                        setCurrentBehaviorIndex(0);
                                        startBehavior(0);
                                        globalActorRef.send({type: 'JUMP_STEP', payload: itemF});
                                        // 场景恢复逻辑.
                                        // 获取所有事件.
                                        // const events = step.map((item) => {
                                        //     {children,stepsStatus} = item;
                                        // });
                                        console.log(stepIndex);
                                        const events = Object.keys(step).filter((item) => {
                                            // console.log('索引')
                                            // console.log(Number(item))
                                            const index = Number(item);
                                            return index < stepIndex;
                                        }).map((item) => {
                                            // console.log('==循环2==');
                                            // console.log(item)
                                            // const { children } = item;
                                            const {children} = step[item];
                                            const events = Object.values(children).map((item) => {
                                                const {events} = item;
                                                return events;
                                            });
                                            return events.flat();
                                        }).flat();
                                        // 根据事件获取所有命令.
                                        // 过滤与场景有关的命令.
                                        const movies = events.map((item) => {
                                            return EventMapMovie[item]
                                        }).flat().filter((item) => [
                                            MovieType.MOVE,
                                            MovieType.MODEL_ANIMATION,
                                        ].includes(item.movieType));
                                        console.log('所有事件');
                                        console.log(events);
                                        console.log('==所有影视==');
                                        console.log(movies);
                                        // N个数组用来描述状态.
                                        // 两个维度(物品,状态).
                                        //    - 以变形为核心.
                                        const moviesTransform = Object.values(movies.filter((item) => item.movieType == MovieType.MOVE).reduce((acc, item) => {
                                                // 使用最后出现的记录覆盖前面的.
                                                acc[item.parameters.name] = item;
                                                return acc;
                                            }, {})
                                        );
                                        // console.log('==唯一值==');
                                        // console.log(moviesTransform)
                                        //    - 以动画为核心.
                                        const moviesAnimation = Object.values(movies.filter((item) => item.movieType == MovieType.MODEL_ANIMATION).reduce((acc, item) => {
                                                // 使用最后出现的记录覆盖前面的.
                                                acc[item.parameters.name] = item;
                                                return acc;
                                            }, {})
                                        );
                                        // 经过渲染层还原场景.
                                        const result = [...moviesTransform, ...moviesAnimation];
                                        // console.log('==result==')
                                        // 渲染结果层.
                                        // console.log(result);
                                        // play(movieActive);
                                        result.forEach((item) => {
                                            movieActive(item);
                                        });
                                    }}
                                >
                                    {
                                        Object.keys(children).map((item) => {
                                            const {events} = children[item];
                                            return (
                                                <li
                                                    key={events.toString()}
                                                    style={{
                                                        fontSize: 12,
                                                        maxWidth: 300,
                                                        color: 'black',
                                                        userSelect: "none",
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
