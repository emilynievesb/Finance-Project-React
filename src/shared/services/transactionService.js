const apiUrl = import.meta.env.VITE_API_URL;
export const createTransaction = async (transactionData) => {
    try {
        const response = await fetch(`${apiUrl}/transacciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Para enviar y recibir cookies
            body: JSON.stringify(transactionData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al realizar la transacción');
        }

        // Si todo sale bien, retornamos la respuesta
        return data;
    } catch (error) {
        // Lanzamos el error para que lo maneje el hook
        throw new Error(error.message || 'Error de red o servidor');
    }
};
export const getTransactionsByUserId = async (userID) => {
    try {
        const response = await fetch(`${apiUrl}/transacciones/usuario/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener las transacciones');
        }

        return data; // Devolvemos los datos de las transacciones
    } catch (error) {
        throw new Error(error.message || 'Error de red o servidor');
    }
};

export const getTransactionsWithPagination = async (userID, page = 1, limit = 10) => {
    try {
        const response = await fetch(`${apiUrl}/transacciones/pag/usuario/${userID}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener las transacciones');
        }

        return data; // Devolvemos los datos de las transacciones con paginación
    } catch (error) {
        throw new Error(error.message || 'Error de red o servidor');
    }
};

// Servicio para eliminar una transacción por su ID
export const deleteTransactionById = async (transactionId) => {
    try {
        const response = await fetch(`${apiUrl}/transacciones/${transactionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Si estás utilizando cookies o autenticación por tokens
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Error al eliminar la transacción');
        }

        return true; // Si la eliminación es exitosa
    } catch (error) {
        throw new Error(error.message || 'Error de red o servidor');
    }
};

// Servicio para editar una transacción existente
export const editTransaction = async (transactionID, updatedData) => {
    try {
        const response = await fetch(`${apiUrl}/transacciones/${transactionID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Convertimos los datos a JSON
        });

        if (!response.ok) {
            throw new Error('Error al editar la transacción');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en la petición de edición:', error);
        throw error;
    }
};
