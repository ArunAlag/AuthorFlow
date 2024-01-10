import axios from 'axios'
import { useLoaderData, Link } from 'react-router-dom';

//Set env variable
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function User() {
    let {user, posts, todos} = useLoaderData();
    return (
        <>
            <h1 className="page-title">{user.name}</h1>
            <div className="page-subtitle">{user.email}</div>
            <div><b>Company:</b> {user.company.name}</div>
            <div><b>Website:</b> {user.website}</div>
            <div><b>Address:</b> {user.address.street} {user.address.suite} {" "} {user.address.city} {user.address.zipcode}</div>

            <h3 className="mt-4 mb-2">Posts</h3>
            <div className="card-grid">
                {posts.map(((post) => (
                    <div key={post.id} className="card"> 
                        <div className='card-header'>
                            {post.title}
                        </div>
                        <div className="card-body">
                            <div className="card-preview-text">
                                {post.body}
                            </div>
                        </div>
                        <div className="card-footer">
                            <Link className='btn' to={`/posts/${post.id}`}>View</Link>
                        </div>
                    </div> 
                )))}
            </div>
            <h3 className="mt-4 mb-2">Todos</h3>
            <ul>
            <ul>
                {todos.map((todo) => (
                   <li key={todo.id} className={todo.completed ? "strike-through" : undefined}>{todo.title}</li> 
                ))}
            </ul>
            </ul>
    
        </>
    )
}

async function loader({request: {signal}, params: {userId}}) {
    
    let posts = await axios
    .get(`${SERVER_URL}/posts`, {signal, params: {userId}})
    .then((res) => res.data)

    let todos = await axios
    .get(`${SERVER_URL}/todos`, {signal, params: {userId}})
    .then(res => res.data)

    let user = await axios
    .get(`${SERVER_URL}/users/${userId}`, {signal})
    .then((res) => res.data)

    return {posts, todos, user}
}

export let userRoute = {
    loader,
    element: <User/>
}

