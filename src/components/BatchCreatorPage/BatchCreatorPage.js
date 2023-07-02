import mcss from './BatchCreatorPage.module.css';

import React, { useEffect, useState } from 'react';

import { Card, Col, Layout, Row, Typography } from 'antd';
import { BasicLogo } from '../logos/BasicLogo';
import { HeaderButtonPv } from '../ProfileViewers/HeaderButtonPv';
import { MainNav } from '../navs/MainNav';
import { BatchEditForm } from '../../components/BatchEditForm/BatchEditForm';
import { BatchListView } from '../BatchListView/BatchListView';
import { useSaveBatch } from '../../services/BatchRepository';
import { useBatchCreateWizardActions } from '../../services/BatchCreateWizard';


export const BatchCreatorPage = () => {
    const [saveState] = useSaveBatch();
    const [createdItems, setCreatedItems] = useState([]);
    const { finishEdit, resetBatchState } = useBatchCreateWizardActions();

    useEffect(() => {
        if (!saveState.complete || saveState.data instanceof Error) {
            return;
        }
        setCreatedItems([...createdItems, saveState.data]);
        finishEdit();
    }, [saveState]);

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
                <Card bordered={false} style={{ backgroundColor: "transparent", boxShadow: "none" }}>
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
