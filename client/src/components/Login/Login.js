import React from 'react'
import { connect } from 'react-redux'
import { 
    Drawer, 
    Form, 
    Button, 
    Input,
    message,
} from 'antd';
import { 
    toggleLoginDrawer,
    clearProps,
    loginUser
} from '../../store/user/userAction';
import { useHistory } from "react-router-dom";

const Login = (props) => {

    const {
        toggleLoginDrawer,
        clearProps,
        loginUser,
        openLoginDrawer,
        failed_req,
        processing_reg,
        userInfo,
        token,
    } = props;

    const onClose = () => {
        toggleLoginDrawer(false)
    };

    const onFinish = (values) => {
        loginUser(values)
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Please fill in all the fields of the form',3);
    };

    return (
        <>
            <Drawer
                title="Login"
                width={720}
                onClose={onClose}
                visible={openLoginDrawer}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    name="loginForm"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 13,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter your Username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        openLoginDrawer: state.user.openLoginDrawer,
        failed_req: state.user.failed_req,
        processing_reg: state.user.processing_reg,
        userInfo:state.user.userInfo,
        token:state.user.token
    }
};

export default connect(mapStateToProps, { 
    toggleLoginDrawer, 
    clearProps,
    loginUser,
})(Login)
