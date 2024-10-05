const apiUrl = import.meta.env.VITE_API_URL;

// Servicio para registrar un nuevo usuario
export const signupUser = async (formData) => {
    try {
        const response = await fetch(`${apiUrl}/usuarios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Enviamos los datos del formulario al servidor
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data);
            throw new Error(data.message || 'Error al registrar el usuario');
        }

        return await response.json(); // Devolvemos la respuesta exitosa
    } catch (error) {
        throw new Error(error.message || 'Error de red o servidor');
    }
};
