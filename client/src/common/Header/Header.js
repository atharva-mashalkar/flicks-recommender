import React, {useEffect, useState} from 'react'
import { Layout, Button, Row, Col } from "antd";
import { connect } from 'react-redux'
import { 
    toggleSignupDrawer, 
    toggleLoginDrawer,
    userLogedOut
} from '../../store/user/userAction';
import { useHistory } from "react-router-dom";

const { Header} = Layout;

function HeaderComponent(props) {
    let history = useHistory();

    const [loggedIn, setLoggedIn] = useState(false);

    const {
        toggleSignupDrawer,
        toggleLoginDrawer,
        userLogedOut,
        token
    } = props;

    const showSignupDrawer = () => {
        toggleSignupDrawer(true);
    };

    const showLoginDrawer = () => {
        toggleLoginDrawer(true);
    }
    
    useEffect(() => {
        if(token){
            setLoggedIn(true);
        }
        else{
            setLoggedIn(false);
        }
    },[token]);

    const logOut = () => {
        localStorage.removeItem("JWT-Token");
        userLogedOut();
        history.push('/');
    }

    const loggedInHeader = () => {
        return (
            <Row 
                align="middle" 
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} 
            >
                <Col 
                    className="gutter-row" 
                    span={1} 
                    align="start" 
                    offset="0"
                >
                    <Button 
                        size="large" 
                        style={{ borderRadius: '10px' }} 
                        onClick={logOut}
                    >
                        Logout
                    </Button>
                </Col>
            </Row>
        )
    }

    const notLoggedInHeader = () => {
        return (
            <Row 
                align="middle" 
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} 
            >
                <Col 
                    className="gutter-row" 
                    span={1} 
                    align="center" 
                    xs={{ offset: "4" }} 
                    sm={{ offset: "8" }} 
                    md={{ offset: "16" }} 
                    lg={{ offset: '20' }}
                >
                    <Button 
                        size="large" 
                        style={{ borderRadius: '10px' }} 
                        onClick={showSignupDrawer}
                    >
                        Signup
                    </Button>
                </Col>
                <Col 
                    className="gutter-row" 
                    span={1} 
                    align="start" 
                    xs={{ offset: "8" }} 
                    sm={{ offset: "4" }} 
                    md={{ offset: "2" }} 
                    lg={{ offset: '1' }}
                >
                    <Button 
                        size="large" 
                        style={{ borderRadius: '10px' }}
                        onClick={showLoginDrawer}
                    >
                        Login
                    </Button>
                </Col>
            </Row>
        )
    };

    return (
        <Header>
            {
                loggedIn ? loggedInHeader() : notLoggedInHeader()
            }
        </Header>
    )
}

const mapStateToProps = (state) => {
    return{
        token:state.user.token,
    }
};

export default connect(mapStateToProps, {
    toggleSignupDrawer,
    toggleLoginDrawer,
    userLogedOut
})(HeaderComponent)
