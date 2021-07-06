import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd';
import {toggleModal} from "../../store/user/userAction";

const InfoModal = (props) => {

    const {
        toggleModal,
        modalVisible
    } = props;

    const handleOk = () => {
        toggleModal(false)
    }

    const handleCancel = () => {
        toggleModal(false)
    }

    return (
        <Modal title="Basic Modal" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        modalVisible: state.user.modalVisible
    }
};

export default connect(mapStateToProps, {
    toggleModal
})(InfoModal)
