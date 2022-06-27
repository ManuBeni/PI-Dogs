import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs,getTempers,filterDogsByTemper } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Pagination from './Pagination';

export default function Home(){

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.RootReducer.dogs)
    const tempers = useSelector((state)=>state.RootReducer.tempers)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage] = useState(8)
    const indexOFLastDog = currentPage * dogsPerPage
    const indexOfFristDog = indexOFLastDog - dogsPerPage
    const currentDogs =  dogs.slice(indexOfFristDog, indexOFLastDog)

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    useEffect(()=>{
        dispatch(getTempers())
    },[dispatch])

    function handleFilterByTemper(e){
        console.log(e.target.value)
        dispatch(filterDogsByTemper(e.target.value))
    }

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
        paginated(1)
    }

    

    return (
        <div>
            
            <Link to = '/dog'>Crear perro</Link>

            <h1>Aguanten los perritos!</h1>

            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los perros
            </button>

            <div>

                <select onChange={e=>handleFilterByTemper(e)}>
                    <option value="All">Todos</option>
                    {tempers?.map((temper)=>{
                        return (
                            <option value = {temper.name} key={temper.id}>{temper.name}</option>
                        )
                    })}
                </select>

                <select>
                    <option value = 'peso'>Peso</option>
                    <option value = 'alf'>Orden Alfabético</option>
                </select>

                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendiente</option>
                </select>

                <select>
                    <option value='all'>Todos</option>
                    <option value='api'>Existente</option>
                    <option value='created'>Creado</option>
                </select>

            </div>

            <div className='table'>
                <Pagination
                dogsPerPage={dogsPerPage}
                dogs={dogs.length}
                paginated={paginated}
                />
            </div>
               <ul className='cards'>
                {
                    currentDogs?.map(el=>{
                        return(
                    
                        <li  key={el.id}>
                            <Link style={{textDecoration: 'none'}} to={'/home/' + el.id}>
                            <Card name={el.name} image={el.image} temperament={el.temperament} weight={el.weight} key={el.id}/>
                            </Link>
                        </li>
                   
                        )
                    })
                }
                </ul>
                
            <div className='table'>
                <Pagination
                dogsPerPage={dogsPerPage}
                dogs={dogs.length}
                paginated={paginated}
                />
            </div>
            
         </div>
    )
}