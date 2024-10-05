import React from 'react';
import { useSignupForm } from '../shared/hooks/useHandleSubmitSignUp';

export default function SignupForm() {
    const { formData, errors, loading, successMessage, handleInputChange, handleSubmit } = useSignupForm(); // Usamos el hook para manejar el formulario

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Crear Cuenta</h2>

                {/* Mensaje de éxito */}
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

                {/* Mensaje de error general */}
                {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.nombre && <p className="text-red-500 text-xs mt-2">{errors.nombre}</p>}
                    </div>

                    {/* Apellido */}
                    <div>
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            name="apellido"
                            type="text"
                            value={formData.apellido}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.apellido && <p className="text-red-500 text-xs mt-2">{errors.apellido}</p>}
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            id="correo"
                            name="correo"
                            type="email"
                            value={formData.correo}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.correo && <p className="text-red-500 text-xs mt-2">{errors.correo}</p>}
                    </div>

                    {/* Nombre de Usuario */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nombre de Usuario
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username}</p>}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
                    </div>

                    {/* Botón de Registro */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
