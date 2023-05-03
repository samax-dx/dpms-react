import mcss from './Dyeing.module.css';

import React, { useState } from 'react';

import { Card, Col, Layout, Row, Space } from 'antd';
import { BasicLogo } from '../../features/logos/BasicLogo';
import { HeaderButtonPv } from '../../features/profile-viewers/HeaderButtonPv';
import { DyeingTask } from '../../features/dyeing/ActiveBatch';
import { DyeingQueue } from '../../features/dyeing/BatchQueue';
import { MainNav } from '../../features/navs/MainNav';


export const Dyeing = () => {
    const [task, setTask] = useState(null);

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
                <Card style={{ backgroundColor: "transparent" }}>
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
