const apiUrl = import.meta.env.VITE_API_URL;

async function login(username, password) {
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

        if (response.ok) {
            console.log('Login exitoso:', data);
        } else {
            console.error('Error en el login:', data.message);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
}
