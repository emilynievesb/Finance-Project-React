import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate(); // Para redirigir al usuario

    // Función para redirigir al usuario a la página de login
    const handleRedirect = () => {
        navigate('/'); // Cambia '/login' por la ruta a la que quieres redirigir.
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
            <p className="text-gray-600 mb-6">Lo sentimos, la página a la que intentas acceder no está disponible o no tienes permisos para verla.</p>
            <button
                onClick={handleRedirect}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 transition-colors"
            >
                Volver al Login
            </button>
        </div>
    );
}
