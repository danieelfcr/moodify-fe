import React from 'react'
import './home.css'
import logo from '../assets/homeLogo.png'
import logoCamera from '../assets/Camera.png'
import logoEmotion from '../assets/Emotion.png'
import logoNote from '../assets/note.png'
import { useNavigate } from 'react-router-dom';

export const Home = () => { 
    const navigate = useNavigate();
    return (
        <>
        <div className='text-direction-home'>
            <div className='text-content-home'>
                <h1 className="h1-home">
                        Moodify: Música para cada emoción
                </h1>
                <p className="p-home">
                        Descubre música que resuena con tu estado de ánimo actual. Nuestra tecnología analiza tus emociones
                        y te recomienda la música perfecta para cada momento.
                </p>
        </div>
        <img src={logo} alt="Moodify" className="moodify-logo-home" />
        </div>
        <div className='button-drection-home'>
            <button className='btn-si-home' onClick={() => navigate('/login')}>Sign in</button>
            <div className='button-content-home'>
                <button className='btn-su-home' onClick={() => navigate('/signup')}>Sign up</button> 
            </div>
        </div>
        <div className='text-direction-2-home'>
                <h1 className="h1-2-home">
                        ¿Cómo funciona?
                </h1>
                <p className="p-2-home">
                        Moodify utiliza tecnología avanzada de reconocimiento facial para analizar tus emociones y recomendarte música que se adapte a tu estado de ánimo.
                </p>
        </div>
        <div className='text-direction-sqaure-home'>
            <div className='square-1-home'>
            <img src={logoCamera} alt="Moodify" className="moodify-logoCamera-home" />
                <h1 className='h1-s1-home'>
                    Captura tu foto
                </h1>
                <p className='p-s1-home'>
                    Toma una foto o sube una existente para que nuestro sistema analice tu expresión facial.
                </p>
            </div>
            <div className='square-2-home'>
            <img src={logoEmotion} alt="Moodify" className="moodify-logoEmotion-home" />
                <h1 className='h1-s2-home'>
                    Análisis emocional
                </h1>
                <p className='p-s2-home'>
                    Nuestro algoritmo detecta tu estado emocional basado en tu expresión facial.
                </p>
                
            </div>
            <div className='square-3-home'>
            <img src={logoNote} alt="Moodify" className="moodify-logoNote-home" />
                <h1 className='h1-s3-home'>
                    Recomendación musical
                </h1>
                <p className='p-s3-home'>
                    Recibe recomendaciones musicales personalizadas que se adaptan a tu estado de ánimo actual.
                </p>
                
            </div>
        </div>
        </>
    )
}
