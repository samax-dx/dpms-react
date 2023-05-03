import mcss from './PlanningHome.module.css';

import React, { useState } from 'react';

import { Card, Col, Layout, Row, Spin } from 'antd';
import { BasicLogo } from '../../features/logos/BasicLogo';
import { HeaderButtonPv } from '../../features/profile-viewers/HeaderButtonPv';
import { MainNav } from '../../features/navs/MainNav';


export const PlanningHome = () => {
    const [spinning, setSpinning] = useState(false);

    return (
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
                <Spin spinning={spinning} size={"large"}>
                    <Card style={{ backgroundColor: "transparent" }}>
                        { }
                    </Card>
                </Spin>
            </Layout.Content>
        </Layout>
    );
};