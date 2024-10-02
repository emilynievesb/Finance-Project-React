import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Este hook maneja la lógica de envío de formulario de inicio de sesión
export const useHandleSubmitLogin = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e, username, password) => {
        e.preventDefault();
        setError(null);

        if (!username.trim() || !password.trim()) {
            setError('Por favor, completa ambos campos');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            if (username === 'emily' && password === 'emily') {
                navigate('/dashboard');
            } else {
                setError('Credenciales incorrectas');
            }
        }, 1000);
    };

    return { handleSubmit, isSubmitting, error };
};
