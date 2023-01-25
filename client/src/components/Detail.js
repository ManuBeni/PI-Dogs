import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../actions'
import { useParams, Link } from 'react-router-dom'

export default function Detail(props){

    const {id} = useParams()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch,id])

    const dog = useSelector((state)=>state.RootReducer.detail)

    console.log(dog)
    return (
        
        <div className='detail'>
            {dog?.length > 0 ? 
                <div>
                    <img src={dog[0].image ? dog[0].image : "https://www.clipartmax.com/png/full/3-39170_paw-print-dog-paw-vector-graphic-dog-paw-print-vector.png"} alt="not found" width='200px' height='200px'></img>
                    <h3>{dog[0].name}</h3>
                    <h5>Weight: {dog[0].weight}</h5>
                    <h5>Height: {dog[0].height}</h5>
                    <h5>Life Span: {dog[0].life_span}</h5>
                    <h5>{dog[0].temperament }</h5>
                </div> :
                <div>
                    <h1>Loading</h1>
                </div>
            }
            <Link style={{textDecoration: 'none'}} to="/home"><button>Volver</button></Link>
            
        </div>
        
    )
}