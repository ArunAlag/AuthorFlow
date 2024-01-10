import axios from 'axios'
import { useLoaderData, Link, Form, redirect, useActionData } from 'react-router-dom';
import { FormGroup } from '../components/FromGroup';
import { formValidation } from '../Helper/formValidation';

function EditPost() {
    let {post, users} = useLoaderData();
    let errorMessage = useActionData();

    return (
        <>
            <h1 className="page-title">Edit Post</h1>
            <Form method="post" className="form">
                <div className="form-row">
                    <FormGroup errorMessage={errorMessage?.title}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" defaultValue={post.title}/>
                    </FormGroup>
                    <FormGroup errorMessage={errorMessage?.userId}>
                        <label htmlFor="userId">Author</label>
                        <select name="userId" id="userId" defaultValue={post.userId}>
                            {users.map((user) => (
                                <option key={user.id} value={user.id} >{user.name}</option>
                            ))}
                        </select>
                    </FormGroup>
                </div>
                <div className="form-row">
                    <FormGroup errorMessage={errorMessage?.body}>
                        <label htmlFor="body">Body</label>
                        <textarea name="body" id="body" defaultValue={post.body}></textarea>
                    </FormGroup>
                </div>
                <div className="form-row form-btn-row">
                    <a className="btn btn-outline" href="/posts">Cancel</a>
                    <button className="btn">Save</button>
                </div>
            </Form>
        </>
    )
}

async function action({request, params: {postId}}) {
    let formData = await request.formData();
    let title = formData.get('title');
    let body = formData.get('body');
    let userId = formData.get('userId');

    let errors = formValidation(title, body, userId)
    
    if(Object.keys(errors).length > 0) {
        return errors;
    }
    
    let updatePost = await axios
    .patch(`http://localhost:3000/posts/${postId}`,
        {title, body, userId}, 
        {signal: request.signal}
    )
    .then(res => res.data)

    return redirect(`/posts/${updatePost.id}`)
}


async function loader ({request: {signal}, params: {postId}}) {
    
    let post = await axios
    .get(`http://localhost:3000/posts/${postId}`, {signal})
    .then((res) => res.data)

    let users = await axios
    .get("http://localhost:3000/users", {signal})
    .then(res => res.data)

    return {post, users}
}

export let editPostRoute = {
    loader,
    action,
    element: <EditPost/>
}

