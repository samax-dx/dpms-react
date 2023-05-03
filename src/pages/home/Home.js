import mcss from './Home.module.css';

import React from 'react';

import { Card, Col, Layout, Row } from 'antd';
import { BasicLogo } from '../../features/logos/BasicLogo';
import { HeaderButtonPv } from '../../features/profile-viewers/HeaderButtonPv';
import { OperationNav } from '../../features/navs/OperationNav';
import { MachineInfo } from '../../features/machine-info/MachineInfo';
import { MainNav } from '../../features/navs/MainNav';


export const Home = () => (
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
                <MachineInfo />
                <br />
                <OperationNav />
            </Card>
        </Layout.Content>
    </Layout>
);