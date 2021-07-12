import React from 'react'
import { Row, Col, Spin } from 'antd';

function Loader() {
    return (
        <Row align="middle" gutter='32' style={{ 'height': '750px' }}>
            <Col span={2} offset={11}>
                <Spin size="large" />
            </Col>
        </Row>
    )
}

export default Loader
