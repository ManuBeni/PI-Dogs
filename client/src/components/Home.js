import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs,getTempers,filterDogsByTemper,filterDogsByOrigin,ascOrDesc,order } from '../actions';
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
    let temper = "all";
    let origin = "all";

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
        temper = e.target.value
        console.log(temper)
        //dispatch(filterDogsByTemper(e.target.value))
    }

    function handleFilterByOrigin(e){
        origin = e.target.value
        console.log(origin)
    }

    // function handleOrderWay(e){
    //     dispatch(ascOrDesc(e.target.value))
    // }

    // function handleOrder(e){
    //     dispatch(order(e.target.value))
    // }
    
    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
        paginated(1)
    }

    function handleFilterClick(e){
        e.preventDefault()
        if(temper !== "all")dispatch(filterDogsByTemper(temper))
        if(origin !== "all")dispatch(filterDogsByOrigin(origin))
        
        paginated(1)
    }

    

    return (
        <div>
            
            <div className='homeHeader'>
                <Link to = '/'>
                    <img src='https://www.clipartmax.com/png/full/3-39170_paw-print-dog-paw-vector-graphic-dog-paw-print-vector.png' alt='no img'/>
                </Link>
                <h1>Dog Search</h1>
                <div className='space'/>

                <button className='createDog'>
                <Link to = '/dog'>Crear perro</Link>
                </button>

            </div>
            

            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los perros
            </button>

            <div>

                <select onChange={e=>handleFilterByTemper(e)}>
                    <option value="all">Todos</option>
                    {tempers?.map((temper)=>{
                        return (
                            <option value = {temper.name} key={temper.id}>{temper.name}</option>
                        )
                    })}
                </select>

                <select>
                    <option value = 'alf'>Orden Alfabético</option>
                    <option value = 'peso'>Peso</option>
                </select>

                <select>
                    <option value='asc'>Ascendiente</option>
                    <option value='desc'>Descendiente</option>
                </select>

                <select onChange={e=>handleFilterByOrigin(e)}>
                    <option value='all'>Todos</option>
                    <option value='api'>Existente</option>
                    <option value='created'>Creado</option>
                </select>

                <button  onClick={e=>{handleFilterClick(e)}}>Ordenar/Filtrar</button>

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
                            <Card 
                                name={el.name} 
                                image={el.image} 
                                temperament={el.temperament ? el.temperament : el.temperaments?.map(el=>el.name).join(", ")} weight={el.weight} key={el.id}/>
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