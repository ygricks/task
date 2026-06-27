import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import './MainLayout.css';

export const MainLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="App">
      <nav className="navbar">
          {user ? (
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
              <li>
                <NavLink to="/login">Logout</NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/info">Info</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          )}
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
