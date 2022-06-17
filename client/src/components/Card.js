import React from 'react'

export default function Card({name, image, temperament, weight}){
    return(
        <div>
            <img src={image} alt="not found" width='200px' height='200px'></img>
            <h3>{name}</h3>
            <h5>Weight: {weight}</h5>
            <h5>{temperament}</h5>
        </div>
    )
}