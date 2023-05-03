import mcss from './BatchEditForm.module.css';

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Form, Input, Row, Select, Space, Spin, Typography, notification } from "antd";
import { PicCenterOutlined, PicLeftOutlined, PicRightOutlined, BlockOutlined, BuildOutlined, CompressOutlined } from '@ant-design/icons';
import { useSaveBatch } from '../../services/BatchRepository';
import { useBatchCreateWizardActions, useBatchCreateWizardConditions, useBatchCreateWizardState } from '../../services/BatchCreateWizard';
import { TileNav } from '../navs/TileNav';


const processLabels = {
    "squeezer": "Squeezer",
    "drying": "Drying",
    "slitting": "Slitting",
    "stentering": "Stentering",
    "compacting": "Compacting",
    "brushing": "Brushing"
};

const processParamLabels = {
    "processId": "Process",
    "width_before": "Width Before",
    "width_after": "Width After",
    "over_feed": "Over Feed",
    "pin_width": "Spreader/Pin Width"
};

const processFormFields = {
    "squeezer": <>
        <Form.Item
            name={"width_before"}
            label={processParamLabels.width_before}
            children={<Input />}
            rules={[{ required: true }]}
        />
        <Form.Item
            name={"width_after"}
            label={processParamLabels.width_after}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>,
    "drying": <>
        <Form.Item
            name={"width_before"}
            label={processParamLabels.width_before}
            children={<Input />}
            rules={[{ required: true }]}
        />
        <Form.Item
            name={"width_after"}
            label={processParamLabels.width_after}
            children={<Input />}
            rules={[{ required: true }]}
        />
        <Form.Item
            name={"over_feed"}
            label={processParamLabels.over_feed}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>,
    "slitting": <>
        <Form.Item
            name={"width_before"}
            label={processParamLabels.width_before}
            children={<Input />}
            rules={[{ required: true }]}
        />
        <Form.Item
            name={"width_after"}
            label={processParamLabels.width_after}
            children={<Input />}
            rules={[{ required: true }]}
        />
        <Form.Item
            name={"pin_width"}
            label={processParamLabels.pin_width}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>,
    "stentering": null,
    "compacting": null,
    "brushing": null
};

const ProcessForm = ({ processData, onFinish, className }) => {
    const [processForm] = Form.useForm();

    return (
        <Form
            form={processForm}
            initialValues={processData}
            onFinish={data => console.log(data) || onFinish(data)}
            className={className}
            layout='vertical'
            size='small'
        >
            <Space>
                <Form.Item
                    name={"batchProcessId"}
                    hidden
                    children={<Input />}
                />
                <Form.Item
                    name={"processId"}
                    hidden
                    children={<Input />}
                />
                {processFormFields[processData.processId]}
                <Form.Item label={'----------------'}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size='small'
                        children={"Confirm Save"}
                    />
                </Form.Item>
            </Space>
        </Form>
    );
};

