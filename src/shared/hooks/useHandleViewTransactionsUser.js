import { useState, useEffect } from 'react';
import { getTransactionsByUserId } from '../services/transactionService';

export const useHandleViewTransactionsUser = (userID) => {
    const [transactions, setTransactions] = useState([]); // Estado para las transacciones
    const [loading, setLoading] = useState(true); // Estado para indicar que se están cargando los datos
    const [error, setError] = useState(null); // Estado para manejar errores

    // Función para cargar las transacciones del usuario
    const loadTransactions = async () => {
        setLoading(true);
        setError(null);

        try {
            // Usamos el servicio para obtener las transacciones desde el backend
            const fetchedData = await getTransactionsByUserId(userID);
            console.log(fetchedData);
            setTransactions(fetchedData); // Guardamos las transacciones en el estado
        } catch (err) {
            setError('Error al cargar las transacciones: ' + err.message); // Manejamos errores
        } finally {
            setLoading(false); // Desactivamos el estado de carga al finalizar
        }
    };

    // Usar el efecto para cargar los datos cuando el hook se monte o cuando cambie el userID
    // useEffect(() => {
    //     if (userID) {
    //         loadTransactions();
    //     }
    // }, [userID]);
    // loadTransactions();

    return {
        transactions,
        loading,
        error,
    };
};
