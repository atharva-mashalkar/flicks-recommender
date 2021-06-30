import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Header from "../../common/Header";
import { getGenralRecommendations, getMovieInfo } from "../../store/movie/movieAction";
import { Spin, Layout, Divider, Row, Col, Card, List } from "antd"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'

const { Footer, Content } = Layout;

const HomePage = (props) => {
    const { 
        getGenralRecommendations, 
        failedRequest, 
        genreBasedMovies, 
        loading, 
        moviesInfo, 
        genre, 
        getMovieInfo 
    } = props;

    const [genreList, setGenreList] = useState([])
    const [movieDict, setMovieDict] = useState({})
    const [currentGenre, setCurrentGenre] = useState("")
    const []
    useEffect(() => {
        getGenralRecommendations()
    }, [])

    useEffect(() => {
        for (const property in genreBasedMovies) {
            const NUM_OF_MOVIES_TO_DISPLAY = 7 
            let start = Math.random()
            let end = start + NUM_OF_MOVIES_TO_DISPLAY
            let genre = property
            genreBasedMovies[property].slice(start, end)
            setGenreList([...genreList, [property, genreBasedMovies[property].slice(start, end)]])
        }
        getMovieData()
    },[genreBasedMovies])

    useEffect(() => {

    },[genreList, moviesInfo])
    const getMovieData = () => {
        genreList.forEach(element => {
            let genre = element[0]
            element[1].forEach(movie => {
                getMovieInfo(movie[0], movie[1], genre)
            })
        })
    }

    const displayMovies = () => {
        return (
            <>
                {genreList.map((genre) =>
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
                {genreBasedMovies ? displayMovies() :
                    (
                        <Row align="middle" gutter='32'>
                            <Col span={2} offset={11}>
                                <Spin size="large" />
                            </Col>
                        </Row>
                    )
                }
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        failedRequest: state.movie.failedRequest,
        genreBasedMovies: state.movie.genreBasedMovies,
        loading: state.movie.loading,
        genre : state.movie.genre,
        moviesInfo : state.movie.moviesInfo
    }
}

export default connect(
    mapStateToProps,
    { getGenralRecommendations, getMovieInfo }
)(HomePage)
