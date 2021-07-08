import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Row, Col, Spin, Select, Image, Rate, message } from 'antd';
import { toggleModal } from "../../store/user/userAction";
import { getAllTopMovies } from "../../store/movie/movieAction";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Option } = Select;

const InfoModal = (props) => {

    const {
        toggleModal,
        getAllTopMovies,
        modalVisible,
        allTopMovies
    } = props;

    const [selectedGenre, setSelectedGenre] = useState("Action");
    const [rating, setRating] = useState(null);
    const [currMovie, setCurrMovie] = useState(null);
    const [moviesRated, addMoviesRated] = useState([]);

    useEffect(() => {
        getAllTopMovies()
    }, []);

    const handleCancel = () => {
        let genreSelected={}
        moviesRated.forEach(movie =>{
            // console.log(movie.genre)
            if(genreSelected[movie.genre]){
                genreSelected[movie.genre] += 1
            }
            else{
                genreSelected[movie.genre] = 1
            }
        });
        let temp = Object.keys(genreSelected);
        if(temp.length < 3){
            message.error('Please select atleast 4 movies each from 3 different genre.',2);
            return 
        }
        let count = 0
        for(let i=0; i<temp.length;i++){
            if(genreSelected[temp[i]]>= 3){
                count += 1
            }
        }
        if(count < 2){
            message.error('Please select atleast 4 movies each from 3 different genre.',2);
            return
        } 
        toggleModal(false)
    }

    const handleChange = (value) => {
        setSelectedGenre(value);
    }

    const handleRating = (index, item) => {
        setCurrMovie(item.key.split(".$")[1]);
        console.log(item.key)
    }

    useEffect(() => {
        if(rating && currMovie){
            addMoviesRated([...moviesRated, {'movieId':currMovie, 'rating': rating,'genre':selectedGenre}]);
        }
    },[rating]);

    return (
        <>
            {
                !allTopMovies ?
                    (
                        <Row align="middle" gutter='32'>
                            <Col span={2} offset={11}>
                                <Spin size="large" />
                            </Col>
                        </Row>
                    ) :
                    (
                        <Modal
                            title="Please rate some movies you have seen before."
                            visible={modalVisible} 
                            onCancel={handleCancel}
                            footer={null}
                            centered={true}
                            width={"500px"}
                            bodyStyle={{ "height": '650px', 'padding': '20px 20px' }}
                        >
                            <Select defaultValue="Action" style={{ width: 200 }} onChange={handleChange}>
                                {
                                    Object.keys(allTopMovies).map(genre =>
                                        <Option value={genre}>{genre}</Option>
                                    )
                                }
                            </Select>
                            <br />
                            <br />
                            <br/>
                            <Carousel
                                autoFocus={true}
                                autoPlay={true}
                                interval={5000}
                                centerMode={true}
                                centerSlidePercentage={100}
                                dynamicHeight={false}
                                emulateTouch={true}
                                infiniteLoop={true}
                                showStatus={false}
                                showIndicators={false}
                                showThumbs={false}
                                onChange = {handleRating}
                            >
                                {
                                    allTopMovies[selectedGenre].map(movie =>
                                        <div key={movie.movieId}>
                                            <Image
                                                width={300}
                                                src={movie.Poster}
                                                alt={movie.Title}
                                                height={450}
                                            />
                                        </div>
                                    )
                                }
                            </Carousel>
                            <br/>
                            <div style={{'textAlign':'center'}}>
                                <Rate allowHalf defaultValue={2.5} onChange={(value)=>setRating(value)} />
                            </div>
                        </Modal>
                    )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        modalVisible: state.user.modalVisible,
        allTopMovies: state.movie.allTopMovies
    }
};

export default connect(mapStateToProps, {
    toggleModal,
    getAllTopMovies
})(InfoModal)
