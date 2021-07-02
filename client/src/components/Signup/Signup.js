import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Form, Button, Input} from 'antd';
import { toggleSignupDrawer } from '../../store/user/userAction';

const Signup = (props) => {

    const {
        openSignupDrawer,
        toggleSignupDrawer
    } = props;

    const onClose = () => {
        toggleSignupDrawer(false)
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        toggleSignupDrawer(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Drawer
                title="Signup"
                width={720}
                onClose={onClose}
                visible={openSignupDrawer}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    name="signupForm"
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
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter your First Name' }]}
                    >
                        <Input placeholder="Please enter your First Name" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter your Last Name' }]}
                    >
                        <Input placeholder="Please enter your Last Name" />
                    </Form.Item>
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
        openSignupDrawer: state.user.openSignupDrawer
    }
};

export default connect(mapStateToProps, { toggleSignupDrawer })(Signup)
