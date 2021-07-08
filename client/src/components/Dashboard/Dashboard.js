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
import { 
    getGeneralRecommendations,
    getPersonalizedRecommendations
} from "../../store/movie/movieAction";
import Modal from "./InfoModal";

const { Content } = Layout;

const Dashboard = (props) => {
    let history = useHistory();

    const {
        getPersonalizedRecommendations,
        verifyToken,
        getGeneralRecommendations,
        toggleModal,
        userInfo,
        moviesInfo,
        token,
        loading_per_recommendations,
        per_recommendations,
        per_failure
    } = props;

    useEffect(() => {
        const jwtToken = localStorage.getItem("JWT-Token")
        if(jwtToken && jwtToken!==undefined && !token){
            verifyToken(jwtToken)
        }
        if(!moviesInfo){
            getGeneralRecommendations()
        }
        if(!jwtToken){
            history.push('/')
        }
    },[])

    useEffect(() => {
        if(userInfo && userInfo.moviesRated.length === 0){
            toggleModal(true)
        }
        if(userInfo && userInfo.moviesRated.length !== 0){
            getPersonalizedRecommendations(userInfo.moviesRated)
        }
    },[userInfo]);


    return (
        <Layout>
            <Header />
            <Content style={{ padding: '30px 0px', height: '100%'}}>
                {
                    userInfo && userInfo.moviesRated.length === 0  ? 
                    (
                        <Modal/>
                    ):
                    <h1>Welcome to Dashboard</h1>
                }
            </Content>
            <Footer/>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return{
        userInfo:state.user.userInfo,
        moviesInfo: state.movie.moviesInfo,userInfo:state.user.userInfo,
        token:state.user.token,
        loading_per_recommendations:state.movie.loading_per_recommendations,
        per_recommendations:state.movie.per_recommendations,
        per_failure:state.movie.per_failure
    }
}

export default connect(mapStateToProps,{
    verifyToken,
    getGeneralRecommendations,
    toggleModal,
})(Dashboard)
