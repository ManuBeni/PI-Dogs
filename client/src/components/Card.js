import React from 'react'

export default function Card({name, image, temperament, weight}){
    return(
        <div className='card'>
            <img src={image ? image : "https://www.clipartmax.com/png/full/3-39170_paw-print-dog-paw-vector-graphic-dog-paw-print-vector.png"} alt="loading" width='200px' height='200px'></img>
            <h3>{name}</h3>
            <h5>Weight: {weight}</h5>
            <h5>{temperament}</h5>
        </div>
    )
}