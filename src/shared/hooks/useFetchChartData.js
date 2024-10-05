import { useState, useEffect } from 'react';
import {
    fetchIncomeVsExpensesByMonth,
    fetchExpensesDistributionByCategory,
    fetchMonthlyBalanceEvolution,
    fetchTop5CategoriesByExpenses,
} from '../services/chartService';

export const useFetchChartData = (userID) => {
    const [incomeExpenseData, setIncomeExpenseData] = useState(null);
    const [expenseByCategoryData, setExpenseByCategoryData] = useState(null);
    const [balanceEvolutionData, setBalanceEvolutionData] = useState(null);
    const [topCategoriesData, setTopCategoriesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1. Obtener ingresos vs egresos por mes
                const incomeExpense = await fetchIncomeVsExpensesByMonth(userID);
                console.log(incomeExpense);
                setIncomeExpenseData(incomeExpense);

                // 2. Obtener distribución de gastos por categoría
                const expensesByCategory = await fetchExpensesDistributionByCategory(userID);
                setExpenseByCategoryData(expensesByCategory);

                // 3. Obtener evolución del saldo mensual
                const balanceEvolution = await fetchMonthlyBalanceEvolution(userID);
                setBalanceEvolutionData(balanceEvolution);

                // 4. Obtener el top 5 de categorías con más gastos
                const topCategories = await fetchTop5CategoriesByExpenses(userID);
                setTopCategoriesData(topCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userID]);

    return {
        incomeExpenseData,
        expenseByCategoryData,
        balanceEvolutionData,
        topCategoriesData,
        loading,
        error,
    };
};
