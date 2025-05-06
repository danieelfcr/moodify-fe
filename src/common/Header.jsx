import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/moodify.png';
import './Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard'; //Determine if we are signed in (on route /dashboard)

  return (
    <header className="header-container">
      <img src={logo} alt="Moodify" className="moodify-logo" onClick={() => navigate('/home')}/>
      <div className="buttons-container">
        {isDashboard ? (
          <button className='btn btn-logout' onClick={() => {
            navigate('/home')
          }}>
            Log out
          </button> 
          ) : (
            <>
              <button className="btn btn-login" onClick={() => navigate('/login')}>Log in</button>
              <button className="btn btn-signup" onClick={() => navigate('/signup')}>Sign up</button>
            </>
          )
        }       
      </div>
    </header>
  );
};
