import { useState } from 'react';
import { signupUser } from '../services/signupService';

// Hook personalizado para manejar el formulario de registro
export const useSignupForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validar el formulario
    const validateForm = () => {
        const validationErrors = {};
        if (!formData.nombre) validationErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido) validationErrors.apellido = 'El apellido es requerido';
        if (!formData.correo) {
            validationErrors.correo = 'El correo es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
            validationErrors.correo = 'El correo no es válido';
        }
        if (!formData.username) validationErrors.username = 'El nombre de usuario es requerido';
        if (!formData.password) {
            validationErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        return validationErrors;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage(null);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Si hay errores, se muestran
        } else {
            setLoading(true);
            try {
                const response = await signupUser(formData); // Llamamos al servicio de registro
                setTimeout(() => {
                    setSuccessMessage('Usuario registrado con éxito');
                    setFormData({ nombre: '', apellido: '', correo: '', username: '', password: '' }); // Limpiar formulario.
                    setTimeout(() => {
                        setSuccessMessage(null);
                        setLoading(false);
                    }, 1000);
                }, 1000);
            } catch (error) {
                setErrors({ general: error.message });
            }
        }
    };

    return {
        formData,
        errors,
        loading,
        successMessage,
        handleInputChange,
        handleSubmit,
    };
};
