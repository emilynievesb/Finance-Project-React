import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/logoutService';

export const useHandleLogout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Inicializamos useNavigate para redirigir

    const handleLogout = async (setUserIsLogged) => {
        setIsLoggingOut(true);
        setError(null);

        try {
            await logoutUser(); // Llamamos al servicio de logout
            setUserIsLogged(false); // Cambiamos el estado de logged para el frontend
            navigate('/'); // Redirigimos al usuario a la página de inicio
        } catch (err) {
            setError(err.message); // Si ocurre un error, lo guardamos
        } finally {
            setIsLoggingOut(false); // Terminamos el proceso de logout
        }
    };

    return { handleLogout, isLoggingOut, error };
};
