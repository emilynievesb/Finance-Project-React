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
