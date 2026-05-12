import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return <nav className="navbar">
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/info">Info</NavLink>
            </li>
            <li>
                <NavLink to="/tasks">Tasks</NavLink>
            </li>
        </ul>
    </nav>
}
