import React, {useEffect} from 'react'
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
    loginUser
} from '../../store/user/userAction';
import { useHistory } from "react-router-dom";

const Login = (props) => {
    let history = useHistory();

    const {
        toggleLoginDrawer,
        loginUser,
        openLoginDrawer,
        failed_req,
        processing_reg,
        userInfo,
        token,
    } = props;

    useEffect(() => {
        if(userInfo){
            localStorage.setItem('JWT-Token', token);
            message.success('User Verified',0.8)
            .then(()=> {
                toggleLoginDrawer(false)
                history.push('/dashboard')
            })
        }
    },[userInfo]);

    useEffect(() => {
        if(failed_req && openLoginDrawer){
            message.error(failed_req.msg,3);
        }
    },[failed_req]);

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
                        <Button type="primary" htmlType="submit" loading={processing_reg}>
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
    loginUser,
})(Login)
