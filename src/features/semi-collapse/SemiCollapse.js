import {} from './SemiCollapse.module.css';

import React, { useState } from "react";
import { Checkbox, Col, Row } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

export const SemiCollapse = ({ semiHeight, children }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Row justify={"center"} className={`semi-collapse${collapsed ? '' : ' open'}`}>
            <Col className='content-box' span={24} style={collapsed ? { maxHeight: semiHeight } : {}}>
                {children}
            </Col>
            <Col className='toggle-box'>
                <Checkbox onChange={e => setCollapsed(!e.target.checked)}>{collapsed ? <CaretDownOutlined /> : <CaretUpOutlined />}</Checkbox>
            </Col>
        </Row>
    );
};
