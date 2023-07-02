import mcss from './PublishedBatchManagerPage.module.css';

import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Badge, Button, Card, Col, Descriptions, Layout, Row, Space } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';
import { usePublishedBatchList } from '../../services/BatchRepository';
import { processIcons, processLabels } from '../../services/SystemData';


const createListView = batchListLoadable => {
    switch (batchListLoadable.state) {
        case "hasValue":
            return (
                <Space direction="vertical" size={"large"} style={{ width: "100%", padding: "20px 0" }}>
                    {batchListLoadable.contents.map((item, i) => (
                        <div className={mcss.statusBox}>
                            <Space.Compact size={5} align="start" style={{ display: "flex", width: "100%" }} block>
                                <Badge.Ribbon
                                    placement="start"
                                    text="#"
                                    color="cyan"
                                    style={{ padding: "2px 10px 2px 20px", marginTop: "-4px" }}
                                >
                                    <Descriptions className="batch-data" layout="horizontal" bordered key={`bi-i${i}`} size="small" column={1}>
                                        <Descriptions.Item label={<Button className="batch-setting" icon={<SettingOutlined />} type="link">Edit</Button>}>
                                            {i + 1}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Batch No">{item.batchId}</Descriptions.Item>
                                        <Descriptions.Item label="Publish Time">{dayjs(item.createdOn).format('DD/MM/YYYY hh:mm A')}</Descriptions.Item>
                                        <Descriptions.Item label="Current Process">{item.batchProcesses.find(process => !process.finished).processId}</Descriptions.Item>
                                        <Descriptions.Item label="Started On">-</Descriptions.Item>
                                        <Descriptions.Item label="Machine No">{item.batchProcesses.find(process => !process.finished).machine.machineId}</Descriptions.Item>
                                    </Descriptions>
                                </Badge.Ribbon>
                                <div>
                                    <Card className="process-list">
                                        <Row gutter={20}>
                                            {item.batchProcesses.map((process, pi) => (
                                                <Col key={pi}>
                                                    <Badge.Ribbon placement="end" text={Math.round(Math.random() * 10)} color="cyan">
                                                        <Card className={`process-data${process.finished ? "" : " is-next"}`} hoverable>
                                                            <Space direction="vertical" align="center" size={2}>
                                                                {processIcons[process.processId]({})}
                                                                {processLabels[process.processId]}
                                                            </Space>
                                                        </Card>
                                                    </Badge.Ribbon>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card>
                                </div>
                                {/* <Space size={5} style={{ display: "flex", width: "100%" }}>
                                    {item.batchProcesses.map((process, pi) => (
                                        <Card className={`process-card ${process.finished ? "" : "next"}`} size="small" key={pi}>
                                            <Space size={2} direction="vertical">
                                                <Badge count={Math.ceil(Math.random() * 10)}>
                                                    <Tag>{process.processId}</Tag>
                                                </Badge>
                                            </Space>
                                        </Card>
                                    ))}
                                </Space> */}
                            </Space.Compact>
                            {/* <Descriptions layout="vertical" bordered key={`bi-i${i}`} size="small" column={6}>
                                    <Descriptions.Item label="#">{i + 1}</Descriptions.Item>
                                    <Descriptions.Item label="Batch No,">{item.batchId}</Descriptions.Item>
                                    <Descriptions.Item label="Publish Time">{dayjs(item.createdOn).format('DD/MM/YYYY hh:mm A')}</Descriptions.Item>
                                    <Descriptions.Item label="Current Process">{item.batchProcesses.find(process => !process.finished).processId}</Descriptions.Item>
                                    <Descriptions.Item label="Started On">-</Descriptions.Item>
                                    <Descriptions.Item label="Machine No">{item.batchProcesses.find(process => !process.finished).machine.machineId}</Descriptions.Item>
                                </Descriptions>
                                <Row gutter={6}>
                                    {item.batchProcesses.map((process, pi) => (
                                        <Col className={`process-col ${process.finished ? "" : "next"}`} span={8} key={pi}>
                                            <Card className="process-card" size="small">
                                                <Space size={2} direction="vertical">
                                                    <div>
                                                        <Typography.Text italic>Process :</Typography.Text>
                                                        <Typography.Text strong type="success"> {process.processId}</Typography.Text>
                                                    </div>
                                                    <div>
                                                        <Typography.Text italic>Start :</Typography.Text>
                                                        <Typography.Text> 23/06/2023 02:04 AM</Typography.Text>
                                                    </div>
                                                    <div>
                                                        <Typography.Text italic>End :</Typography.Text>
                                                        <Typography.Text> 23/06/2023 05:04 PM</Typography.Text>
                                                    </div>
                                                </Space>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row> */}
                        </div>
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
                <Card bordered={false} style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Card title="Published Batches" size='small'>
                        {createListView(batchListLoadable)}
                    </Card>
                </Card>
            </Layout.Content>
        </Layout >
    );
};
