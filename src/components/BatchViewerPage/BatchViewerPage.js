import mcss from './BatchViewerPage.module.css';

import { Card, Col, Layout, Row } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';
import { BatchListView } from '../BatchListView/BatchListView';


export const BatchViewer = () => {
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
                    <Card title="Planned Batches" size='small'>
                        <BatchListView />
                    </Card>
                </Card>
            </Layout.Content>
        </Layout >
    );
};