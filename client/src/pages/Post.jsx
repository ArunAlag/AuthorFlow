import axios from 'axios'
import { useLoaderData, Link } from 'react-router-dom';

//Set env variable
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Post() {
    let {comments, post, user} = useLoaderData();

    
    return (
        <>
            <h1 className="page-title">
                {post.title}
                <div className="title-btns">
                    <Link className='btn btn-outline' to="edit">Edit</Link>
                </div> 
            </h1>
            <span className="page-subtitle">
                <Link to={`/users/${user.id}`}> {user.name} </Link>
            </span>
            <div> {post.body} </div>  

            <h3 className="mt-4 mb-2">Comments</h3>
            <div className="card-stack">
                {comments.map((comment) => (
                    <div key={comment.id} className="card">
                        <div className="card-body">
                        <div className="text-sm mb-1">{comment.email}</div>
                        {comment.body}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

async function loader({request: {signal}, params: {postId}}) {
    let post = await axios
    .get(`${SERVER_URL}/posts/${postId}`, {signal})
    .then((res) => res.data)

    let comments = await axios
    .get(`${SERVER_URL}/posts/${postId}/comments`, {signal})
    .then((res) => res.data)
    
    let user = await axios
    .get(`${SERVER_URL}/users/${post.userId}`, {signal})
    .then((res) => res.data) 

    return {comments, post, user}
}

export let postRoute = {
    loader,
    element: <Post/>
}

