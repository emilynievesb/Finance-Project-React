import React, { useState } from 'react';
import logo from '../assets/LogoFinanzas.png';
import { useHandleSubmitLogin } from '../shared/hooks/useHandleSubmitLogin';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setUserName, setUserIsLogged, setUserID }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleSubmit, isSubmitting, error } = useHandleSubmitLogin();

    const navigate = useNavigate();

    // Función para manejar el clic en el enlace de registrarse
    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img alt="Your Company" src={logo} className="mx-auto h-auto w-[50%]" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión</h2>
                </div>

                <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        action="#"
                        method="POST"
                        className="space-y-6"
                        onSubmit={(e) => handleSubmit(e, username, password, setUserIsLogged, setUserID, setUserName)}
                    >
                        <div className="text-left">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-left">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si lo hay */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isSubmitting ? 'Enviando...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        No tienes una cuenta?{' '}
                        <a
                            href="#"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            onClick={handleRegisterClick} // Redirigir al hacer clic en "Registrarse"
                        >
                            Registrate
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
