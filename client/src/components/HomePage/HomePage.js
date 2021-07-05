import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { getGenralRecommendations } from "../../store/movie/movieAction";
import { Spin, Layout, Divider, Row, Col, Image } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Signup from "../Signup";
import Login from "../Login";

const { Content } = Layout;

const HomePage = (props) => {

    const {
        getGenralRecommendations,
        failedRequest,
        loading,
        moviesInfo,
    } = props;

    useEffect(() => {
        getGenralRecommendations()
        let token = localStorage.getItem("JWT-Token")
        
    },[])

    const displayMovies = () => {
        return (
            <>
                { moviesInfo ?
                Object.keys(moviesInfo).map((genre) =>
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
                                moviesInfo[genre].map(movie =>
                                    <div key={movie.imdbID}>
                                        {/* <h4>{movie.Title}</h4> */}
                                        <Image
                                            width={200}
                                            src={movie.Poster}
                                            onError={() => "Image not available"}
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
                <Signup />
                <Login/>
                {loading ?
                    (
                        <Row align="middle" gutter='32'>
                            <Col span={2} offset={11}>
                                <Spin size="large" />
                            </Col>
                        </Row>
                    ) :
                    (
                        <>
                            {
                                failedRequest ? <h1 style={{textAlign:"center"}}> Something went wrong. Please try refreshing the page</h1> :
                                    displayMovies()
                            }
                        </>
                    )
                }
            </Content>
            <Footer/>
        </Layout>
    )

}

const mapStateToProps = (state) => {
    return {
        failedRequest: state.movie.failedRequest,
        loading: state.movie.loading,
        moviesInfo: state.movie.moviesInfo
    }
}

export default connect(
    mapStateToProps,
    { getGenralRecommendations }
)(HomePage)
