import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { Spin, Layout, Row, Col, Image, Divider } from "antd";
import { useHistory } from "react-router-dom";
import { 
    verifyToken,
    toggleModal,
    toggleMovieModal
} from "../../store/user/userAction";
import { 
    getAllTopMovies,
    getPersonalizedRecommendations,
    selectMovie
} from "../../store/movie/movieAction";
import ExplicitRatingModal from "./ExplicitRatingModal";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MovieInfoModal from './MovieInfoModal';

const { Content } = Layout;

const Dashboard = (props) => {
    let history = useHistory();

    const {
        getPersonalizedRecommendations,
        verifyToken,
        getAllTopMovies,
        toggleModal,
        toggleMovieModal,
        selectMovie,
        userInfo,
        allTopMovies,
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
        if(!allTopMovies && token && userInfo && userInfo.moviesRated.length !== 0){
            getAllTopMovies()
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
            getPersonalizedRecommendations(null)
        }
    },[userInfo]);

    useEffect(() => {
        window.scrollTo(0, 0);
    },[per_recommendations]);

    const showMovieInfo = (movie) => {
        selectMovie(movie)
        toggleMovieModal(true)
    }

    const displayRecommendations = () => {
        return (
            <>
                { per_recommendations ?
                Object.keys(per_recommendations).map((genre) =>
                    <>
                        <Divider dashed orientation="left">{genre}</Divider>
                        <Carousel
                            autoFocus={true}
                            autoPlay={true}
                            centerMode={true}
                            centerSlidePercentage={25}
                            dynamicHeight={false}
                            emulateTouch={true}
                            infiniteLoop={true}
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                        >
                            {
                                per_recommendations[genre].map(movie =>
                                    <div key={movie.imdbID} onClick={() => showMovieInfo(movie)}>
                                        <Image
                                            width={200}
                                            height={350}
                                            src={movie.Poster}
                                            alt={movie.Title}
                                            preview={false}
                                        />
                                    </div>
                                )
                            }
                        </Carousel>
                    </>
                ):null}
            </>
        )
    }

    return (
        <Layout>
            <Header />
            <Content style={{ padding: '30px 0px', height: '100%'}}>
                {
                    userInfo && userInfo.moviesRated.length === 0  ? 
                    (
                        <ExplicitRatingModal/>
                    ):
                    <>
                    {
                        loading_per_recommendations ? 
                        (
                            <Row align="middle" gutter='32' style={{'height':'750px'}}>
                                <Col span={2} offset={11}>
                                    <Spin size="large" />
                                </Col>
                            </Row>
                        ):
                        (
                            <>
                                {
                                    per_failure && !per_recommendations? 
                                    <h1 style={{textAlign:"center"}}> Something went wrong. Please try refreshing the page</h1> :
                                    displayRecommendations()
                                }
                                <MovieInfoModal/>
                            </>
                        )
                    }
                    </>
                }
            </Content>
            <Footer/>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return{
        userInfo:state.user.userInfo,
        allTopMovies: state.movie.allTopMovies,
        userInfo:state.user.userInfo,
        token:state.user.token,
        loading_per_recommendations:state.movie.loading_per_recommendations,
        per_recommendations:state.movie.per_recommendations,
        per_failure:state.movie.per_failure,
    }
}

export default connect(mapStateToProps,{
    verifyToken,
    getAllTopMovies,
    toggleModal,
    getPersonalizedRecommendations,
    selectMovie,
    toggleMovieModal
})(Dashboard)
