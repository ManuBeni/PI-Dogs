import React from "react";

export default function Pagination({dogsPerPage, dogs, paginated}){

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++) {
       pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className="pages">
                {pageNumbers?.map(number=>(
                    <li onClick={() => paginated(number)} className="number" key={number}>
                    {number}
                    </li>
                ))}
            </ul>
        </nav>
    )
}