import { useState } from 'react';
import { editTransaction } from '../services/transactionService'; // Importamos el servicio de edición

export const useHandleEditTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Estado para manejar el éxito

    const handleEditTransaction = async (transactionID, updatedData) => {
        setLoading(true);
        setError(null);
        setSuccess(null); // Reiniciar el estado de éxito

        try {
            const response = await editTransaction(transactionID, updatedData);
            setTimeout(() => {
                setSuccess('Transacción editada exitosamente'); // Si se editada correctamente
                setLoading(false); // Finaliza el estado de carga
                setTimeout(() => {
                    setSuccess(null);
                }, 500);
            }, 1000);
            return response.data;
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { handleEditTransaction, loading, error, success };
};
