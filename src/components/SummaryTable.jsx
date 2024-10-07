import React, { useState } from 'react';
import { useHandleTransactionsPagination } from '../shared/hooks/useHandleTransactionsPagination'; // Hook para paginación
import { useDeleteTransaction } from '../shared/hooks/useHandleDeleteTransaction'; // Hook para eliminar
import { useHandleEditTransaction } from '../shared/hooks/useHandleEditTransaction'; // Hook para editar
import { useModal } from '../shared/hooks/useModal'; // Hook para manejar la modal
import ConfirmationModal from './ConfirmationModal'; // Modal de confirmación
import TransactionsTable from './TransactionsTable'; // Componente de tabla
import EditTransactionModal from './EditTransactionModal'; // Modal de edición
import TableSkeleton from './TableSkeleton'; // Skeleton Loader

export default function SummaryTable({ userID }) {
    const { transactions, loading, error, currentPage, totalPages, nextPage, prevPage, loadTransactions } = useHandleTransactionsPagination(userID);

    // Hooks para eliminar
    const { deleteTransaction, loading: deleting, error: deleteError, success: deleteSuccess } = useDeleteTransaction();

    // Hooks para editar
    const { handleEditTransaction, loading: editing, error: editError, success: editSuccess } = useHandleEditTransaction();

    // Modal para confirmación de eliminación
    const { isOpen, openModal, closeModal } = useModal();
    const [transactionIdToDelete, setTransactionIdToDelete] = useState(null);

    // Modal para editar transacción
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Función para manejar la eliminación
    const handleDeleteClick = (id) => {
        setTransactionIdToDelete(id); // Guardamos el ID de la transacción a eliminar
        openModal(); // Abrimos la modal
    };

    const handleConfirmDelete = async () => {
        await deleteTransaction(transactionIdToDelete); // Llamamos al hook para eliminar la transacción
        await loadTransactions(currentPage); // Recargamos las transacciones para refrescar la tabla
        closeModal(); // Cerramos la modal
    };

    // Función para abrir el modal de edición
    const openEditModal = (transaction) => {
        setSelectedTransaction(transaction);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedTransaction(null);
    };

    const handleEditSubmit = async (updatedTransaction) => {
        if (selectedTransaction) {
            await handleEditTransaction(selectedTransaction.id, updatedTransaction);

            await loadTransactions(currentPage); // Volvemos a cargar las transacciones después de editar
            closeEditModal(); // Cerramos el modal
        }
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
            {editError && <p className="text-red-500">{editError}</p>}
            {editSuccess && <p className="text-green-500">{editSuccess}</p>}

            {/* Tabla de transacciones */}
            <TransactionsTable
                transactions={transactions}
                handleDeleteClick={handleDeleteClick}
                openEditModal={openEditModal} // Pasamos la función de abrir modal para editar
            />

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

            {/* Modal para editar */}
            {isEditModalOpen && <EditTransactionModal transaction={selectedTransaction} onClose={closeEditModal} onSave={handleEditSubmit} />}

            {deleting && <p>Eliminando transacción...</p>}
            {editing && <p>Editando transacción...</p>}
        </div>
    );
}
