import {GET_DOGS, GET_TEMPERS, FILTER_BY_TEMPER, FILTER_BY_ORIGIN,ORDER,ASC_OR_DESC} from '../actions/index.js'

const initialState = {
    dogs : [],
    tempers:[],
    ascOrDesc:"asc"
}

const RootReducer = (state=initialState,action) => {

    const allDogs = state.dogs;

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
            const temperFiltered = action.payload === "All" ? 
            allDogs : 
            allDogs.filter(dog=>{
                let tempers = []
                dog.temperaments === 'object' ? tempers = dog.temperaments?.forEach(e=>e.name?.split(', ')) : 
                tempers = dog.temperament?.split(', ')

                if(tempers){
                    for(let i=0;i<tempers.length;i++){
                        return tempers[i] === action.payload
                    };
                } 
            })
            return{
                ...state,
                dogs: temperFiltered
            }
        
        case FILTER_BY_ORIGIN: 
            let dogsByOrigin = allDogs
            switch(action.payload){
                case "all": dogsByOrigin = allDogs;break
                case "api": dogsByOrigin = allDogs.filter(e=>e.id < 300);break
                case "created": dogsByOrigin = allDogs.filter(e=>e.id.length > 3);break
                default: dogsByOrigin = allDogs
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
            let orderedDogs = allDogs
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