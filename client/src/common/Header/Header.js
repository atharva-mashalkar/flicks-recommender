import React from 'react'
import { Layout, Button, Row, Col } from "antd"
const { Header} = Layout;

function HeaderComponent() {
    return (
        <Header>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={1} align="center" xs={{ offset: "4" }} sm={{ offset: "8" }} md={{ offset: "16" }} lg={{ offset: '20' }}>
                    <Button size="large" style={{ borderRadius: '10px' }}>
                        Signup
                    </Button>
                </Col>
                <Col className="gutter-row" span={1} align="start" xs={{ offset: "8" }} sm={{ offset: "4" }} md={{ offset: "2" }} lg={{ offset: '1' }}>
                    <Button size="large" style={{ borderRadius: '10px' }}>
                        Login
                    </Button>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderComponent
