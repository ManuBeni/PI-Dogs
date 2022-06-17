import {GET_DOGS} from '../actions/index.js'

const initialState = {
    dogs : []
}

const RootReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs:action.payload
            }
        default: return {...state}
    }
}

export default RootReducer