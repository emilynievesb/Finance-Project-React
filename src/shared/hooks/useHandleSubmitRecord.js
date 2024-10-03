import { useState } from 'react';

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

    return { amount, formatCurrency, handleInputAmountChange };
};

const useHandleDateChange = (e) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // Actualizar el estado con la fecha seleccionada
    };
    return { selectedDate, handleDateChange };
};

const useHandleDescriptionChange = (e) => {
    const [description, setDescription] = useState('');

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    return { description, handleDescription };
};

const useHandleSubmit = () => {
    const [error, setError] = useState(''); // Estado para manejar el error

    const handleSubmit = (e, selectedType, amount, selectedDate, description) => {
        e.preventDefault();
        setError(null);

        if (!selectedType || selectedType == '-') {
            setError('Por favor, selecciona un tipo de registro.');
            return;
        }
        console.log({ selectedType, amount, selectedDate, description });
    };

    return { handleSubmit, error };
};

export { useHandleInputAmountChange, useHandleDateChange, useHandleDescriptionChange, useHandleSubmit };
