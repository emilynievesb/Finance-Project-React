// SummaryTable.js
import React, { useState } from 'react';
import { useHandleTransactionsPagination } from '../shared/hooks/useHandleTransactionsPagination'; // Hook para paginación
import { useDeleteTransaction } from '../shared/hooks/useHandleDeleteTransaction'; // Hook para eliminar
import { useModal } from '../shared/hooks/useModal'; // Hook para manejar la modal
import ConfirmationModal from './ConfirmationModal'; // Modal de confirmación
import TransactionsTable from './TransactionsTable'; // Componente de tabla
import TableSkeleton from './TableSkeleton'; // Skeleton Loader

export default function SummaryTable({ userID }) {
    const { transactions, loading, error, currentPage, totalPages, nextPage, prevPage, loadTransactions } = useHandleTransactionsPagination(userID);
    const { deleteTransaction, loading: deleting, error: deleteError, success: deleteSuccess } = useDeleteTransaction();
    const { isOpen, openModal, closeModal } = useModal();
    const [transactionIdToDelete, setTransactionIdToDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setTransactionIdToDelete(id); // Guardamos el ID de la transacción a eliminar
        openModal(); // Abrimos la modal
    };

    const handleConfirmDelete = async () => {
        await deleteTransaction(transactionIdToDelete); // Llamamos al hook para eliminar la transacción
        await loadTransactions(currentPage); // Recargamos las transacciones para refrescar la tabla
        closeModal(); // Cerramos la modal
    };

    // Si está cargando, mostramos el skeleton loader
    if (loading) return <TableSkeleton />;
    if (error) return <p className="text-2xl font-bold tracking-tight text-red-900 mb-10 text-center pt-10">{error}</p>;

    return (
        <div className="flex flex-col items-center p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-10">Aquí tienes tu resumen de movimientos</h2>

            {/* Mensajes de éxito y error */}
            {deleteError && <p className="text-red-500">{deleteError}</p>}
            {deleteSuccess && <p className="text-green-500">{deleteSuccess}</p>}

            {/* Tabla de transacciones */}
            <TransactionsTable transactions={transactions} handleDeleteClick={handleDeleteClick} />

            {/* Paginación */}
            <div className="mt-4 flex justify-between items-center w-full max-w-lg">
                <button
                    onClick={prevPage}
                    className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-500'
                    }`}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span className="text-sm text-gray-700">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-500'
                    }`}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>

            {/* Modal de confirmación */}
            <ConfirmationModal isOpen={isOpen} onClose={closeModal} onConfirm={handleConfirmDelete} />

            {deleting && <p>Eliminando transacción...</p>}
        </div>
    );
}
