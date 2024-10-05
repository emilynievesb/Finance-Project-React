import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useFetchChartData } from '../shared/hooks/useFetchChartData'; // Importamos el hook personalizado

// Registrar los componentes de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function Graphics({ userID }) {
    const { incomeExpenseData, expenseByCategoryData, balanceEvolutionData, topCategoriesData, loading, error } = useFetchChartData(userID);

    if (loading) return <p className="text-center text-lg">Cargando datos...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

    // Función para convertir el número de mes en nombre del mes con el año
    const getMonthName = (monthNumber, year) => {
        const date = new Date(year, monthNumber - 1); // Creamos una fecha con el mes y año
        return date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }); // Devolvemos el nombre del mes en español
    };

    // Datos transformados para los gráficos
    const incomeExpenseChartData = {
        labels: incomeExpenseData.map((item) => getMonthName(item.mes, item.año)),
        datasets: [
            {
                label: 'Ingresos',
                data: incomeExpenseData.map((item) => item.ingresos),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Egresos',
                data: incomeExpenseData.map((item) => item.egresos),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const expenseByCategoryChartData = {
        labels: expenseByCategoryData.map((item) => item.categoria),
        datasets: [
            {
                data: expenseByCategoryData.map((item) => item.total_gastos),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(128, 0, 32, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                    'rgba(255, 182, 193, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const balanceEvolutionChartData = {
        labels: balanceEvolutionData.map((item) => getMonthName(item.mes, item.año)),
        datasets: [
            {
                label: 'Saldo acumulado',
                data: balanceEvolutionData.map((item) => item.saldo_mensual),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const topCategoriesChartData = {
        labels: topCategoriesData.map((item) => item.categoria),
        datasets: [
            {
                label: 'Top Categorías',
                data: topCategoriesData.map((item) => item.total_gastos),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            },
        ],
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Resumen Financiero</h1>

            {/* Gráficos: 2 por fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gráfico 1: Ingresos vs Egresos */}
                <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center justify-center h-[23rem]">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Ingresos vs Egresos por mes</h2>
                    <div className="w-full h-[16.8rem] flex flex-col items-center justify-center">
                        <Bar data={incomeExpenseChartData} options={{ responsive: true }} />
                    </div>
                </div>

                {/* Gráfico 2: Distribución de gastos por categoría */}
                <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center justify-center h-[23rem]">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Distribución de gastos por categoría este mes</h2>
                    <div className="w-full h-[16.8rem] flex flex-col items-center justify-center">
                        <Pie data={expenseByCategoryChartData} options={{ responsive: true }} />
                    </div>
                </div>

                {/* Gráfico 3: Evolución de saldo mensual */}
                <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center justify-center h-[23rem]">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Evolución de saldo mensual</h2>
                    <div className="w-full h-[16.8rem] flex flex-col items-center justify-center">
                        <Line data={balanceEvolutionChartData} options={{ responsive: true }} />
                    </div>
                </div>

                {/* Gráfico 4: Top 5 categorías con más gastos */}
                <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center justify-center h-[23rem]">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Top 5 categorías con más gastos este mes</h2>
                    <div className="w-full h-[16.8rem] flex flex-col items-center justify-center">
                        <Bar data={topCategoriesChartData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
