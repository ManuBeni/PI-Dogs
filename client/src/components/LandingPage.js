import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div className='landingPage'>
            <h1>Buscador de Razas</h1>
            <Link to = '/home'>
                <button>Ingresar</button>            
            </Link>
        </div>
    )
}