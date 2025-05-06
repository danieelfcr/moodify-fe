import React, { useState } from 'react'
import './CreateAccount.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export const CreateAccount = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); //Hooks to manage values
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [errors, setErrors] = useState({}); //Hook to manage errors
  
    //Form validations
    const validateForm = () => {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nameRegex = /^[A-Za-z\s]+$/;
  
      if (!name) {
        newErrors.name = "Name is mandatory.";
      } else if (!nameRegex.test(name)) {
        newErrors.name = "Name is not in a valid format.";
      }

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

      if (!cpassword) {
        newErrors.cpassword = "Confirm Password is mandatory.";
      } else if (password !== cpassword) {
        newErrors.cpassword = "Different password";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    //Manage submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
          const newUser = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
          };

          try {
            const res = await axios.post('http://localhost:3001/users/create-user', newUser);
            console.log(res);
            alert("Account created successfully. You can now log in!");
            navigate('/login');
          } catch (error) {
            if (error.response && error.response.status === 409) {
              alert("The email is already in use. Please try a different one.");
            } else {
              console.error('Error creating user:', error);
              alert("An error occurred while creating the user. Please try again.");
            }
          } 
        }
    };


  return (
    <>
    <div className='forms-ca'>
    <form onSubmit={handleSubmit}>
        <div className='text-ca'>
            <div className='h1-ca'>
                <h1>Sign Up</h1>
            </div>
            <div className='p-ca'>
                <p>Ingresa a tu cuenta para continuar con Moodify</p>
            </div>
        </div>
        <div className='forms-items-ca'>     
                <label className='lbl-name-ca'>Name: </label>
                <input className='inpt-name-ca' type="text" placeholder="Name" value={name} 
                onChange={(e) => setName(e.target.value)}/> 
                {errors.name && <p className="error">{errors.name}</p>} {/*If there is an error, show it*/}

                <label className='lbl-account-login'>Email Account: </label>
                <input className='inpt-account-login' type="text" placeholder="Email" value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && <p className="error">{errors.email}</p>} {/*If there is an error, show it*/}

                <label className='lbl-password-ca'>Password: </label>
                <input className='inpt-password-ca' type="password" placeholder="Password" value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && <p className="error">{errors.password}</p>} {/*If there is an error, show it*/}

                <label className='lbl-cpassword-ca'>Confirm password: </label>
                <input className='inpt-cpassword-ca' type="password" placeholder="Confirm password" value={cpassword} 
                onChange={(e) => setCpassword(e.target.value)}/>
                {errors.cpassword && <p className="error">{errors.cpassword}</p>} {/*If there is an error, show it*/}

                <button className='btn-account-login' type="submit">Enviar</button>
                <div>
                <label className='lbl-si-ca'>¿Ya tienes una cuenta?  </label>  
                <button className='btn-si-ca' type="submit" onClick={() => navigate('/login')}>Iniciar sesión</button>         
                </div>
        </div>
      </form>
    </div>
  </>
);
};