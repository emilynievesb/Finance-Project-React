import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/loginService';

// Este hook maneja la lógica de envío de formulario de inicio de sesión
export const useHandleSubmitLogin = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e, username, password, setUserIsLogged, setUserID, setUserName) => {
        e.preventDefault();
        setError(null);

        if (!username.trim() || !password.trim()) {
            setError('Por favor, completa ambos campos');
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await login(username, password);

            if (data) {
                setUserIsLogged(true);
                // Suponiendo que el backend ya haya configurado la cookie del JWT
                setTimeout(() => {
                    setIsSubmitting(false);
                    setUserID(data.userId);
                    setUserName(data.nombre);
                    navigate('/dashboard');
                }, 1000);
            } else {
                setIsSubmitting(false);
                setError(data.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            setIsSubmitting(false);
            console.log(error);
            setError(error.message);
        }
    };

    return { handleSubmit, isSubmitting, error };
};
