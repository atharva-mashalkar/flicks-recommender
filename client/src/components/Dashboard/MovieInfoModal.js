import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Typography, Row, Col, Layout, Image, Rate } from 'antd';
import { toggleMovieModal } from "../../store/user/userAction";
import {
    selectMovie,
    rateMovie
} from "../../store/movie/movieAction";

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout

const MovieInfoModal = (props) => {

    const {
        toggleMovieModal,
        selectMovie,
        movieModalVisible,
        selectedMovie
    } = props;

    const [userRating, setUserRating] = useState(null);

    const handleCancel = () => {
        if (userRating) {
            let payload = {
                movieId:selectedMovie.movieId,
                rating:userRating
            }
            rateMovie(payload)
        }
        toggleMovieModal(false);
        selectMovie(null)
    };

    const labelStyle = {
        'fontSize': 20,
        'background': 'white',
        'borderRadius': '5px',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center'
    }

    const valueStyle = {
        'fontSize': 15,
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
    }

    return (
        <>
            {
                !selectedMovie ? null :
                    (
                        <Modal
                            visible={movieModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                            centered={true}
                            width={"900px"}
                            bodyStyle={{ "height": '650px', 'padding': '0px 0px' }}
                        >
                            <Layout>
                                <Header style={{ 'height': '90px', 'padding': '10px 10px' }}>
                                    <Row >
                                        <Col align='center' span={21} offset={1}>
                                            <Title level={1}>{selectedMovie.Title}</Title>
                                        </Col>
                                    </Row>
                                </Header>
                                <Layout>
                                    <Sider width={300} style={{ 'height': '500px' }}>
                                        <Image
                                            width={300}
                                            src={selectedMovie.Poster}
                                            alt={selectedMovie.Title}
                                            height={500}
                                            preview={false}
                                        />
                                    </Sider>
                                    <Content>
                                        <Row justify="center" >
                                            <Col span={6} style={labelStyle}>
                                                Released
                                            </Col>
                                            <Col span={6} style={valueStyle}>
                                                <h4>{selectedMovie.Released}</h4>
                                            </Col>
                                            <Col span={6} style={labelStyle}>
                                                Runtime
                                            </Col>
                                            <Col span={6} style={valueStyle}>
                                                <h4>{selectedMovie.Runtime}</h4>
                                            </Col>
                                        </Row>
                                        <Row justify="center" >
                                            <Col span={6} style={labelStyle}>
                                                Rated
                                            </Col>
                                            <Col span={6} style={valueStyle}>
                                                <h4>{selectedMovie.Rated}</h4>
                                            </Col>
                                            <Col span={6} style={labelStyle}>
                                                Language
                                            </Col>
                                            <Col span={6} style={valueStyle}>
                                                <h4>{selectedMovie.Language}</h4>
                                            </Col>
                                        </Row>
                                        <Row justify="center" >
                                            <Col span={6} style={labelStyle}>
                                                Director
                                            </Col>
                                            <Col span={6} style={valueStyle}>
                                                <h4>{selectedMovie.Director}</h4>
                                            </Col>
                                            <Col span={6} style={labelStyle}>
                                                Country
                                            </Col>
                                            <Col span={6} style={valueStyle}>
                                                <h4>{selectedMovie.Country}</h4>
                                            </Col>
                                        </Row>
                                        <Row justify="center">
                                            <Col span={12} style={labelStyle}>
                                                Actors
                                            </Col>
                                            <Col span={12}>
                                                {
                                                    selectedMovie.Actors.split(", ").map(actor =>
                                                        <>
                                                            <h3 style={valueStyle}>{actor}</h3>
                                                        </>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                        <Row justify="center">
                                            <Col span={6} style={labelStyle}>
                                                Plot
                                            </Col>
                                            <Col span={18}>
                                                <h4>{selectedMovie.Plot}</h4>
                                            </Col>
                                        </Row>
                                        <Row justify="center">
                                            <Col span={6} style={labelStyle}>
                                                Awards
                                            </Col>
                                            <Col span={18}>
                                                <h4>{selectedMovie.Awards}</h4>
                                            </Col>
                                        </Row>
                                        <Row justify="center">
                                            <Col span={12} style={labelStyle}>
                                                Genre
                                            </Col>
                                            <Col span={12}>
                                                {
                                                    selectedMovie.Genre.split(", ").slice(0, 3).map(genre =>
                                                        <>
                                                            <h3 style={valueStyle}>{genre}</h3>
                                                        </>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                        <Row justify="center">
                                            <Col span={6} style={labelStyle}>
                                                Ratings
                                            </Col>
                                            <Col span={18}>
                                                {
                                                    selectedMovie.Ratings.map(rating =>
                                                        <>
                                                            <h3 style={valueStyle}>{rating.Source} : {rating.Value}</h3>
                                                        </>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    </Content>
                                </Layout>
                                <Footer>
                                    <h4 style={valueStyle}>Please provide your rating for the movie</h4>
                                    <div style={{ 'textAlign': 'center' }}>
                                        <Rate allowHalf defaultValue={2.5} onChange={(value) => setUserRating(value)} />
                                    </div>
                                </Footer>
                            </Layout>
                        </Modal>
                    )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        movieModalVisible: state.user.movieModalVisible,
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps, {
    toggleMovieModal,
    selectMovie,
    rateMovie
})(MovieInfoModal)
