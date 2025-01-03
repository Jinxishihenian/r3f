import styles from './index.module.css';
import {List, Typography} from 'antd';

function Gui() {
    // 病房场景搭建.
    const data = [
        '动作1,动作1,动作1,动作1,动作1',
        '动作1,动作1,动作1,动作1,动作1',
        '动作1,动作1,动作1,动作1,动作1',
        '动作1,动作1,动作1,动作1,动作1',
        '动作1,动作1,动作1,动作1,动作1',
    ];
    return (
        <div className={styles.main}>
            <List
                header={<div>步骤</div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={(item: string) => (
                    <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Gui;
