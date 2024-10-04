import React, { useState } from 'react';
import SelectMenu from './SelectMenu';
import { useHandleDateChange, useHandleDescriptionChange, useHandleInputAmountChange, useHandleSubmit } from '../shared/hooks/useHandleSubmitRecord';

export default function AddRecordForm({ userID }) {
    const [selectedType, setSelectedType] = useState(0);
    const { amount, setAmount, formatCurrency, handleInputAmountChange } = useHandleInputAmountChange();
    const { selectedDate, setSelectedDate, handleDateChange } = useHandleDateChange();
    const { description, setDescription, handleDescription } = useHandleDescriptionChange();
    const { handleSubmit, error, success, isSubmitting } = useHandleSubmit();

    // Función para resetear el formulario
    const resetForm = () => {
        setSelectedType(0); // Resetea el tipo de transacción
        setAmount(''); // Resetea el monto
        setSelectedDate(''); // Resetea la fecha
        setDescription(''); // Resetea la descripción
    };

    const amountInputClass =
        selectedType === 2 // 2 representa "Egreso"
            ? 'w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-red-500 sm:text-sm transition-all duration-150'
            : 'w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm transition-all duration-150';

    return (
        <form
            method="POST"
            className="w-[100%] h-screen flex flex-col justify-center items-center sm:p-4 p-4"
            onSubmit={(e) => handleSubmit(e, userID, selectedType, amount, selectedDate, description, resetForm)}
        >
            <div className="w-full max-w-3xl space-y-12 border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Agrega un Ingreso o Egreso</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Por favor, diligencia atentamente cada uno de los espacios asignados para poder procesar correctamente tu información y guardarlo de manera
                    eficiente en nuestra base de datos!
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
                    {/* Tipo de Registro */}
                    <div className="sm:col-span-1">
                        <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                            Tipo de Registro
                        </label>
                        <div>
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
                    <div className="sm:col-span-1">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Monto
                        </label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            required
                            value={formatCurrency(amount)}
                            onChange={handleInputAmountChange}
                            autoComplete="off"
                            className={amountInputClass}
                        />
                    </div>

                    {/* Fecha */}
                    <div className="sm:col-span-1">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Selecciona la fecha
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full px-4 mt-1 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm transition-all duration-150"
                        />
                    </div>
                </div>

                {/* Descripción */}
                <div className="mt-8">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Descripción
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={description}
                            onChange={handleDescription}
                            required
                            autoComplete="off"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                        Puedes escribir todo lo que se te ocurra, esto en un futuro te ayudará a recordar el por qué de este movimiento.
                    </p>
                </div>

                {/* Error después de la descripción y antes del botón */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                {/* Botón de envío */}
                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="white" viewBox="0 0 20 20" stroke="none">
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414L9.414 14l-4.707-4.707a1 1 0 011.414-1.414L9.414 11.586l6.293-6.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    );
}
