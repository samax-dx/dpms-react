import mcss from './PublishedBatchManagerPage.module.css';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Badge, Button, Card, Col, Descriptions, Layout, Modal, Row, Space, notification } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';
import { useStopBatchProcess, usePublishedBatchList, useStartBatchProcess, useStartNextBatchProcess } from '../../services/BatchRepository';
import { processIcons, processLabels } from '../../services/SystemData';
import { useBatchCreateWizardActions } from '../../services/BatchCreateWizard';
import { BatchEditForm } from '../BatchEditForm/BatchEditForm';


const BatchListItemView = ({ item, index: i }) => {
    const [processStartState, startBatchProcess] = useStartBatchProcess();
    const [processNextStartState, startNextBatchProcess] = useStartNextBatchProcess();
    const [processStopState, stopBatchProcess] = useStopBatchProcess();
    const { restoreBatchState, resetBatchState } = useBatchCreateWizardActions();
    const [editItem, setEditItem] = useState({ batchProcesses: [] });

    const openEditor = item => setEditItem(item) || restoreBatchState(item, item.batchProcesses);
    const closeEditor = () => setEditItem({ batchProcesses: [] }) || resetBatchState();

    const currentProcessIndex = item.batchProcesses.findIndex(process => !process.finished);
    const currentProcess = item.batchProcesses[currentProcessIndex];
    const nextProcess = item.batchProcesses[currentProcessIndex + 1];
    const startProcess = () => startBatchProcess({ batchProcessId: currentProcess.batchProcessId });
    const startNextProcess = () => startNextBatchProcess({ currentProcessId: currentProcess.batchProcessId, nextProcessId: nextProcess.batchProcessId });
    const stopProcess = () => stopBatchProcess({ batchProcessId: currentProcess.batchProcessId });

    useEffect(() => {
        if (!processStartState.complete) return;

        if (processStartState.data instanceof Error) {
            notification.error({
                key: `csend_${Date.now()}`,
                message: "Task Failed",
                description: <>
                    Errors:<br />{JSON.stringify(processStartState.data)}
                </>,
                duration: 15
            });
        } else {
            notification.success({
                key: `csend_${Date.now()}`,
                message: "Task Finished",
                description: JSON.stringify(processStartState.data),
                duration: 15,
            });
        }
    }, [processStartState]);

    useEffect(() => {
        if (!processStopState.complete) return;

        if (processStopState.data instanceof Error) {
            notification.error({
                key: `csend_${Date.now()}`,
                message: "Task Failed",
                description: <>
                    Errors:<br />{JSON.stringify(processStopState.data)}
                </>,
                duration: 15
            });
        } else {
            notification.success({
                key: `csend_${Date.now()}`,
                message: "Task Finished",
                description: JSON.stringify(processStopState.data),
                duration: 15,
            });
        }
    }, [processStopState]);

    useEffect(() => {
        if (!processNextStartState.complete) return;

        if (processNextStartState.data instanceof Error) {
            notification.error({
                key: `csend_${Date.now()}`,
                message: "Task Failed",
                description: <>
                    Errors:<br />{JSON.stringify(processNextStartState.data)}
                </>,
                duration: 15
            });
        } else {
            notification.success({
                key: `csend_${Date.now()}`,
                message: "Task Finished",
                description: JSON.stringify(processNextStartState.data),
                duration: 15,
            });
        }
    }, [processNextStartState]);

    return (
        <div className={mcss.statusBox}>
            <Space.Compact size={5} align="start" style={{ display: "flex", width: "100%" }} block>
                <Badge.Ribbon
                    placement="start"
                    text="#"
                    color="cyan"
                    style={{ padding: "2px 10px 2px 20px", marginTop: "-4px" }}
                >
                    <Descriptions className="batch-data" layout="horizontal" bordered key={`bi-i${i}`} size="small" column={1}>
                        <Descriptions.Item
                            label={<Button className="batch-setting" icon={<SettingOutlined />} type="link" onClick={_ => openEditor(item)}>Edit</Button>}
                        >
                            {i + 1}
                        </Descriptions.Item>
                        <Descriptions.Item label="Batch No">{item.batchId}</Descriptions.Item>
                        <Descriptions.Item label="Publish Time">{dayjs(item.createdOn).format('DD/MM/YYYY hh:mm A')}</Descriptions.Item>
                        <Descriptions.Item label="Current Process">
                            <Space size={6}>
                                <span>{processLabels[currentProcess.processId]}</span>
                                <span className="process-actions">{currentProcess.activeExecution
                                    ? (currentProcess.activeExecution.endedOn ? <><Button onClick={startProcess}>Start Again</Button><Button onClick={startNextProcess} hidden={!nextProcess}>Start Next Process</Button></> : <Button onClick={stopProcess}>Stop</Button>)
                                    : <Button onClick={startProcess}>Start</Button>
                                }</span>
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Start - End">{currentProcess.activeExecution
                            ? `${currentProcess.activeExecution.startedOn} - ${currentProcess.activeExecution.endedOn}`
                            : <> - </>
                        }</Descriptions.Item>
                        <Descriptions.Item label="Machine No">{currentProcess.machine.machineId}</Descriptions.Item>
                    </Descriptions>
                </Badge.Ribbon>
                <div>
                    <Card className="process-list">
                        <Row gutter={20}>
                            {item.batchProcesses.map((process, pi) => (
                                <Col key={pi}>
                                    <Badge.Ribbon placement="end" text={process.executions.length} color="cyan">
                                        <Card className={`process-data${pi !== currentProcessIndex ? "" : " is-next"}`} hoverable>
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
            </Space.Compact>
            <Modal
                title={`Edit Batch - ${editItem.batchId}`}
                open={!!editItem.batchId}
                footer={null}
                onCancel={closeEditor}
                destroyOnClose={true}
                style={{ minWidth: "90%" }}
            >
                <BatchEditForm />
            </Modal>
        </div>
    )
};

const BatchListView = ({ loadableList: batchListLoadable }) => {
    switch (batchListLoadable.state) {
        case "hasValue":
            return (<>
                <Space direction="vertical" size={"large"} style={{ width: "100%", padding: "20px 0" }}>
                    {batchListLoadable.contents.map((item, i) => <BatchListItemView item={item} index={i} key={i} />)}
                </Space>
            </>);
        case "loading":
            return <div>Loading...</div>;
        case "hasError":
            return <div>Error: {batchListLoadable.contents.message}</div>;
        default:
            return <div>Unknow Result...</div>;
    }
};

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
                        <BatchListView loadableList={batchListLoadable} />
                    </Card>
                </Card>
            </Layout.Content>
        </Layout >
    );
};
