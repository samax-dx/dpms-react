import mcss from './BatchEditorPage.module.css';

import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Layout, Modal, Row, Space, notification } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';
import { BatchEditForm } from '../../components/BatchEditForm/BatchEditForm';
import { BatchListView, BatchListViewItem } from '../BatchListView/BatchListView';
import { useBatchCreateWizardActions } from '../../services/BatchCreateWizard';
import { usePublishBatch } from '../../services/BatchRepository';


export const BatchEditorPage = () => {
    const { restoreBatchState, resetBatchState } = useBatchCreateWizardActions();
    const [publishState, publishBatch] = usePublishBatch();
    const [editItem, setEditItem] = useState({ batchProcesses: [] });
    const [checkedItems, setCheckedItems] = useState([]);

    const openEditor = item => setEditItem(item) || restoreBatchState(item, item.batchProcesses);
    const closeEditor = () => setEditItem({ batchProcesses: [] }) || resetBatchState();

    useEffect(() => {
        if (!publishState.complete) return;

        if (publishState.data instanceof Error) {
            notification.error({
                key: `csend_${Date.now()}`,
                message: "Task Failed",
                description: <>
                    Errors:<br />{JSON.stringify(publishState.data)}
                </>,
                duration: 15
            });
        } else {
            notification.success({
                key: `csend_${Date.now()}`,
                message: "Task Finished",
                description: JSON.stringify(publishState.data),
                duration: 15,
            });
            setCheckedItems([]);
        }
    }, [publishState]);

    useEffect(() => {
        resetBatchState();
        return resetBatchState;
    }, []);

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
                    <Card title="Planned Batches" size='small'>
                        <Space direction={"vertical"}>
                            <BatchListView
                                renderItem={(item, i) => {
                                    return (
                                        <>
                                            <BatchListViewItem batch={item} />
                                            <Space direction={"vertical"}>
                                                <Button onClick={_ => openEditor(item)} children="Edit" />
                                                <Button
                                                    onClick={_ => setCheckedItems([...Object.assign(checkedItems, { [i]: checkedItems[i] ? null : item })])}
                                                    type={checkedItems[i] ? "primary" : "default"}
                                                    children={checkedItems[i] ? "-" : "+"}
                                                    style={{ width: "100%" }}
                                                />
                                            </Space>
                                        </>
                                    );
                                }}
                                className={""}
                            />
                            <Space style={{ width: "100%", justifyContent: "center" }}>
                                <Button
                                    type={"primary"}
                                    onClick={() => publishBatch(checkedItems.filter(Boolean).map(batch => batch.batchId))}
                                    disabled={!checkedItems.some(Boolean)}
                                    style={{ marginTop: 15 }}
                                    children={"Publish Selected Batches"}
                                />
                                <Button children="Edit" style={{ visibility: "hidden" }} />
                            </Space>
                        </Space>
                    </Card>
                </Card>
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
            </Layout.Content>
        </Layout >
    );
};
