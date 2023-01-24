import {GET_DOGS, GET_TEMPERS, FILTER_BY_TEMPER, FILTER_BY_ORIGIN,ORDER,ASC_OR_DESC, GET_NAME_DOGS, POST_DOG, GET_DETAIL} from '../actions/index.js'

const initialState = {
    dogs : [],
    allDogs:[],
    tempers:[],
    detail:[],
    ascOrDesc:"asc",
    alphOrWeight: "alph"
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

        case GET_NAME_DOGS:

            return{
                ...state,
                dogs: action.payload
            }

        case POST_DOG:
            console.log("asd") 
            return{...state}

        case FILTER_BY_TEMPER: 

            const allTheDogs = state.allDogs

            const temperFiltered = action.payload === "All" ? 
            allTheDogs : 
            allTheDogs.filter(dog=>{

                let tempers = []

                typeof dog.temperaments === 'object' ? 
                tempers = dog.temperaments?.forEach(e=>e.name?.split(', ')) : 
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

            let dogsByOrigin= action.payload === "created" ? state.allDogs.filter(e=>e.createdInDB) : state.allDogs.filter(e=>!e.createdInDB) 

            // switch(action.payload){

            //     case "all": 
            //         break

            //     case "api": 
            //         dogsByOrigin = state.dogs.filter(e=>e.id < 300)
            //         break

            //     case "created": 
            //         dogsByOrigin = state.dogs.filter(e=>e.id.length > 3)
            //         break

            //     default: break
            // }    

            return{

                ...state,
                dogs: action.payload === "all" ? state.allDogs : dogsByOrigin

            }

        case ASC_OR_DESC:

        let alphOrderedDogs = state.dogs

        if(state.alphOrWeight === "weight"){

            if(action.payload === "asc"){
                alphOrderedDogs = state.dogs.sort((a,b) => {

                    return parseInt(a.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10) - parseInt(b.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10)

                })
            } 
            if(action.payload === "desc"){ alphOrderedDogs = state.dogs.sort((a,b) => {

                return parseInt(b.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10) - parseInt(a.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10)
            
            })
            }

        } 
        
        if(state.alphOrWeight === 'alph'){

        if (action.payload === "asc") {

            alphOrderedDogs = state.dogs.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        } 
        if(action.payload === "desc") {

            alphOrderedDogs = state.dogs.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))

        }

        }

            return { 

                ...state, 
                dogs: alphOrderedDogs,
                ascOrDesc: action.payload 

            }

        case GET_DETAIL: 
            return{
                ...state,
                detail: action.payload
            }

        case ORDER:
            let orderedDogs = state.dogs
            let AOrW = "alph"
            switch(action.payload){

                case "alf":  

                AOrW = "alph"

                    if (state.ascOrDesc === "asc") {

                        orderedDogs = state.dogs.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

                    } else  {

                        orderedDogs = state.dogs.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))

                    }
                    break;

                case "peso": 

                    AOrW = "weight"

                    if(state.ascOrDesc === "asc"){
                        orderedDogs = state.dogs.sort((a,b) => {

                            return parseInt(a.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10) - parseInt(b.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10)

                        })
                    } else orderedDogs = state.dogs.sort((a,b) => {

                        return parseInt(b.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10) - parseInt(a.weight?.match(/\d+ - \d+/gi)?.pop().replace(/\D/gi,""),10)

                    })
                    
                    break;

                default: break
            }
            return {
                ...state,
                alphOrWeight: AOrW,
                dogs: orderedDogs
            }
        default: return {...state}
    }
}

export default RootReducer