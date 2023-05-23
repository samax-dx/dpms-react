import mcss from './BatchEditForm.module.css';

import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import * as R from 'ramda';
import { Button, Card, Col, Descriptions, Form, Input, Row, Space, Spin, Typography, notification } from "antd";
import { PicCenterOutlined, PicLeftOutlined, PicRightOutlined, BlockOutlined, BuildOutlined, CompressOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSaveBatch } from '../../services/BatchRepository';
import { useBatchCreateWizardActions, useBatchCreateWizardConditions, useBatchCreateWizardContext } from '../../services/BatchCreateWizard';
import { TileNav } from '../navs/TileNav';
import { dndDragEndDetailState } from '../../services/BeautifulDnD';


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
    "pin_width": "Spreader/Pin Width",
    "padder_pressure": "Padder Pressure",
    "machine_speed": "Machine Speed"
};

const processFormFields = {
    "squeezer": <>
        <Form.Item
            name={"machine_speed"}
            label={processParamLabels.machine_speed}
            children={<Input />}
            rules={[{ required: true }]}
        />
        <Form.Item
            name={"padder_pressure"}
            label={processParamLabels.padder_pressure}
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
        <Form.Item
            name={"padder_pressure"}
            label={processParamLabels.padder_pressure}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>,
    "slitting": <>
        <Form.Item
            name={"padder_pressure"}
            label={processParamLabels.padder_pressure}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>,
    "stentering": <>
        <Form.Item
            name={"padder_pressure"}
            label={processParamLabels.padder_pressure}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>,
    "compacting": <>
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
            name={"padder_pressure"}
            label={processParamLabels.padder_pressure}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>,
    "brushing": <>
        <Form.Item
            name={"padder_pressure"}
            label={processParamLabels.padder_pressure}
            children={<Input />}
            rules={[{ required: true }]}
        />
    </>
};

const ProcessForm = ({ processData, onFinish, onCancel, className }) => {
    return (
        <Form
            initialValues={processData}
            onFinish={onFinish}
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
                <Form.Item label={'---------'}>
                    <Button
                        type="primary"
                        size='small'
                        onClick={onCancel}
                        children={"Cancel"}
                    />
                </Form.Item>
            </Space>
        </Form>
    );
};

const BatchForm = ({ batchData, onFinish, onCancel, className }) => {
    return (
        <Form
            initialValues={batchData.batchId ? batchData : { ...batchData, batchId: Date.now() }}
            onFinish={onFinish}
            className={className}
            layout='vertical'
            size='small'
        >
            <Descriptions size='small'>
                <Descriptions.Item>
                    <Form.Item rules={[{ required: true }]} name={"batchId"} label="Batch No" children={<Input readOnly />} />
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
                    <Form.Item label={'---------'}>
                        <Button
                            type="primary"
                            size='small'
                            onClick={onCancel}
                            children={"Cancel"}
                        />
                    </Form.Item>
                </Descriptions.Item>
            </Descriptions>
        </Form>
    );
};

