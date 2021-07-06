import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { Spin, Layout, Row, Col, Image } from "antd";
import { useHistory } from "react-router-dom";
import { 
    verifyToken,
    toggleModal
} from "../../store/user/userAction";
import { getGenralRecommendations } from "../../store/movie/movieAction";

const { Content } = Layout;

const Dashboard = (props) => {
    let history = useHistory();

    const {
        verifyToken,
        getGenralRecommendations,
        toggleModal,
        userInfo,
        moviesInfo,
        token
    } = props;

    useEffect(() => {
        const jwtToken = localStorage.getItem("JWT-Token")
        if(jwtToken && jwtToken!==undefined && !token){
            verifyToken(jwtToken)
        }
        if(!moviesInfo){
            getGenralRecommendations()
        }
        if(!jwtToken){
            history.push('/')
        }
    },[])

    return (
        <Layout>
            <Header />
            <Content style={{ padding: '30px 0px', height: '100%'}}>
                
            </Content>
            <Footer/>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return{
        userInfo:state.user.userInfo,
        moviesInfo: state.movie.moviesInfo,userInfo:state.user.userInfo,
        token:state.user.token
    }
}

export default connect(mapStateToProps,{
    verifyToken,
    getGenralRecommendations,
    toggleModal
})(Dashboard)
