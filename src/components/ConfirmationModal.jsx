import React from 'react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">¿Estás seguro?</h2>
                <p className="text-gray-600 mb-6">Esta acción no se puede deshacer. ¿Deseas eliminar esta transacción?</p>
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-150" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150" onClick={onConfirm}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
