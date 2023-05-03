import React from 'react';
import { Col, Row, Space, Typography } from 'antd';

const { Text } = Typography;


export const MachineInfo = () => {
    return (
        <Row gutter={[10, 10]} style={{ marginLeft: 0, marginRight: 0 }}>
            <Col span={24}>
                <Space align='end'>
                    <Text italic>Machine ID</Text>:<Text code>15203</Text>
                </Space>
            </Col>
        </Row>
    );
};
