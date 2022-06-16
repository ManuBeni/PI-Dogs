import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
    }

    return (
        <div>

            <Link to = '/dog'>Crear perro</Link>

            <h1>Aguanten los perritos!</h1>

            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los perros
            </button>

            <div>

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
                {console.log(allDogs)}
                {
                    allDogs?.map(el=>{
                        return(
                        <fragment>
                            <Link to= {"/home/" + el.id}>
                                <Card name={el.name} image={el.image} temperament={el.temperament} weight={el.weight} key={el.id}/>
                            </Link>
                        </fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}