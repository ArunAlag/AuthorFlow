import axios from 'axios'
import { useLoaderData, Link, Form, redirect, useActionData } from 'react-router-dom';
import { FormGroup } from '../components/FromGroup';
import { formValidation } from '../Helper/formValidation';

//Set env variable
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function NewPost() {
    let users = useLoaderData();
    let errorMessage = useActionData();

    return (
        <>
            <h1 className="page-title">New Post</h1>
            <Form method="post" className="form">
                <div className="form-row">
                    <FormGroup errorMessage={errorMessage?.title} >
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" />
                    </FormGroup>
                    <FormGroup errorMessage={errorMessage?.userId}>
                        <label htmlFor="userId">Author</label>
                        <select name="userId" id="userId">
                            {users.map((user) => (
                                <option key={user.id} value={user.id} >{user.name}</option>
                            ))}
                        </select>
                    </FormGroup>
                </div>
                <div className="form-row">
                    <FormGroup errorMessage={errorMessage?.body}>
                        <label htmlFor="body">Body</label>
                        <textarea name="body" id="body"></textarea>
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

async function action({request}) {
    let formData = await request.formData();
    let title = formData.get('title');
    let body = formData.get('body');
    let userId = formData.get('userId');

    let errors = formValidation(title, body, userId)
    console.log(Object.keys(errors).length)

    if(Object.keys(errors).length > 0) {
        return errors;
    }

    let newPost = await axios
    .post(`${SERVER_URL}/posts`, 
        {title, body, userId}, 
        {signal: request.signal}
    )
    .then(res => res.data)

    return redirect(`/posts/${newPost.id}`)
}


async function loader({request: {signal}}) {
    return axios
    .get(`${SERVER_URL}/users`, {signal})
    .then((res) => res.data) 
}

export let newPostRoute = {
    loader,
    action,
    element: <NewPost/>
}

