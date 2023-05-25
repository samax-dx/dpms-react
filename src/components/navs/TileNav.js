import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Radio, Row, Space, Tag, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Text } = Typography;


export const TileNav = ({ items, selectedItem, onChange = (() => { }), onCancel = (() => { }), editable }) => {
    const [activeItem, setActiveItem] = useState(selectedItem);

    useEffect(() => setActiveItem(selectedItem), [selectedItem])
    useEffect(() => onChange(activeItem), [activeItem]);

    return (
        <Radio.Group>
            <Row gutter={[10, 10]} style={{ marginLeft: 0, marginRight: 0 }}>
                {activeItem ? null : items.map((item, i) => <Col span={6} key={`tn-i${i}`}>
                    <Card
                        hoverable
                        className={activeItem === item.data ? "cr-active" : ""}
                        style={{ margin: '0 auto', textAlign: 'center' }}
                        onClick={() => setActiveItem(item.data)}
                        size='small'
                    >
                        <Card.Meta title={item.icon}
                            description={(
                                <Radio.Button value={item.data} style={{ border: "none" }} checked={activeItem === item.data}>
                                    <Text type={activeItem === item.data ? "success" : "warning"}>{item.text}</Text>
                                </Radio.Button>
                            )}
                        />
                    </Card>
                </Col>)}
                {activeItem ? <Space direction='vertical'>
                    <div>
                        <Space>
                            <Text type='danger'>*</Text>
                            <Text>Process : </Text>
                            <Tag color='blue'><Text strong>{items.find(v => v.data === activeItem).text}</Text></Tag>
                        </Space>
                        <Button icon={<EditOutlined />} size='small' disabled={!editable} onClick={() => setActiveItem(undefined)} />
                    </div>
                    <br />
                </Space> : null}
                {activeItem ? null : <Col span={6} key={`tn-i${items.length}`}>
                    <Card
                        hoverable
                        style={{ margin: '0 auto', textAlign: 'center', borderColor: "red" }}
                        onClick={onCancel}
                        size='small'
                    >
                        <Card.Meta title={"."}
                            description={(
                                <Radio.Button style={{ border: "none" }}>
                                    <Text type={"danger"} italic>Cancel Edit</Text>
                                </Radio.Button>
                            )}
                        />
                    </Card>
                </Col>}
            </Row>
        </Radio.Group>
    );
};
