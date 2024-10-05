const apiUrl = import.meta.env.VITE_API_URL;

// Servicio para obtener los ingresos vs egresos por mes para un usuario específico
export const fetchIncomeVsExpensesByMonth = async (userID) => {
    try {
        const response = await fetch(`${apiUrl}/graficos/income-vs-expenses/${userID}`);
        if (!response.ok) throw new Error('Error al obtener ingresos y egresos por mes');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Servicio para obtener la distribución de gastos por categoría para un usuario específico
export const fetchExpensesDistributionByCategory = async (userID) => {
    try {
        const response = await fetch(`${apiUrl}/graficos/expenses-distribution/${userID}`);
        if (!response.ok) throw new Error('Error al obtener distribución de gastos por categoría');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Servicio para obtener la evolución de saldo mensual para un usuario específico
export const fetchMonthlyBalanceEvolution = async (userID) => {
    try {
        const response = await fetch(`${apiUrl}/graficos/monthly-balance/${userID}`);
        if (!response.ok) throw new Error('Error al obtener evolución del saldo mensual');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Servicio para obtener la comparación de gastos por categoría en un rango de fechas
export const fetchExpensesByCategoryInDateRange = async (userID, startDate, endDate) => {
    try {
        const response = await fetch(`${apiUrl}/graficos/expenses-by-category/${userID}?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) throw new Error('Error al obtener gastos por categoría en rango de fechas');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Servicio para obtener el top 5 de categorías con más gastos
export const fetchTop5CategoriesByExpenses = async (userID) => {
    try {
        const response = await fetch(`${apiUrl}/graficos/top5-categories-expenses/${userID}`);
        if (!response.ok) throw new Error('Error al obtener el top 5 de categorías con más gastos');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};
