import { Link } from 'react-router-dom';
import Menu from './Menu.js';

export default function Nav () {
    
    const logout = () => {
      localStorage.clear();
      window.location.href='/login';
    };
  
    return (
        <div>
            <header className = "nav-bar">
                    <Menu/>
                    <div className="logo">Topic Road</div>
                    <div className="nav-links">     
                        <Link to="/">Home</Link>
                        {localStorage.getItem("isLogged") ?
                            <Link onClick={logout} to="/" className="logout">Logout</Link>
                        :
                            <Link to="/login" className="login">Login</Link>
                        }
                    </div>
            </header>
        </div>
    );
};