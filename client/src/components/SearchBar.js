import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getDogName} from "../actions"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        console.log(name)
        setName(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogName(name))
    }

    return(
        <div>
            <input type = "text" placeholder="Dog Name..." onChange={e=>handleInputChange(e)}/>
            <button type="submit" onClick={e=>handleSubmit(e)}>Search</button>
        </div>
    )
}