export const BatchEditForm = () => {
    const [saveState, saveBatch] = useSaveBatch();

    const wizardContext = useBatchCreateWizardContext();

    const {
        canOpenEditBatch, isEditingBatch, canFinishEditBatch, hasFinishedEditBatch,
        canOpenEditProcess, isEditingProcess, canFinishEditProcess, hasFinishedEditProcess,
        canFinishEdit } = useBatchCreateWizardConditions();

    const {
        openEditBatch, syncEditBatch, finishEditBatch,
        openEditProcess, syncEditProcess, finishEditProcess,
        restoreBatchState
    } = useBatchCreateWizardActions();

    const dragEndState = useRecoilValue(dndDragEndDetailState);

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

    useEffect(() => {
        const { source, destination } = dragEndState.result;
        const syncBatchList = list => restoreBatchState(wizardContext.batchData, list);
        destination && syncBatchList(R.move(source.index, destination.index, wizardContext.processList));
    }, [dragEndState]);

    return (
        <Spin spinning={saveState.loading}>
            <Row gutter={[12, 12]}>
                <Col md={12} sm={24}>
                    <Card cover={<Typography.Text style={{ paddingTop: 10, textAlign: "center" }} strong underline>Input Wizard</Typography.Text>}>
                        <div>
                            {wizardContext.batchData.batchId ? <Space.Compact block>
                                <Descriptions layout="vertical" style={{ flexGrow: 1 }} bordered key={`process0`} size="small" column={5}>
                                    <Descriptions.Item label="Batch No.">{wizardContext.batchData.batchId}</Descriptions.Item>
                                    <Descriptions.Item label="Buyer Name">{wizardContext.batchData.buyerName}</Descriptions.Item>
                                    <Descriptions.Item label="FAB. Qty (kg)">{wizardContext.batchData.fabricsQuantity}</Descriptions.Item>
                                    <Descriptions.Item label="FAB. Type">{wizardContext.batchData.fabricType}</Descriptions.Item>
                                    <Descriptions.Item label="Req. GSM">{wizardContext.batchData.requiredGsm}</Descriptions.Item>
                                </Descriptions>
                                <Space.Compact direction='vertical'>
                                    <Button icon={<EditOutlined />} onClick={() => openEditBatch(wizardContext.batchData)} />
                                    <Button icon={<DeleteOutlined />} disabled />
                                </Space.Compact>
                            </Space.Compact> : null}
                            <br />
                        </div>
                        {wizardContext.processList.length > 0 ? <Droppable droppableId={"process_list"}>
                            {ddHelper => (
                                <div {...ddHelper.droppableProps} ref={ddHelper.innerRef} >
                                    {wizardContext.processList.map((procData, i) => (
                                        <Draggable key={`pr_k${i}`} draggableId={`pr_i${i}`} index={i}>
                                            {ddHelper => (
                                                <div {...ddHelper.draggableProps} {...ddHelper.dragHandleProps} ref={ddHelper.innerRef}>
                                                    <div style={{ display: procData.__new || procData.__deleted ? "none" : undefined }}>
                                                        <Space.Compact block>
                                                            <Descriptions layout="vertical" size="small" column={5} bordered style={{ flexGrow: 1 }}>
                                                                <Descriptions.Item label={"#"} key={`pdi-i${i}`} style={{ width: 10 }}>{i + 1}</Descriptions.Item>
                                                                {Object.entries(procData).filter(([k]) => !["batchProcessId", "processOrder", "__deleted", "__new"].includes(k)).slice(0, 5).map(([k, v], i) => (
                                                                    <Descriptions.Item label={processParamLabels[k]} key={`pdp-i${i}`}>{processLabels[v] || v}</Descriptions.Item>
                                                                ))}
                                                            </Descriptions>
                                                            <Space.Compact direction='vertical'>
                                                                <Button icon={<EditOutlined />} onClick={() => openEditProcess(procData, i)} />
                                                                <Button icon={<DeleteOutlined />} onClick={() => restoreBatchState(wizardContext.batchData, procData.batchProcessId ? R.move(i, wizardContext.processList.length - 1, R.update(i, { ...procData, __deleted: true }, wizardContext.processList)) : R.remove(i, 1, wizardContext.processList))} />
                                                            </Space.Compact>
                                                        </Space.Compact>
                                                        <br />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {ddHelper.placeholder}
                                </div>
                            )}
                        </Droppable> : null}
                        <Space className="justify-center">
                            <Button type='primary' disabled={!canOpenEditBatch() || !!wizardContext.batchData.batchId} onClick={() => openEditBatch({ processList: [] })}>Add Batch Data</Button>
                            <Button type='primary' disabled={!canOpenEditProcess()} onClick={() => openEditProcess({ __new: true }, wizardContext.processList.length)}>Add Process</Button>
                            <Button type='primary' disabled={!canFinishEdit()} onClick={() => saveBatch({ ...wizardContext.batchData, batchProcesses: wizardContext.processList })}>
                                {!!wizardContext.batchData.createdOn ? "Update & Save Batch" : "Save & Create Batch"}
                            </Button>
                        </Space>
                    </Card>
                </Col>
                {isEditingBatch() ? <Col md={12} sm={24}>
                    <Card cover={<Typography.Text style={{ paddingTop: 10, textAlign: "center" }} strong underline>Batch Data</Typography.Text>}>
                        <BatchForm
                            batchData={wizardContext.batchData}
                            onFinish={finishEditBatch}
                            onCancel={() => restoreBatchState(wizardContext.batchData, wizardContext.processList)}
                            className={mcss.batchForm}
                        />
                    </Card>
                </Col> : null}
                {isEditingProcess() ? <Col md={12} sm={24}>
                    <Card
                        cover={<Typography.Text
                            style={{ paddingTop: 10, textAlign: "center" }}
                            strong
                            underline
                            children="Process Data" />}
                    >
                        <TileNav
                            onChange={processId => R.pipe(({ processList: pl, editIndex: i }) => syncEditProcess({ ...pl[i], processId }, i))({ ...wizardContext })}
                            items={[
                                { icon: <PicCenterOutlined />, text: "Squeezer", data: "squeezer" },
                                { icon: <PicLeftOutlined />, text: "Drying", data: "drying" },
                                { icon: <PicRightOutlined />, text: "Slitting", data: "slitting" },
                                { icon: <BlockOutlined />, text: "Stentering", data: "stentering" },
                                { icon: <BuildOutlined />, text: "Compacting", data: "compacting" },
                                { icon: <CompressOutlined />, text: "Brushing", data: "brushing" }
                            ]}
                            selectedItem={wizardContext.processList[wizardContext.editIndex].processId}
                            editable={wizardContext.processList[wizardContext.editIndex].__new}
                            onCancel={() => restoreBatchState(wizardContext.batchData, wizardContext.processList.filter(p => !!p.processId))}
                        />
                        <br />
                        {wizardContext.editIndex >= 0 && wizardContext.processList[wizardContext.editIndex].processId ? <>
                            <ProcessForm
                                processData={{ ...wizardContext.processList[wizardContext.editIndex] }}
                                onFinish={procData => finishEditProcess({ ...procData, __new: undefined })}
                                onCancel={() => restoreBatchState(wizardContext.batchData, wizardContext.processList)}
                                className={mcss.processForm}
                            />
                        </> : null}
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
