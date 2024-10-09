import React, { useState } from 'react';
import SelectMenu from './SelectMenu';

// Función para convertir una fecha en formato ISO a 'yyyy-MM-dd' (formato aceptado por el input de tipo date)
const formatDateForInput = (dateString) => {
    // Dividimos la fecha en "T" para separar la fecha de la hora
    const [datePart] = dateString.split('T');
    // Remplazamos los guiones por barras
    return datePart;
};

export default function EditTransactionModal({ transaction, onClose, onSave }) {
    const [selectedType, setSelectedType] = useState(transaction.tipo_id || 0);
    const [selectedCategory, setSelectedCategory] = useState(transaction.categoria_id || 0);
    const [formData, setFormData] = useState({
        monto: transaction.monto || '',
        fecha: formatDateForInput(transaction.fecha) || '',
        descripcion: transaction.descripcion || '',
    });

    // Manejador de cambios para los inputs de monto, fecha y descripción
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el formateo de la moneda en el campo de monto
    const handleMontoChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Eliminamos caracteres no numéricos
        setFormData({
            ...formData,
            monto: rawValue,
        });
    };

    const handleSave = () => {
        // Guardamos el formData con los IDs de tipo y categoría
        onSave({
            ...formData,
            tipo_id: selectedType, // Guardamos el ID del tipo seleccionado
            categoria_id: selectedCategory, // Guardamos el ID de la categoría seleccionada
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[32rem]">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Editar Transacción</h2>
                <form>
                    {/* Tipo de Transacción (usando SelectMenu) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <div className="w-full pt-0.5">
                            <SelectMenu
                                selected={selectedType}
                                setSelected={setSelectedType}
                                items={[
                                    { key: 1, label: 'Ingreso' },
                                    { key: 2, label: 'Egreso' },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Monto */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Monto</label>
                        <input
                            type="text"
                            name="monto"
                            value={formData.monto}
                            onChange={handleMontoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Fecha */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Categoría */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Categoría</label>
                        <div className="w-full pt-1.5">
                            <SelectMenu
                                selected={selectedCategory}
                                setSelected={setSelectedCategory}
                                items={[
                                    { key: 1, label: 'Educación' },
                                    { key: 2, label: 'Entretenimiento' },
                                    { key: 3, label: 'Comida' },
                                    { key: 4, label: 'Trabajo' },
                                    { key: 5, label: 'Regalos' },
                                    { key: 6, label: 'Gimnasio' },
                                    { key: 7, label: 'Ropa' },
                                    { key: 8, label: 'Servicios' },
                                    { key: 9, label: 'Ahorros' },
                                    { key: 10, label: 'Otro' },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
