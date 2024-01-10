import axios from 'axios'
import { useEffect, useRef } from 'react';
import { useLoaderData, Link, Form } from 'react-router-dom'

//Set env variable
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function PostList() {
    // Get the all post data
    let {
        posts, 
        searchParams:{query, userId},
        users
    } = useLoaderData();

    let queryRef = useRef()
    let userIdRef = useRef()

    useEffect(() => {
        queryRef.current.value = query || ""
    }, [query])

    useEffect(() => {
        userIdRef.current.value = userId || ""
    }, [userIdRef])

    return (
        <>
            <h1 className="page-title">Posts
                <div className="title-btns">
                    <Link className='btn btn-outline' to={`/posts/new`}>New</Link>
                </div>
            </h1>

                <Form className="form mb-4">
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="query">Query</label>
                    <input type="search" name="query" id="query" ref={queryRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="userId">Author</label>
                    <select type="search" name="userId" id="userId" ref={userIdRef}>
                    <option value="">Any</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                    </select>
                </div>
                <button className="btn">Filter</button>
                </div>
            </Form>

            <div className="card-grid">
                {posts.map(((post) => (
                    <div key={post.id} className="card">
                    <div className="card-header">
                        {post.title}
                    </div>
                    <div className="card-body">
                        <div className="card-preview-text">
                        {post.body}
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link className="btn" to={`/posts/${post.id}`}>View</Link>
                    </div>
                    </div>    
                )))}    
            </div>
        </>
    )
}

async function loader({request: {signal, url}}) {
    let searchParams = new URL(url).searchParams
    let query = searchParams.get("query");
    let userId = searchParams.get("userId");
    let filterParams = {q: query};

    if(userId !== "") {
        filterParams.userId = userId
    }

    let posts = await axios
    .get(`${SERVER_URL}/posts`, {signal, params: filterParams})
    .then((res) => res.data)

    let users = await axios
    .get("http://localhost:3000/users", {signal})
    .then(res => res.data)

    return {posts, searchParams: {query, userId}, users}
}

export let postListRoute = {
    loader,
    element: <PostList/>
}