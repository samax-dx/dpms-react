import mcss from './PublishedBatchManagerPage.module.css';

import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Card, Col, Descriptions, Layout, Row, Space } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';
import { usePublishedBatchList } from '../../services/BatchRepository';


const createListView = batchListLoadable => {
    switch (batchListLoadable.state) {
        case "hasValue":
            return (
                <Space direction="vertical" size={"large"} style={{ width: "100%", padding: "20px 10px" }}>
                    {batchListLoadable.contents.map((item, i) => (
                        <Descriptions layout="vertical" style={{ flexGrow: 1 }} bordered key={`bi-i${i}`} size="small" column={8}>
                            <Descriptions.Item label="#">{i}</Descriptions.Item>
                            <Descriptions.Item label="Batch No.">{item.batchId}</Descriptions.Item>
                            <Descriptions.Item label="Publish Time">{dayjs(item.updatedOn).format('DD/MM/YYYY - hh:mm A')}</Descriptions.Item>
                            <Descriptions.Item label="Process Name">
                                {item.batchProcesses.find(process => !process.finished).processId}
                            </Descriptions.Item>
                            <Descriptions.Item label="Machine No">
                                {item.batchProcesses.find(process => !process.finished).machine.machineId}
                            </Descriptions.Item>
                            <Descriptions.Item label="Start Time">-</Descriptions.Item>
                            <Descriptions.Item label="End Time">-</Descriptions.Item>
                            <Descriptions.Item label="Duration">-</Descriptions.Item>
                        </Descriptions>
                    ))}
                </Space>
            );
        case "loading":
            return <div>Loading...</div>;
        case "hasError":
            return <div>Error: {batchListLoadable.contents.message}</div>;
        default:
            return <div>Unknow Result...</div>;
    }
}

export const PublishedBatchManagerPage = () => {
    const [batchListLoadable, setBatchQueryFilter] = usePublishedBatchList();

    useEffect(() => void (setBatchQueryFilter("")), []);

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
                <Card style={{ backgroundColor: "transparent" }}>
                    <Card title="Published Batches" size='small'>
                        {createListView(batchListLoadable)}
                    </Card>
                </Card>
            </Layout.Content>
        </Layout >
    );
};
