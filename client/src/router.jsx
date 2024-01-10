// React Functions
import { Navigate, createBrowserRouter } from "react-router-dom";

// Components functions
import { postListRoute } from "./pages/PostList";
import { userListRoute } from "./pages/UserList";
import { todoListRoute } from "./pages/TodoList";
import { postRoute } from "./pages/Post";
import { userRoute } from "./pages/User";
import { newPostRoute } from "./pages/NewPost";
import { editPostRoute } from "./pages/EditPost";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                errorElement: <h1>Error</h1>,
                children: [
                    {index: true, element: <Navigate to="/posts"/>},
                    {
                        path: "posts",
                        children: [
                            {
                                index: true, 
                                ...postListRoute,
                            },
                            {
                                path: ":postId",
                                children: [
                                    {index: true, ...postRoute},
                                    {path: "edit", ...editPostRoute}
                                ]
                            },
                            {path: "new", ...newPostRoute}
                        ],
                    },
                    { 
                        path: "users",
                        children: [
                            {
                                index: true,
                                ...userListRoute
                            },
                            {path: ":userId", ...userRoute}
                        ]
                        },
                    {path: "todos", ...todoListRoute},
                    {path: "*", element: <h1>404, page not found</h1>}
                        ],
                    }
            
        ]
    }
])