import mcss from './HomePage.module.css';

import React from 'react';

import { Card, Col, Layout, Row } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { OperationNav } from '../navs/OperationNav';
import { MachineInfo } from '../MachineInfo/MachineInfo';
import { MainNav } from '../navs/MainNav';


export const HomePage = () => (
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
                <MachineInfo />
                <br />
                <OperationNav />
            </Card>
        </Layout.Content>
    </Layout>
);