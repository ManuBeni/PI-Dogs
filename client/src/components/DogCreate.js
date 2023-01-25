import React,{useState,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
import {postDog, getTempers} from '../actions'
import { useDispatch, useSelector } from "react-redux";

export default function DogCreate(){

    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(()=>{
        dispatch(getTempers())
    },[dispatch])

    const unorderedTempers = useSelector((state)=>state.RootReducer.tempers)
    const tempers = unorderedTempers.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))


    const [input, setInput] = useState({
        name:"",
        height:"", 
        weight:"", 
        life_span:"",
        temperament:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament:[...input.temperament, e.target.value]
        })
        console.log(input.temperament)
    }

    function handleDelete(temperament){
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== temperament)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postDog(input))
        alert("Perro Creado!")
        nav("/home")
    }
    
    

    return(
        <div className="creationDog">  
            <Link to="/home">Go Back Home</Link>
            <h1>Create a new dog!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
              
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name} name="name" onChange={handleChange}/>
                </div>

                <div>
                    <label>Height: </label>
                    <input type="text" value={input.height} name="height" onChange={handleChange}/>
                </div>

                <div>
                    <label>Weight: </label>
                    <input type="text" value={input.weight} name="weight" onChange={handleChange}/>
                </div>

                <div>
                    <label>Life Span: </label>
                    <input type="text" value={input.life_span} name="life_span" onChange={handleChange}/>
                </div>
          

                <div >
                    <select onChange={(e)=>handleSelect(e)}>
                    {tempers?.map(temp => {
                            return (
                                <option value={temp.name}  key={temp.id}>{temp.name}</option>
                            )
                        })
                    }
                    </select>
               </div>

               <button type="submit">Create Dog</button>
            </form>
           
            {input.temperament.map(el=>
                        <div className="divTemperament">
                            <p>{el}</p>
                            <button onClick={()=>handleDelete(el)}>x</button>
                        </div>
            )}

        </div>
    )
    // <option value={temp.name}>{temp.name}</option>
}