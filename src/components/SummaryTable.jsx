import React, { useState } from 'react';
import { useHandleTransactionsPagination } from '../shared/hooks/useHandleTransactionsPagination'; // Hook para paginación
import { FaTrashAlt } from 'react-icons/fa'; // Icono de basura
import { useDeleteTransaction } from '../shared/hooks/useHandleDeleteTransaction'; // Hook para eliminar
import { useModal } from '../shared/hooks/useModal'; // Hook para manejar la modal
import ConfirmationModal from './ConfirmationModal'; // Importamos la modal de confirmación

// Función para formatear números como moneda colombiana
const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(value);
};

// Función para formatear la fecha en DD/MM/YYYY
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
};

// Componente de Tabla con paginación y animación de fade-in
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

    // Fade-in de la tabla con opacidad y duración suave al cargar
    if (loading) return <p className="text-2xl font-bold tracking-tight text-gray-900 mb-10 text-center pt-10">Cargando transacciones...</p>;
    if (error) return <p className="text-2xl font-bold tracking-tight text-red-900 mb-10 text-center pt-10">{error}</p>;

    return (
        <div className="flex flex-col items-center p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-10">Aquí tienes tu resumen de movimientos</h2>

            {/* Mensajes de éxito y error */}
            {deleteError && <p className="text-red-500">{deleteError}</p>}
            {deleteSuccess && <p className="text-green-500">{deleteSuccess}</p>}

            <table className="divide-y divide-gray-200 border border-gray-300 w-[65rem] transition-opacity duration-500 ease-in opacity-100">
                <thead className="bg-indigo-600">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Monto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Categoría</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-xs min-w-xs max-w-sm truncate">
                            Descripción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[10%]">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((row, index) => (
                        <tr
                            key={row.id}
                            className={`${
                                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                            } hover:bg-gray-100 transition-shadow duration-300 ease-in-out hover:shadow-md`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15%]">{row.tipo}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm w-[15%] ${row.tipo_id === 2 ? 'text-red-500' : 'text-green-500'}`}>
                                {row.tipo_id === 2 ? `- ${formatCurrency(row.monto)}` : `+ ${formatCurrency(row.monto)}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15%]">{formatDate(row.fecha)}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 tracking-wider w-[15%]">{row.categoria}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 min-w-xs max-w-xs truncate" title={row.descripcion}>
                                {row.descripcion}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(row.id)} title="Eliminar">
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
