import mcss from './BatchEditor.module.css';

import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Layout, Modal, Row } from 'antd';
import { BasicLogo } from '../../features/logos/BasicLogo';
import { HeaderButtonPv } from '../../features/profile-viewers/HeaderButtonPv';
import { MainNav } from '../../features/navs/MainNav';
import { BatchEditForm } from '../../features/batch-edit-form/BatchEditForm';
import { BatchListView } from '../../features/batch-list-view/BatchListView';
import { useBatchCreateWizardActions } from '../../services/BatchCreateWizard';


export const BatchEditor = () => {
    const { restoreBatchState, resetBatchState } = useBatchCreateWizardActions();
    const [editItem, setEditItem] = useState({ batchProcesses: [] });

    const openEditor = item => setEditItem(item) || restoreBatchState(item, item.batchProcesses);
    const closeEditor = () => setEditItem({ batchProcesses: [] }) || resetBatchState();

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
                    <Col style={{ flexGrow: 1 }}><MainNav /></Col>
                    <Col><HeaderButtonPv /></Col>
                </Row>
            </Layout.Header>
            <Layout.Content className={mcss.content}>
                <Card style={{ backgroundColor: "transparent" }}>
                    <Card title="Running Batches" size='small'>
                        <BatchListView
                            render={item => {
                                return (
                                    <Button
                                        onClick={_ => openEditor(item)}
                                        style={{ height: "100%" }}
                                        children="Edit"
                                    />
                                );
                            }}
                            className=""
                        />
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
