import mcss from './BatchEditorPage.module.css';

import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Layout, Modal, Row } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';
import { BatchEditForm } from '../../components/BatchEditForm/BatchEditForm';
import { BatchListView } from '../BatchListView/BatchListView';
import { useBatchCreateWizardActions } from '../../services/BatchCreateWizard';


export const BatchEditorPage = () => {
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
                    <Col><MainNav /></Col>
                    <Col style={{ flexGrow: 1 }}>{ }</Col>
                    <Col><HeaderButtonPv /></Col>
                </Row>
            </Layout.Header>
            <Layout.Content className={mcss.content}>
                <Card style={{ backgroundColor: "transparent" }}>
                    <Card title="Planned Batches" size='small'>
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
