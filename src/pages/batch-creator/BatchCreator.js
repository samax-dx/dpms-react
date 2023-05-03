import mcss from './BatchCreator.module.css';

import React, { useEffect, useState } from 'react';

import { Card, Col, Layout, Row, Typography } from 'antd';
import { BasicLogo } from '../../features/logos/BasicLogo';
import { HeaderButtonPv } from '../../features/profile-viewers/HeaderButtonPv';
import { MainNav } from '../../features/navs/MainNav';
import { BatchEditForm } from '../../features/batch-edit-form/BatchEditForm';
import { BatchListView } from '../../features/batch-list-view/BatchListView';
import { useSaveBatch } from '../../services/BatchRepository';
import { BatchCreateWizardReactions, useBatchCreateWizardActions } from '../../services/BatchCreateWizard';


export const BatchCreator = () => {
    BatchCreateWizardReactions.useResetBatchState();

    const [saveState] = useSaveBatch();
    const [createdItems, setCreatedItems] = useState([]);
    const { finishCreateBatch } = useBatchCreateWizardActions();

    useEffect(() => {
        if (!saveState.complete || saveState.data instanceof Error) {
            return;
        }
        finishCreateBatch();
        setCreatedItems([...createdItems, saveState.data]);
    }, [saveState]);

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
                    <Card bordered={false} size='small' cover={<Typography.Text type="secondary" underline style={{ padding: "5px 15px" }} strong>Batch Create Panel</Typography.Text>}>
                        <BatchEditForm />
                    </Card>
                    <br />
                    <Card size='small' bodyStyle={{ marginTop: -5 }} cover={<Typography.Text type="secondary" underline style={{ padding: "5px 15px" }} strong>Created Batch List</Typography.Text>}>
                        <BatchListView items={createdItems} />
                    </Card>
                </Card>
            </Layout.Content>
        </Layout>
    );
};
