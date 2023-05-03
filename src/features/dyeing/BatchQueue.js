import React, { useEffect, useState } from "react";
import { Button, Col, Descriptions, Row, Space, Table } from "antd";


export const DyeingQueue = ({ canLoad, onLoad }) => {
    const [tasks, setTasks] = useState([
        {
            batchNumber: 56323,
            machineNumber: 19385,
            loadTime: <Space>...<Button>Load</Button></Space>,
            unloadTime: "..."
        },
        {
            batchNumber: 38462,
            machineNumber: 19385,
            loadTime: <Space>...<Button>Load</Button></Space>,
            unloadTime: "..."
        },
        {
            batchNumber: 89390,
            machineNumber: 19385,
            loadTime: <Space>...<Button>Load</Button></Space>,
            unloadTime: "..."
        }
    ]);

    const loadTask = task => setTasks(tasks.filter(t => t.batchNumber !== task.batchNumber)) || onLoad(task);

    return (
        <Row>
            <Col span={24}>
                <Descriptions title="Queued Batches" className="lowTitleGap">
                    <Descriptions.Item>
                        <Table
                            style={{ width: "100%" }}
                            bordered
                            dataSource={tasks}
                            size="small"
                        >
                            <Table.Column title="Batch No." dataIndex="batchNumber" />
                            <Table.Column title="Machine No." dataIndex="machineNumber" />
                            <Table.Column
                                title="Action"
                                render={r => <Button disabled={canLoad} onClick={() => loadTask(r)}>Load</Button>}
                            />
                            {/*<Table.ColumnGroup title="Planning Time">
                            <Table.Column title="Load Time" dataIndex="loadTime" />
                            <Table.Column title="Unload Time" dataIndex="unloadTime" />
                        </Table.ColumnGroup>*/}
                        </Table>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    );
};
