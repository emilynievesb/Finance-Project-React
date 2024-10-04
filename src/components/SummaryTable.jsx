import React from 'react';
import { useHandleTransactionsPagination } from '../shared/hooks/useHandleTransactionsPagination'; // Importamos el hook

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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11, por eso sumamos 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
};

// Componente de Tabla con paginación
export default function SummaryTable({ userID }) {
    const { transactions, loading, error, currentPage, totalPages, nextPage, prevPage } = useHandleTransactionsPagination(userID);
    if (loading) return <p className="text-2xl font-bold tracking-tight text-gray-900 mb-10 text-center pt-10">Cargando transacciones...</p>;
    if (error) return <p className="text-2xl font-bold tracking-tight text-red-900 mb-10 text-center pt-10">{error}</p>;
    return (
        <div className=" flex flex-col items-center p-10 ">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-10">Aquí tienes tu resumen de movimientos</h2>
            <table className="divide-y divide-gray-200 border border-gray-300 w-[65rem] ">
                <thead className="bg-indigo-600">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%] ">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%] ">Monto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%] ">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-xs min-w-xs max-w-sm truncate">
                            Descripción
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((row, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15%]">{row.tipo_id === 1 ? 'Ingreso' : 'Egreso'}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm w-[15%] ${row.tipo_id === 2 ? 'text-red-500' : 'text-green-500'}`}>
                                {/* Si es egreso, muestra el monto con el signo negativo */}
                                {row.tipo_id === 2 ? `- ${formatCurrency(row.monto)}` : `+ ${formatCurrency(row.monto)}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[15%]  ">{formatDate(row.fecha)}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 min-w-xs max-w-xs truncate" title={row.descripcion}>
                                {row.descripcion}
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
        </div>
    );
}
