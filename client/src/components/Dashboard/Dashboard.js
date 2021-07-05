import React, {useEffect} from 'react'
import { connect } from 'react-redux'

const Dashboard = (props) => {

    return (
        <div>
            <h1>Welcome to dashboard</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    openSignupDrawer: state.user.openSignupDrawer,
    failed_req: state.user.failed_req,
    processing_reg: state.user.processing_reg,
    req_success: state.user.req_success,
    failedRequest: state.movie.failedRequest,
    loading: state.movie.loading,
    moviesInfo: state.movie.moviesInfo
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
