import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginImage from '../assets/LoginImage.jpg';
export default function LoginPage({ setUserIsLogged, setUserName, setUserID }) {
    return (
        <div className="flex w-[100%] h-[100vh]">
            {/* Sección izquierda: Formulario */}
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <LoginForm setUserName={setUserName} setUserIsLogged={setUserIsLogged} setUserID={setUserID} />
            </div>

            {/* Sección derecha: Imagen */}
            <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${LoginImage})` }}></div>
        </div>
    );
}
