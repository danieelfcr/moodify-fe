import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); //Hooks to manage values
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); //Hook to manage errors

  //Form validations
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is mandatory.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is not in a valid format.";
    }

    if (!password) {
      newErrors.password = "Password is mandatory.";
    } else if (password.length < 8) {
      newErrors.password = "Password most have, at least, 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Manage submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = {
        email: email.trim(),
        password: password.trim()
      };

      try {
        const res = await axios.post('http://localhost:3001/auth/login', user);
        console.log(res);
        //Save token in local storage
        sessionStorage.setItem('token', res.data.token);
        navigate('/dashboard'); //If everything is correct (:D), go to /dashboard
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("The user doesn't exist.");
        }
        else if (error.response && error.response.status === 401) {
          alert("Password is incorrect.")
        }
        else {
          console.error('Error logging in:', error);
          alert('An error occurred logging in.')
        }
      }
      
    }
  };


  return (
    <>
    <div className='forms-login'>
      <form onSubmit={handleSubmit}>
        <div className='text-login'>
            <div className='h1-login'>
                <h1>Sign In</h1>
            </div>
            <div className='p-login'>
                <p>Ingresa a tu cuenta para continuar con Moodify</p>
            </div>
        </div>
        <div className='forms-items-login'>     
                <label className='lbl-account-login'>Email Account: </label>
                <input 
                  className='inpt-account-login' 
                  type="text" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>} {/*If there is an error, show it*/}

                <label className='lbl-password-login'>Password: </label>
                <input 
                  className='inpt-password-login' 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>} {/*If there is an error, show it*/}

                <button className='btn-account-login' type="submit">Enviar</button>
                <div>
                <label className='lbl-si-login'>¿No tienes una cuenta?  </label>  
                <button className='btn-si-login' onClick={() => navigate('/signup')}>Registrate</button>         
                </div>
        </div>
      </form>
    </div>
  </>
);
};