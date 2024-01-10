import axios from 'axios'
import { useLoaderData, Link } from 'react-router-dom'

//Set env variable
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function UserList() {
    let users = useLoaderData()
    return (
        <>
            <h1 className="page-title">Users</h1>
            <div className="card-grid">
                {users.map((user) => (
                    <div key={user.id} className="card">
                    <div className="card-header">{user.name}</div>
                    <div className="card-body">
                        <div>{user.company.name}</div>
                        <div>{user.website}</div>
                        <div>{user.email}</div>
                    </div>
                    <div className="card-footer">
                        <Link className="btn" to={user.id.toString()}>View</Link>
                    </div>
                    </div>
                ))}
                
            </div>
        </>
    )
}

function loader ({request: {signal}}) {
    return axios
    .get(`${SERVER_URL}/users`, {signal})
    .then(res => res.data)
}

export let userListRoute = {
    loader,
    element: <UserList/>
}