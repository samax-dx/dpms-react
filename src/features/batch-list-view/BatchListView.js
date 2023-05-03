import mcss from './BatchListView.module.css';

import React, { useEffect } from "react";
import { Card, Descriptions, List, Space } from "antd";
import { SemiCollapse } from "../semi-collapse/SemiCollapse";
import { useBatchList } from "../../services/BatchRepository";
import dayjs from 'dayjs';


export const BatchListView = ({ items: managedList, className, render: renderActionbar }) => {
    var [batchListLoadable, setBatchQueryFilter] = useBatchList();
    managedList && (batchListLoadable = { contents: managedList, state: "hasValue" });

    useEffect(() => setBatchQueryFilter(""), []);

    switch (batchListLoadable.state) {
        case "hasValue":
            return (
                <Space direction="vertical" size={"middle"} style={{ padding: "5px 0" }}>
                    {batchListLoadable.contents.map((item, i) => (
                        <Space.Compact direction="horizontal" block key={`bi-i${i}`}>
                            <div className={mcss.batchCard}>
                                <SemiCollapse semiHeight={60}>
                                    <Descriptions size='small'>
                                        <Descriptions.Item label="Batch No">{item.batchId}</Descriptions.Item>
                                        <Descriptions.Item label="Buyer Name">{item.buyerName}</Descriptions.Item>
                                        <Descriptions.Item label="FAB. Qty (kg)">{item.fabricsQuantity}</Descriptions.Item>
                                        <Descriptions.Item label="FAB. Type">{item.fabricType}</Descriptions.Item>
                                        <Descriptions.Item label="Req. GSM">{item.requiredGsm}</Descriptions.Item>
                                        <Descriptions.Item label="Color/Pantone">{item.pantone}</Descriptions.Item>
                                        <Descriptions.Item label="Liquor Ratio">{item.liquorRatio}</Descriptions.Item>
                                        <Descriptions.Item label="Order No">{item.orderId}</Descriptions.Item>
                                        <Descriptions.Item label="Style No">{item.styleId}</Descriptions.Item>
                                        <Descriptions.Item label="Lab No">{item.labId}</Descriptions.Item>
                                        <Descriptions.Item label="Total Roll">{item.totalRoll}</Descriptions.Item>
                                        <Descriptions.Item label="Challan No">{item.challanNumber}</Descriptions.Item>
                                        <Descriptions.Item label="Body Yarn Count Yarn Brand & Lot">{item.bycybl}</Descriptions.Item>
                                        <Descriptions.Item label="Body S. Length">{item.bodySLength}</Descriptions.Item>
                                        <Descriptions.Item label="Rib Yarn Count Yarn Brand & Lot">{item.rycybl}</Descriptions.Item>
                                        <Descriptions.Item label="Rib S. Length">{item.ribSLength}</Descriptions.Item>
                                        <Descriptions.Item label="Created On">{dayjs(item.createdOn).format('DD/MM/YYYY - hh:mm A')}</Descriptions.Item>
                                    </Descriptions>
                                </SemiCollapse>
                            </div>
                            <div className={mcss.batchActions}>
                                {renderActionbar ? renderActionbar(item) : null}
                            </div>
                        </Space.Compact>
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
};