export const BatchEditForm = () => {
    const [batchForm] = Form.useForm();
    const [saveState, saveBatch] = useSaveBatch();

    const { value: wizardState, context: wizardContext } = useBatchCreateWizardState();

    const {
        canOpenAddBatch, canOpenEditBatch, canFinishAddBatch,
        canOpenAddProcess, canOpenEditProcess, canFinishAddProcess,
        canFinishCreateBatch } = useBatchCreateWizardConditions();

    const {
        openAddBatch, openEditBatch, finishAddBatch,
        openAddProcess, openEditProcess, finishAddProcess
    } = useBatchCreateWizardActions();

    const [editingProcessId, setEditingProcessId] = useState(null);

    useEffect(() => {
        if (!saveState.complete) return;

        if (saveState.data instanceof Error) {
            notification.error({
                key: `csend_${Date.now()}`,
                message: "Task Failed",
                description: <>
                    Errors:<br />{JSON.stringify(saveState.data)}
                </>,
                duration: 15
            });
        } else {
            notification.success({
                key: `csend_${Date.now()}`,
                message: "Task Finished",
                description: JSON.stringify(saveState.data),
                duration: 15,
            });
        }
    }, [saveState]);

    return (
        <Spin spinning={saveState.loading}>
            <Row gutter={[12, 12]}>
                <Col md={12} sm={24}>
                    <Card cover={<Typography.Text style={{ paddingTop: 10, textAlign: "center" }} strong underline>Input Wizard</Typography.Text>}>
                        <div>
                            {Object.keys(wizardContext.batchData).length ? <Descriptions layout="vertical" bordered key={`process0`} size="small" column={5}>
                                <Descriptions.Item label="Batch No.">{wizardContext.batchData.batchId}</Descriptions.Item>
                                <Descriptions.Item label="Buyer Name">{wizardContext.batchData.buyerName}</Descriptions.Item>
                                <Descriptions.Item label="FAB. Qty (kg)">{wizardContext.batchData.fabricsQuantity}</Descriptions.Item>
                                <Descriptions.Item label="FAB. Type">{wizardContext.batchData.fabricType}</Descriptions.Item>
                                <Descriptions.Item label="Req. GSM">{wizardContext.batchData.requiredGsm}</Descriptions.Item>
                            </Descriptions> : null}
                            <br />
                        </div>
                        {wizardContext.processList.map((processData, i) => (<div key={`process${i + 1}`}>
                            <Descriptions layout="vertical" bordered size="small" column={5}>{Object.entries(processData).filter(([k]) => k !== "batchProcessId").slice(0, 5).map(([k, v], i) =>
                                <Descriptions.Item label={processParamLabels[k]} key={`pdp-i${i}`}>{processLabels[v] || v}</Descriptions.Item>
                            )}</Descriptions>
                            <br />
                        </div>))}
                        <Space className="justify-center">
                            <Button type='primary' disabled={!canOpenAddBatch()} onClick={openAddBatch}>Add Batch Data</Button>
                            <Button type='primary' disabled={!canOpenAddProcess()} onClick={openAddProcess}>Add Process</Button>
                            <Button type='primary' disabled={!canFinishCreateBatch()} onClick={() => {
                                const batch = { ...wizardContext.batchData, batchProcesses: wizardContext.processList };
                                saveBatch(batch);
                            }}>Save & Create Batch</Button>
                        </Space>
                    </Card>
                </Col>
                {wizardState.addBatch || wizardState.editBatch ? <Col md={12} sm={24}>
                    <Card cover={<Typography.Text style={{ paddingTop: 10, textAlign: "center" }} strong underline>Batch Data</Typography.Text>}>
                        <Form
                            form={batchForm}
                            initialValues={wizardContext.batchData}
                            onFinish={finishAddBatch}
                            className={mcss.batchForm}
                            layout='vertical'
                            size='small'
                        >
                            <Descriptions size='small'>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"batchId"} label="Batch No" children={<Input readOnly />} initialValue={wizardContext.batchData.batchId ? wizardContext.batchData.batchId : Date.now()} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"buyerName"} label="Buyer Name" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"fabricsQuantity"} label="FAB. Qty (kg)" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"fabricType"} label="FAB. Type" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"requiredGsm"} label="Req. GSM" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"pantone"} label="Color/Pantone" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"liquorRatio"} label="Liquor Ratio" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"orderId"} label="Order No" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"styleId"} label="Style No" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"labId"} label="Lab No" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"totalRoll"} label="Total Roll" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"challanNumber"} label="Challan No" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"bycybl"} label={<Typography.Text style={{ fontSize: 12 }}>Body Yarn Count Yarn Brand & Lot</Typography.Text>} children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"bodySLength"} label="Body S. Length" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"rycybl"} label={<Typography.Text style={{ fontSize: 12 }}>Rib Yarn Count Yarn Brand & Lot</Typography.Text>} children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item rules={[{ required: true }]} name={"ribSLength"} label="Rib S. Length" children={<Input />} />
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Form.Item label={'----------------'}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size='small'
                                            children={"Confirm Save"}
                                        />
                                    </Form.Item>
                                </Descriptions.Item>
                            </Descriptions>
                        </Form>
                    </Card>
                </Col> : null}
                {wizardState.addProcess || wizardState.editProcess ? <Col md={12} sm={24}>
                    <Card
                        cover={<Typography.Text
                            style={{ paddingTop: 10, textAlign: "center" }}
                            strong
                            underline
                            children="Process Data" />}
                    >
                        <TileNav
                            onChange={setEditingProcessId}
                            items={[
                                { icon: <PicCenterOutlined />, text: "Squeezer", data: "squeezer" },
                                { icon: <PicLeftOutlined />, text: "Drying", data: "drying" },
                                { icon: <PicRightOutlined />, text: "Slitting", data: "slitting" },
                                { icon: <BlockOutlined />, text: "Stentering", data: "stentering" },
                                { icon: <BuildOutlined />, text: "Compacting", data: "compacting" },
                                { icon: <CompressOutlined />, text: "Brushing", data: "brushing" }
                            ]}
                        />
                        <br />
                        {editingProcessId && <ProcessForm
                            processData={{ ...wizardContext.processData, processId: editingProcessId }}
                            onFinish={finishAddProcess}
                            className={mcss.batchForm}
                        />}
                    </Card>
                </Col> : null}
                <Col span={24}>
                    <Row justify={"center"}>
                        <Col>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Spin>
    );
};
