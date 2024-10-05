const apiUrl = import.meta.env.VITE_API_URL;
// Servicio para realizar logout
export const logoutUser = async () => {
    try {
        const response = await fetch(`${apiUrl}/usuarios/logout`, {
            method: 'POST',
            credentials: 'include', // Incluir cookies en la solicitud
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(errorData.message || 'Error al cerrar sesión');
        }

        return true; // Retorna true si el logout fue exitoso
    } catch (error) {
        throw new Error(error.message);
    }
};
