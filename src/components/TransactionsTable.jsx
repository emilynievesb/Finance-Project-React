import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

export default function TransactionsTable({ transactions, handleDeleteClick, openEditModal }) {
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
        return dateString.replace(/-/g, '/');
    };

    return (
        <table className="divide-y divide-gray-200 border border-gray-300 w-[65rem] transition-opacity duration-500 ease-in opacity-100">
            <thead className="bg-indigo-600">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[15%]">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-xs min-w-xs max-w-sm truncate">Descripción</th>
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
                            <button className="text-blue-600 hover:text-blue-800 mr-4" onClick={() => openEditModal(row)} title="Editar">
                                <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(row.id)} title="Eliminar">
                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
