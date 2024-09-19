import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa'; 
import './Navbar.css';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState('John Doe');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const goHome = () => {
        navigate('/home');
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="navbar-end">
                    <button onClick={goHome} className="home-button">
                        <FaHome size={24} /> {/* Ícone de casa */}
                    </button>
                    <div className="user-icon" onClick={toggleDropdown}>
                        <FaUserCircle size={24} /> {/* Ícone de usuário */}
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <p>{userName}</p>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
