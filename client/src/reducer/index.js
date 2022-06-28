import {GET_DOGS, GET_TEMPERS, FILTER_BY_TEMPER, FILTER_BY_ORIGIN,ORDER,ASC_OR_DESC} from '../actions/index.js'

const initialState = {
    dogs : [],
    allDogs:[],
    tempers:[],
    ascOrDesc:"asc"
}

const RootReducer = (state=initialState,action) => {

    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs:action.payload,
                allDogs:action.payload
            }
        case GET_TEMPERS:
            return {
                ...state,
                tempers:action.payload
            }

        case FILTER_BY_TEMPER: 
            const temperFiltered = action.payload === "All" ? 
            state.allDogs : 
            state.allDogs.filter(dog=>{
                let tempers = []
                dog.temperaments === 'object' ? tempers = dog.temperaments?.forEach(e=>e.name?.split(', ')) : 
                tempers = dog.temperament?.split(', ')

                if(tempers){
                    for(let i=0;i<tempers.length;i++){
                        return tempers[i] === action.payload
                    };
                } 
                return false
            })
            return{
                ...state,
                dogs: temperFiltered
            }
        
        case FILTER_BY_ORIGIN: 
            let dogsByOrigin = state.allDogs
            switch(action.payload){
                case "all": dogsByOrigin = state.allDogs;break
                case "api": dogsByOrigin = state.allDogs.filter(e=>e.id < 300);break
                case "created": dogsByOrigin = state.allDogs.filter(e=>e.id.length > 3);break
                default: dogsByOrigin = state.dogs
            }           
            return{
                ...state,
                dogs: dogsByOrigin
            }

        case ASC_OR_DESC:
            return { 
                ...state, 
                ascOrDesc: action.payload 
            }

        case ORDER:
            let orderedDogs = state.allDogs
            let order = state.ascOrDesc
            switch(action.payload){
                case "alf": 
                    if (order === "asc") {
                        orderedDogs.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    } else if(order === "desc") {
                        orderedDogs.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
                    }
                    break;
                case "peso": 
                    if(state.ascOrDesc === "asc"){
                        orderedDogs.sort((a,b) => a.weight - b.weight)
                    } else orderedDogs.sort((a,b) => b.weight - a.weight)
                    console.log(action.payload,orderedDogs)
                    break;
                default: break
            }
            return {
                ...state,
                dogs: orderedDogs
            }
        default: return {...state}
    }
}

export default RootReducer