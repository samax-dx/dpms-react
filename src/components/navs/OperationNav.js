import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Space, Typography } from 'antd';
import { AimOutlined, ApiOutlined, EyeOutlined, GiftOutlined, TagOutlined, UsbOutlined } from '@ant-design/icons';

const { Text } = Typography;


export const OperationNav = () => {
    return (
        <Row gutter={[10, 10]} style={{ marginLeft: 0, marginRight: 0 }}>
            <Col span={8}>
                <Link to={'/dyeing'}>
                    <Card
                        hoverable
                        style={{ margin: '0 auto', textAlign: 'center' }}
                    >
                        <Card.Meta title={<AimOutlined />} description={<Text type='success'>Dyeing</Text>} />
                    </Card>
                </Link>
            </Col>
            <Col span={8}>
                <Link to={'/slitting'}>
                    <Card
                        hoverable
                        style={{ margin: '0 auto', textAlign: 'center' }}
                    >
                        <Card.Meta title={<ApiOutlined />} description={<Text type='success'>Slitting</Text>} />
                    </Card>
                </Link>
            </Col>
            <Col span={8}>
                <Link to={'/stenter'}>
                    <Card
                        hoverable
                        style={{ margin: '0 auto', textAlign: 'center' }}
                    >
                        <Card.Meta title={<EyeOutlined />} description={<Text type='success'>Stenter</Text>} />
                    </Card>
                </Link>
            </Col>
            <Col span={8}>
                <Link to={'/compector'}>
                    <Card
                        hoverable
                        style={{ margin: '0 auto', textAlign: 'center' }}
                    >
                        <Card.Meta title={<TagOutlined />} description={<Text type='success'>Compector</Text>} />
                    </Card>
                </Link>
            </Col>
            <Col span={8}>
                <Link to={'/delivery'}>
                    <Card
                        hoverable
                        style={{ margin: '0 auto', textAlign: 'center' }}
                    >
                        <Card.Meta title={<UsbOutlined />} description={<Text type='success'>Delivery</Text>} />
                    </Card>
                </Link>
            </Col>
        </Row>
    );
};