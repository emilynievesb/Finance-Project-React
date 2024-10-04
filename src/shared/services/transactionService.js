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
