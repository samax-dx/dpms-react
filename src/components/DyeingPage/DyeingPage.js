import mcss from './DyeingPage.module.css';

import React, { useState } from 'react';

import { Card, Col, Layout, Row, Space } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { DyeingTask } from '../dyeing/ActiveBatch';
import { DyeingQueue } from '../dyeing/BatchQueue';
import { MainNav } from '../navs/MainNav';


export const DyeingPage = () => {
    const [task, setTask] = useState(null);

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
                <Card bordered={false} style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Row gutter={[10, 10]} style={{ marginLeft: 0, marginRight: 0 }}>
                        <Col span={24}>
                            <DyeingTask task={task} onUnload={() => setTask(null)} />
                            <br />
                            <DyeingQueue canLoad={!!task} onLoad={setTask} />
                        </Col>
                    </Row>
                </Card>
            </Layout.Content>
        </Layout>
    );
};
