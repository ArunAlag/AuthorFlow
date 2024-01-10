import axios from 'axios'
import { useLoaderData } from 'react-router-dom'

//Set env variable
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function TodoList() {
    let todos = useLoaderData()
    return (
        <>
            <h1 className="page-title">Todos</h1>
            <ul>
                {todos.map((todo) => (
                   <li key={todo.id} className={todo.completed ? "strike-through" : undefined}>{todo.title}</li> 
                ))}
            </ul>
        </>
    )
}

function loader ({request: {signal}}) {
    return axios
    .get(`${SERVER_URL}/todos`, {signal})
    .then(res => res.data)
}

export let todoListRoute = {
    loader,
    element: <TodoList/>
}