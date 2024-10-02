/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html', // El archivo HTML raíz en Vite
        './src/**/*.{js,ts,jsx,tsx}', // Archivos de React en la carpeta src
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'), // Si estás usando el plugin de formularios
    ],
};
