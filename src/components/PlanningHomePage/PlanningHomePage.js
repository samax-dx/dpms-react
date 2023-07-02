import mcss from './PlanningHomePage.module.css';

import React, { useState } from 'react';

import { Card, Col, Layout, Row, Spin } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';


export const PlanningHomePage = () => {
    const [spinning, setSpinning] = useState(false);

    return (
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
                <Spin spinning={spinning} size={"large"}>
                    <Card bordered={false} style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                        { }
                    </Card>
                </Spin>
            </Layout.Content>
        </Layout>
    );
};