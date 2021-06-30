import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getGenralRecommendations } from "../store/movie/movieAction";

function HookCounter() {

    const genreBasedMovies = useSelector((state) => state.movie.genreBasedMovies);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getGenralRecommendations())
    },[])

    const makeCall = () => {
        dispatch(getGenralRecommendations())
    }
    // const initialCount = 0
    // const [count, setCount] = useState(initialCount);
    // const [name, setName] = useState("");
    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)

    // useEffect(()=> {
    //     console.log("Updating document title");
    //     document.title = `Counter value is ${count}`;
    // }, [count])
    // const [name, setName] = useState({firstName: '', lastName: ''});
    // const [items, setItems] = useState([]);
    
    // const addItem = () => {
    //     setItems([...items,{
    //         id:items.length,
    //         value:Math.floor(Math.random()*10) + 1
    //     }]);
    // };

    // const displayMouse = (e) => {
    //     setX(e.clientX);
    //     setY(e.clientY);
    // }

    // useEffect(()=> {
    //     console.log(`useEffect Called`)
    //     window.addEventListener('mousemove', displayMouse)
    //     return () => {
    //         window.removeEventListener('mousemove', displayMouse)
    //     }
    // },[]);

    return (
        <div>
            <h1>Genre Based Movies :- </h1>
            {genreBasedMovies ? <p>Action:- {genreBasedMovies.Action}</p> : makeCall()}
            {/* <p>X: {x} Y: {y}</p> */}
            {/* <input
                type="text"
                value ={name}
                onChange={e=>{
                    setName(e.target.value)
                }}
            />
            count: {count}
            <button onClick = {() => setCount((prevState)=> prevState + 5)}>Increment by 5</button>
            <button onClick = {() => setCount((prevState)=> prevState - 5)}>Decrement by 5</button>
            <button onClick = {() => setCount(initialCount)}>Reset counter</button> */}
            {/* <input 
                value = {name.firstName} 
                onChange = {e => setName({...name, firstName:e.target.value})}
                type = "text"    
            />
            <input 
                value = {name.lastName} 
                onChange = {e => setName({...name, lastName:e.target.value})}
                type="text"    
            />
            <p>FirstName: {name.firstName}</p>
            <p>LastName: {name.lastName}</p> */}
            {/* <button onClick = {addItem}>Add item</button>
            <ul>
            {items.map(item => (
                <li key = {item.id}>{item.value}</li>
            ))}
            </ul> */}
        </div>
    )
}

export default HookCounter
