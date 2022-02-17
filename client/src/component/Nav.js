import { Link } from 'react-router-dom';
import Menu from './Menu.js';

export default function Nav () {
    
    const resetClick = () => {
        let buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(btn => {
            btn.style.color = 'white';
            btn.style.background = 'none';
            btn.style.borderBottom = '0';
        });
    }

    const handleClick = (event) => {
        resetClick();
        event.target.style.color = 'green';
        event.target.style.background = 'rgb(231, 255, 231)';
        event.target.style.borderBottom = '3px solid green';
    }

    return (
        <div>
            <header id="nav-bar">
                    <Menu/>
                    <h1 id="logo">ChatRoom</h1>
                    {!sessionStorage.getItem("isLogged") ?
                        <nav id="nav-links">   
                            <Link to="/"><div onClick={handleClick} className="nav-btn">Home</div></Link>
                            <Link to="/login"> 
                                <div onClick={handleClick} className="nav-btn">Login</div>
                            </Link>
                        </nav>
                        : <div id='nav-links'/>
                    }
            </header>
        </div>
    );
};