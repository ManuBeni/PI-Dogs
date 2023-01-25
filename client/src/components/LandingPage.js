import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div className='landingPage'>
            <h1>Dog Breed Finder</h1>
            <Link to = '/home'>
                <button>Start searching!</button>            
            </Link>
        </div>
    )
}