import React, { useEffect, useState } from 'react';
import { Card, Col, Radio, Row, Typography } from 'antd';

const { Text } = Typography;


export const TileNav = ({ items, onChange = (() => {}) }) => {
    const [activeItem, setActiveItem] = useState("");

    useEffect(() => onChange(activeItem), [activeItem]);

    return (
        <Radio.Group>
            <Row gutter={[10, 10]} style={{ marginLeft: 0, marginRight: 0 }}>
                {items.map((item, i) => <Col span={6} key={`tn-i${i}`}>
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
            </Row>
        </Radio.Group>
    );
};
