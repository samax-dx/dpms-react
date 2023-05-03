import mcss from './Slitting.module.css';

import React from 'react';

import { Card, Col, Layout, Row, Typography } from 'antd';
import { BasicLogo } from '../../features/logos/BasicLogo';
import { HeaderButtonPv } from '../../features/profile-viewers/HeaderButtonPv';
import { MainNav } from '../../features/navs/MainNav';

const { Text } = Typography;


export const Slitting = () => (
    <Layout>
        <Layout.Header className={mcss.header}>
            <Row gutter={5}>
                <Col><BasicLogo /></Col>
                <Col style={{ flexGrow: 1 }}>{ }</Col>
                <Col style={{ flexGrow: 1 }}><MainNav /></Col>
                <Col><HeaderButtonPv /></Col>
            </Row>
        </Layout.Header>
        <Layout.Content className={mcss.content}>
            <Card style={{ backgroundColor: "transparent" }}>
                <SlittingQueue />
            </Card>
        </Layout.Content>
    </Layout>
);

const SlittingQueue = () => {
    return (
        <Row gutter={[10, 10]} style={{ marginLeft: 0, marginRight: 0 }}>
            <Col span={24}>
                <Text code>Slitting</Text>
            </Col>
        </Row>
    );
};
