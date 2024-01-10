import { Outlet, Link, ScrollRestoration } from "react-router-dom"

export function RootLayout() {
    return (
        <>
            <nav className="top-nav">
                <div className="nav-text-large">My App</div>
                <ul className="nav-list">
                    <li>
                        <Link to="/posts"> Posts </Link>
                    </li>
                    <li>
                        <Link to="/users"> Users </Link>
                    </li>
                    <li>
                        <Link to="/todos"> Todos </Link>
                    </li>
                </ul>
            </nav>
            
            {/* Restores to the top of the scrollbar */}  
            <ScrollRestoration /> 
            <div className="container">
                <Outlet/>    
            </div>  
        </>
    )
}

/*
    The HTML looks like below
    <ul> 
        <li> <a href="page.html"> Page </a> </li>
    </ul>
*/