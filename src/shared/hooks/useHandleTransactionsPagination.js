import { useState, useEffect } from 'react';
import { getTransactionsWithPagination } from '../services/transactionService';

// Hook personalizado para manejar las transacciones paginadas
export const useHandleTransactionsPagination = (userID, rowsPerPage = 10) => {
    const [transactions, setTransactions] = useState([]); // Estado para las transacciones
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas

    // Función para cargar las transacciones con paginación
    const loadTransactions = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getTransactionsWithPagination(userID, page, rowsPerPage); // Llamamos al servicio
            setTimeout(() => {
                setTransactions(data.transactions); // Actualizamos el estado con las transacciones
                setTotalPages(data.totalPages); // Actualizamos el total de páginas
                setCurrentPage(data.page); // Establecemos la página actual
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError('Error al cargar las transacciones: ' + err.message);
        }
    };

    // Funciones para cambiar de página
    const nextPage = () => {
        if (currentPage < totalPages) {
            loadTransactions(currentPage + 1); // Cargar la siguiente página
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            loadTransactions(currentPage - 1); // Cargar la página anterior
        }
    };

    // Cargar las transacciones al montar el hook o cuando cambie el userID
    useEffect(() => {
        if (userID) {
            loadTransactions(currentPage); // Cargar la página inicial
        }
    }, [userID]);

    return {
        transactions,
        loading,
        error,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        loadTransactions,
    };
};
