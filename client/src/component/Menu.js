import { Link } from 'react-router-dom';
import { AiOutlineMenuFold } from 'react-icons/ai';


const Menu = () => {
    
    const url = sessionStorage.getItem("url");

    const logout = () => {
        sessionStorage.clear();
        window.location.href='/login';
    };

    return (
        <div style={{width: '20%'}}>
            {sessionStorage.getItem("isLogged")
                ?
                <div className="menu-icon" style={{float: 'center'}}>
                    <AiOutlineMenuFold
                        size={25}
                        color='white'
                        style={{float: 'left', marginLeft: '40px'}}
                    />
                    <nav className="nav-panel">
                        <div className='profile'>
                            <img src={url} className='profile-img' alt=""/>
                            <h1 className='profile-name'>{sessionStorage.getItem("user")}</h1>
                        </div>
                        <Link to="/dashboard" className='nav-li dashboard'>Dashboard</Link>
                        <Link to="/" className="nav-li logout" onClick={logout}>Logout</Link>
                    </nav>
                </div>
                :
                <div/>
            }
        </div>
    );
}

export default Menu;