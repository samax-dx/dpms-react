import mcss from './DeliveryPage.module.css';

import React from 'react';

import { Card, Col, Layout, Row, Typography } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';

const { Text } = Typography;


export const DeliveryPage = () => (
    <Layout>
        <Layout.Header className={mcss.header}>
            <Row gutter={5}>
                <Col><BasicLogo /></Col>
                <Col style={{ flexGrow: 1 }}>{ }</Col>
                <Col><MainNav /></Col>
                <Col style={{ flexGrow: 1 }}>{ }</Col>
                <Col><HeaderButtonPv /></Col>
            </Row>
        </Layout.Header>
        <Layout.Content className={mcss.content}>
            <Card bordered={false} style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                <DeliveryQueue />
            </Card>
        </Layout.Content>
    </Layout>
);

const DeliveryQueue = () => {
    return (
        <Row gutter={[10, 10]} style={{ marginLeft: 0, marginRight: 0 }}>
            <Col span={24}>
                <Text code>Delivery</Text>
            </Col>
        </Row>
    );
};
