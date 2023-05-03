import mcss from './BatchViewer.module.css';

import { Card, Col, Layout, Row } from 'antd';
import { BasicLogo } from '../../features/logos/BasicLogo';
import { HeaderButtonPv } from '../../features/profile-viewers/HeaderButtonPv';
import { MainNav } from '../../features/navs/MainNav';
import { BatchListView } from '../../features/batch-list-view/BatchListView';


export const BatchViewer = () => {
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
                    <Card title="Running Batches" size='small'>
                        <BatchListView />
                    </Card>
                </Card>
            </Layout.Content>
        </Layout >
    );
};