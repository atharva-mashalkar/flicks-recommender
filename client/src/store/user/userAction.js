import {
    TOGGLE_SIGNUP_DRAWER,
    TOGGLE_LOGIN_DRAWER
} from './userType'

export const toggleSignupDrawer = (open) => (dispatch) => {
    dispatch({
        type:TOGGLE_SIGNUP_DRAWER,
        payload:open
    })
}

export const toggleLoginDrawer = (open) => (dispatch) => {
    dispatch({
        type:TOGGLE_LOGIN_DRAWER,
        payload:open
    })
}