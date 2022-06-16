import axios from 'axios'
export const GET_DOGS="GET_DOGS"
export const getDogs = ()=>{
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/api/dogs/")
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
    // return async function(dispatch){
    //     return fetch(`http://localhost:3001/api/dogs`)
    //     .then(response => response.json())
    //     .then(json => {
    //         dispatch({ type: 'GET_DOGS', payload: json });
    //     })
    //     .catch(e=>console.log(e.message));
    // }
}