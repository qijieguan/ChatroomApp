import { Link } from 'react-router-dom';
import Menu from './Menu.js';

export default function Nav () {
    
    return (
        <div>
            <header className = "nav-bar">
                    <Menu/>
                    <h1 className="logo">Topic Road</h1>
                    {!localStorage.getItem("isLogged") ?
                        <nav className="nav-links">   
                            <Link to="/">Home</Link>
                            <Link to="/login" className="login">Login</Link>
                        </nav>
                        : <div className='nav-links'/>
                    }
            </header>
        </div>
    );
};