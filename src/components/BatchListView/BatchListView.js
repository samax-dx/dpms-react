import mcss from './BatchListView.module.css';

import React, { useEffect } from "react";
import { Descriptions, Space } from "antd";
import { SemiCollapse } from "../SemiCollapse/SemiCollapse";
import { useBatchList } from "../../services/BatchRepository";
import dayjs from 'dayjs';


export const BatchListViewItem = ({ batch }) => {
    return (
        <div className={mcss.batchCard}>
            <SemiCollapse semiHeight={60}>
                <Descriptions size='small'>
                    <Descriptions.Item label="Batch No">{batch.batchId}</Descriptions.Item>
                    <Descriptions.Item label="Buyer Name">{batch.buyerName}</Descriptions.Item>
                    <Descriptions.Item label="FAB. Qty (kg)">{batch.fabricsQuantity}</Descriptions.Item>
                    <Descriptions.Item label="FAB. Type">{batch.fabricType}</Descriptions.Item>
                    <Descriptions.Item label="Req. GSM">{batch.requiredGsm}</Descriptions.Item>
                    <Descriptions.Item label="Color/Pantone">{batch.pantone}</Descriptions.Item>
                    <Descriptions.Item label="Liquor Ratio">{batch.liquorRatio}</Descriptions.Item>
                    <Descriptions.Item label="Order No">{batch.orderId}</Descriptions.Item>
                    <Descriptions.Item label="Style No">{batch.styleId}</Descriptions.Item>
                    <Descriptions.Item label="Lab No">{batch.labId}</Descriptions.Item>
                    <Descriptions.Item label="Total Roll">{batch.totalRoll}</Descriptions.Item>
                    <Descriptions.Item label="Challan No">{batch.challanNumber}</Descriptions.Item>
                    <Descriptions.Item label="Body Yarn Count Yarn Brand & Lot">{batch.bycybl}</Descriptions.Item>
                    <Descriptions.Item label="Body S. Length">{batch.bodySxLength}</Descriptions.Item>
                    <Descriptions.Item label="Rib Yarn Count Yarn Brand & Lot">{batch.rycybl}</Descriptions.Item>
                    <Descriptions.Item label="Rib S. Length">{batch.ribSxLength}</Descriptions.Item>
                    <Descriptions.Item label="Created On">{dayjs(batch.createdOn).format('DD/MM/YYYY - hh:mm A')}</Descriptions.Item>
                </Descriptions>
            </SemiCollapse>
        </div>
    );
}

export const BatchListView = ({ items: managedList, className, renderItem }) => {
    var [batchListLoadable, setBatchQueryFilter] = useBatchList();
    managedList && (batchListLoadable = { contents: managedList, state: "hasValue" });

    useEffect(() => void (managedList || setBatchQueryFilter("")), []);

    switch (batchListLoadable.state) {
        case "hasValue":
            return (
                <Space direction="vertical" size={"large"} style={{ padding: "5px 0" }}>
                    {batchListLoadable.contents.map((item, i) => (
                        <Space key={`bi-i${i}`}>
                            {renderItem ? renderItem(item, i) : <BatchListViewItem batch={item} />}
                        </Space>
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
