//import axios from 'axios'
export const GET_DOGS="GET_DOGS"
export const GET_TEMPERS='GET_TEMPERS'
export const FILTER_BY_TEMPER='FILTER_BY_TEMPER'
export const getDogs = ()=>{
    // return async function(dispatch){
    //     var json = await axios.get("http://localhost:3001/api/dogs/")
    //     return dispatch({
    //         type: 'GET_DOGS',
    //         payload: json.data
    //     })
    // }
    return async function(dispatch){
        return fetch(`http://localhost:3001/api/dogs`)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: GET_DOGS, payload: json });
        })
        .catch(e=>console.log(e.message));
    }
}

export const getTempers = ()=>{
    return async function (dispatch){
        return fetch(`http://localhost:3001/api/temperament`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({type: GET_TEMPERS, payload: json});
        })
        .catch(e=>console.log(e.message))
    }
}

export function filterDogsByTemper(payload) {
    return {
        type: FILTER_BY_TEMPER,
        payload
    }
}