import { useState } from 'react';
import { deleteTransactionById } from '../services/transactionService'; // Importamos el servicio

// Hook personalizado para manejar la eliminación de una transacción
export const useDeleteTransaction = () => {
    const [loading, setLoading] = useState(false); // Estado para indicar si está en proceso de eliminación
    const [error, setError] = useState(null); // Estado para manejar errores
    const [success, setSuccess] = useState(null); // Estado para manejar el éxito

    const deleteTransaction = async (transactionId) => {
        setLoading(true); // Indicar que se está procesando la eliminación
        setError(null); // Reiniciar el estado de error
        setSuccess(null); // Reiniciar el estado de éxito

        try {
            await deleteTransactionById(transactionId); // Llamar al servicio para eliminar la transacción
            setTimeout(() => {
                setSuccess('Transacción eliminada exitosamente'); // Si se elimina correctamente
                setLoading(false); // Finaliza el estado de carga
                setTimeout(() => {
                    setSuccess(null);
                }, 500);
            }, 1000);
        } catch (err) {
            setError('Error al eliminar la transacción: ' + err.message); // Manejo de errores
        }
    };

    return {
        deleteTransaction,
        loading,
        error,
        success,
    };
};
