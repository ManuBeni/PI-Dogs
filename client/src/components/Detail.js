import React from 'react'

export default function Detail({name, image, temperament, temperaments, weight, life_span, height }){
    return (
        <div className='detail'>
            <img src={image} alt="not found" width='200px' height='200px'></img>
            <h3>{name}</h3>
            <h5>Weight: {weight}</h5>
            <h5>Height: {height}</h5>
            <h5>Life Span: {life_span}</h5>
            <h5>{temperament || temperaments}</h5>
        </div>
    )
}