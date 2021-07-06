import React from 'react'
import { Layout, Row, Col, Descriptions } from "antd";
import { PhoneOutlined, CopyrightOutlined } from '@ant-design/icons';

const { Footer } = Layout;

function FooterComponent() {
    return (
        <Footer style={{ textAlign: 'center' }}>
            <Descriptions>
                <Row align="middle" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" align='center' span={5} xs={{ offset: "2" }} sm={{ offset: "4" }} md={{ offset: "6" }} lg={{ offset: '7' }}>
                        <h3 style={{ textAlign: 'center' }}><CopyrightOutlined />   Developed by <b>Atharva Mashalkar</b></h3>
                    </Col>
                    <Col className="gutter-row" span={4} xs={{ offset: "2" }} sm={{ offset: "2" }} md={{ offset: "1" }} lg={{ offset: '1' }}>
                        <h3><PhoneOutlined />   Phone: <b>(+91) 7620099155</b></h3>
                    </Col>
                </Row>
            </Descriptions>
        </Footer>
    )
}

export default FooterComponent
