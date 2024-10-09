# Gestión Financiera Personal - Frontend

Este proyecto es la interfaz de usuario de una aplicación de gestión financiera personal. Permite a los usuarios llevar un registro de sus ingresos y egresos, visualizar estadísticas de sus finanzas a través de gráficos y gestionar transacciones mediante un sistema de autenticación seguro.

## Tabla de Contenidos

-   Descripción General
-   Tecnologías Utilizadas
-   Estructura del Proyecto
-   Instalación y Configuración
-   Autenticación con JWT
-   Componentes Principales
-   Gráficos Estadísticos
-   Ejemplos de Uso
-   Contribuciones
-   Licencia

## Descripción General

La aplicación de gestión financiera personal proporciona una forma intuitiva y visual de llevar un control detallado de las finanzas personales. Los usuarios pueden agregar, editar y eliminar transacciones, ver resúmenes de gastos e ingresos, y analizar sus hábitos financieros mediante gráficos interactivos. La autenticación se realiza mediante JWT (JSON Web Tokens) para asegurar que solo los usuarios autenticados puedan acceder a sus datos personales.

## Tecnologías Utilizadas

-   **React**: Biblioteca principal para la construcción de interfaces de usuario.
-   **Vite**: Herramienta de desarrollo rápida que ofrece un entorno optimizado para proyectos de React.
-   **Tailwind CSS**: Framework de CSS para un diseño responsivo y estilizado.
-   **Chart.js y react-chartjs-2**: Para la representación de gráficos estadísticos interactivos.
-   **React Router**: Para la navegación entre las diferentes vistas de la aplicación.
-   **Axios**: Para la comunicación con el backend, principalmente para realizar peticiones HTTP.
-   **JSON Web Token (JWT)**: Utilizado para la autenticación y autorización de usuarios.

## Estructura del Proyecto

```
/src
|-- /components
|   |-- AddRecordForm.js         # Formulario para agregar nuevas transacciones
|   |-- EditTransactionModal.js  # Modal para editar transacciones existentes
|   |-- TransactionsTable.js     # Tabla que muestra las transacciones del usuario
|   |-- Graphics.js              # Componente que muestra gráficos estadísticos
|
|-- /pages
|   |-- LoginPage.js             # Página de inicio de sesión del usuario
|   |-- Dashboard.js             # Página principal del usuario con resumen financiero
|
|-- /shared
|   |-- /hooks
|   |   |-- useHandleSubmitRecord.js  # Hook personalizado para el manejo del formulario de transacciones
|   |   |-- useHandleTransactionsPagination.js  # Hook para la paginación de transacciones
|   |   |-- useHandleEditTransaction.js  # Hook para la edición de transacciones
|   |   |-- useModal.js          # Hook para el manejo de modales
|   |-- /services
|   |   |-- transactionService.js  # Funciones para interactuar con la API del backend
|
|-- App.js                       # Componente principal de la aplicación
|-- main.jsx                     # Punto de entrada de la aplicación
|-- index.css                    # Estilos globales
|-- README.md                    # Documentación del proyecto (este archivo)
```

## Instalación y Configuración

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/gestion-financiera-frontend.git
    cd gestion-financiera-frontend
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
    ```makefile
    VITE_API_URL=http://tu-api-url.com
    VITE_JWT_SECRET=tu-secreto-jwt
    ```
4. Inicia la aplicación en modo de desarrollo:
    ```bash
    npm run dev
    ```
    Abre `http://localhost:5173` en tu navegador para ver la aplicación.

## Autenticación con JWT

La aplicación utiliza JWT (JSON Web Tokens) para autenticar y autorizar a los usuarios:

-   Durante el inicio de sesión, el backend genera un token JWT que se envía al frontend.
-   El token se almacena de manera segura en el almacenamiento local o en `sessionStorage` y se adjunta a cada petición HTTP como un `Authorization` header.
-   En cada petición protegida, el backend valida el token para asegurar que el usuario esté autenticado.
-   El token contiene información codificada sobre el usuario, como su ID, y se utiliza para determinar qué datos son accesibles para cada usuario.

## Componentes Principales

-   **AddRecordForm.js**: Formulario para que los usuarios puedan agregar ingresos o egresos. Utiliza el componente SelectMenu para elegir el tipo de transacción (Ingreso/Egreso) y la categoría, y formatea los montos de manera automática.
-   **EditTransactionModal.js**: Modal para editar transacciones existentes. Permite modificar detalles como el tipo de transacción, el monto, la categoría y la descripción. Al guardar los cambios, se realiza una petición para actualizar la transacción en la base de datos.
-   **TransactionsTable.js**: Tabla que muestra todas las transacciones del usuario, con opciones para editar y eliminar cada transacción. Las transacciones se presentan paginadas para mejorar la experiencia de usuario.
-   **Graphics.js**: Componente que muestra diferentes gráficos estadísticos utilizando `react-chartjs-2`. Entre los gráficos disponibles se encuentran:
    -   Ingresos vs Egresos por Mes (Bar chart)
    -   Distribución de Gastos por Categoría (Pie chart)
    -   Evolución de Saldo Mensual (Line chart)
    -   Top 5 Categorías con Más Gastos (Bar chart)

## Ejemplos de Uso

-   **Visualizar estadísticas**: En la página principal del Dashboard, el usuario puede ver gráficos que resumen su situación financiera. Esto le permite identificar fácilmente las categorías en las que gasta más.
-   **Agregar transacciones**: El usuario puede registrar nuevos ingresos o egresos mediante un formulario sencillo.
-   **Editar o eliminar transacciones**: Las transacciones existentes pueden ser editadas desde un modal, o eliminadas con una confirmación de seguridad.
