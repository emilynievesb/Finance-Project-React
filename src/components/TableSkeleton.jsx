// TableSkeleton.js
import React from 'react';

export default function TableSkeleton() {
    const rows = Array.from({ length: 11 });

    return (
        <div className="animate-pulse flex flex-col items-center p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-10">Cargando...</h2>
            <table className="divide-y divide-gray-200 border border-gray-300 w-[65rem] h-[10rem]">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-[15%]">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-[15%]">Monto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-[15%]">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-[15%]">Categoría</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-xs min-w-xs max-w-sm truncate">
                            Descripción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-[10%]">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200">
                    {rows.map((_, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap w-[15%]">
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap w-[15%]">
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap w-[15%]">
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap w-[15%]">
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap max-w-sm">
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap w-[10%]">
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
