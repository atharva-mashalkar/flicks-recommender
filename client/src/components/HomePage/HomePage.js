import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from "../../common/Header";
import { getGenralRecommendations } from "../../store/movie/movieAction";
import { Spin, Layout, Divider, Row, Col, Card, List } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const { Footer, Content } = Layout;

const HomePage = (props) => {

    const { 
        getGenralRecommendations, 
        failedRequest, 
        loading, 
        moviesInfo, 
    } = props;

    
    const displayMovies = () => {
        return (
            <>
                {moviesInfo.map((genre) =>
                    <>
                        <Divider dashed orientation="left">{genre[0]}</Divider>
                        <Carousel 
                            autoFocus={true}
                            autoPlay={true}
                            centerMode={true}
                            centerSlidePercentage={20}
                            dynamicHeight={true}
                            emulateTouch={true}
                            infiniteLoop={true}
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                        >
                            {
                                genre[1].map(movie => 
                                    <div key={movie[0]}>
                                        <h4>{}</h4>
                                        {/* <p>Movie : {movie[0]} Year : {movie[1]}</p> */}
                                    </div>
                                    )
                            }
                        </Carousel>
                    </>
                )}
            </>
        )
    }

    return (
        <Layout>
            <Header />
            <Content style={{ padding: '30px 50px', height: '100%' }}>
                {loading ? 
                    (
                        <Row align="middle" gutter='32'>
                            <Col span={2} offset={11}>
                                <Spin size="large" />
                            </Col>
                        </Row>
                    ) : displayMovies()
                }
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
    )

}

const mapStateToProps = (state) => {
    return {
        failedRequest: state.movie.failedRequest,
        loading: state.movie.loading,
        moviesInfo : state.movie.moviesInfo
    }
}

export default connect(
    mapStateToProps,
    { getGenralRecommendations }
)(HomePage)
