import { useState } from 'react';
import { createTransaction } from '../services/transactionService';

const useHandleInputAmountChange = () => {
    const [amount, setAmount] = useState('');

    // Función para formatear el número como moneda colombiana
    const formatCurrency = (value) => {
        if (!value) return '';

        // Formatea el número como moneda colombiana
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(value);
    };

    // Función para manejar el cambio en el input de monto
    const handleInputAmountChange = (e) => {
        // Eliminar todos los caracteres no numéricos
        const value = e.target.value.replace(/\D/g, '');

        // Establecer el valor como número entero
        setAmount(value);
    };

    return { amount, setAmount, formatCurrency, handleInputAmountChange };
};

const useHandleDateChange = (e) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // Actualizar el estado con la fecha seleccionada
    };
    return { selectedDate, setSelectedDate, handleDateChange };
};

const useHandleDescriptionChange = (e) => {
    const [description, setDescription] = useState('');

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    return { description, setDescription, handleDescription };
};

const useHandleSubmit = () => {
    const [error, setError] = useState(''); // Estado para manejar el error
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el proceso de envío

    const handleSubmit = async (e, userID, selectedType, selectedCategory, amount, selectedDate, description, resetForm) => {
        e.preventDefault();
        setError(null);

        // Validaciones básicas
        if (!selectedType || selectedType === '-') {
            setError('Por favor, selecciona un tipo de registro.');
            return;
        }
        if (!amount || amount <= 0) {
            setError('Por favor, ingresa un monto válido.');
            return;
        }

        // Preparar el objeto de datos a enviar
        const transactionData = {
            usuario_id: userID,
            tipo_id: selectedType, // Asumimos que `selectedType` es el ID del tipo de transacción
            monto: amount,
            categoria_id: selectedCategory,
            fecha: selectedDate, // Puede estar en formato ISO 8601 o el formato que maneje el backend
            descripcion: description,
        };
        setIsSubmitting(true); // Indicar que la solicitud está en proceso

        try {
            await createTransaction(transactionData);
            setTimeout(() => {
                resetForm();
                setIsSubmitting(false);
                setError(null);
                setSuccess('Transacción completada exitosamente');
                setTimeout(() => {
                    resetForm();
                    setSuccess('');
                }, 1000);
            }, 1000);
        } catch (error) {
            setIsSubmitting(false);
            setError('Error al registrar la transacción: ' + error.message);
        }
    };

    return { handleSubmit, error, success, isSubmitting };
};

export { useHandleInputAmountChange, useHandleDateChange, useHandleDescriptionChange, useHandleSubmit };
