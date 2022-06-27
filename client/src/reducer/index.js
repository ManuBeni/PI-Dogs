import {GET_DOGS, GET_TEMPERS, FILTER_BY_TEMPER} from '../actions/index.js'

const initialState = {
    dogs : [],
    tempers:[]
}

const RootReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs:action.payload
            }
        case GET_TEMPERS:
            return {
                ...state,
                tempers:action.payload
            }

        case FILTER_BY_TEMPER: 
            const allDogs = state.dogs;
            const temperFiltered = action.payload === "All" ? 
            allDogs : 
            allDogs.filter(dog=>{
                let tempers = dog.temperament?.split(', ')
                if(tempers){
                    for(let i=0;i<tempers.length;i++){
                        return tempers[i] === action.payload
                    };
                } 
            })
            console.log(temperFiltered)
            // allDogs.filter(dog=>{
            //     const tempers = dog.temperament.split(', ')
            //     for (let i = 0; i < tempers.length; i++) {
            //         if(tempers[i] === action.payload){
            //             return true
            //         }
                    
            //     }
            //     return false
            // })
            return{
                ...state,
                dogs: temperFiltered
            }
        default: return {...state}
    }
}

export default RootReducer