const apiUrl = import.meta.env.VITE_API_URL;

export async function login(username, password) {
    try {
        const response = await fetch(`${apiUrl}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Importante: Esto envía y permite recibir cookies
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el inicio de sesión');
        }

        // Si todo va bien, devolver los datos de la respuesta
        return data;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error; // Volvemos a lanzar el error para que el hook lo maneje
    }
}
