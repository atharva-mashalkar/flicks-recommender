import React, {useEffect} from 'react'
import { connect } from 'react-redux'

const Dashboard = (props) => {

    useEffect(() => {
        console.log(props);
    })
    return (
        <div>
            <h1>Welcome to dashboard</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userInfo:state.user.userInfo,
    moviesInfo: state.movie.moviesInfo,userInfo:state.user.userInfo,
    token:state.user.token
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
