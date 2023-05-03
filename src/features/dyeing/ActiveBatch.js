import { } from '@styles/Description.module.css';
import { Button, Col, Descriptions, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;


export const DyeingTask = ({ task, onUnload }) => {
    return (
        <Row>
            <Col md={8}>
                {task
                    ? <Descriptions
                        title="Active Batch Details"
                        bordered
                        // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        column={1}
                        labelStyle={{ backgroundColor: "lightblue" }}
                        className="lowTitleGap"
                        size='middle'
                    >
                        <Descriptions.Item label="Batch No." style={{ borderTopLeftRadius: 8 }}>{task.batchNumber}</Descriptions.Item>
                        <Descriptions.Item label="Machine No.">{task.machineNumber}</Descriptions.Item>
                        <Descriptions.Item label="Planning Time" style={{ borderBottomLeftRadius: 8 }}>
                            <Space direction="vertical">
                                <Space align="end"><Text underline>Load Time</Text>:<Text>{dayjs(new Date()).format('DD/MM/YYYY HH:mm A')}</Text></Space>
                                <Space align="end"><Text underline>Unoad Time</Text>:<Text></Text><Button onClick={onUnload}>Unload</Button></Space>
                            </Space>
                        </Descriptions.Item>
                    </Descriptions>
                    : <Descriptions
                        title="Active Batch Details"
                        bordered
                        // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        column={1}
                        labelStyle={{ backgroundColor: "lightblue" }}
                        className="lowTitleGap"
                        size='middle'
                    >
                        <Descriptions.Item>No-Active-Batch / Machine-Idle</Descriptions.Item>
                    </Descriptions>
                }
            </Col>
        </Row>
    );
};
