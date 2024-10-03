import React from 'react';
import AddRecordForm from './AddRecordForm';
import SummaryTable from './SummaryTable';
const records = [
    { tipo: 'Ingreso', monto: 50000, fecha: '2024-01-01', descripcion: 'Salario' },
    { tipo: 'Egreso', monto: 10000, fecha: '2024-01-02', descripcion: 'Compra de alimentos' },
    { tipo: 'Ingreso', monto: 20000, fecha: '2024-01-03', descripcion: 'Venta de productos' },
    { tipo: 'Egreso', monto: 5000, fecha: '2024-01-04', descripcion: 'Transporte' },
    // Agrega más datos para probar la paginación
    { tipo: 'Ingreso', monto: 40000, fecha: '2024-01-05', descripcion: 'Bonificación' },
    {
        tipo: 'Egreso',
        monto: 20000,
        fecha: '2024-01-06',
        descripcion:
            'Rentaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    { tipo: 'Ingreso', monto: 15000, fecha: '2024-01-07', descripcion: 'Freelance' },
    { tipo: 'Egreso', monto: 8000, fecha: '2024-01-08', descripcion: 'Entretenimiento' },
    { tipo: 'Ingreso', monto: 25000, fecha: '2024-01-09', descripcion: 'Venta de muebles' },
    { tipo: 'Egreso', monto: 3000, fecha: '2024-01-10', descripcion: 'Gimnasio' },
    { tipo: 'Ingreso', monto: 10000, fecha: '2024-01-11', descripcion: 'Intereses' },
    { tipo: 'Egreso', monto: 4000, fecha: '2024-01-12', descripcion: 'Regalos' },
];

export default function ContentFinance({ activeSection }) {
    return (
        <div className="flex-1">
            {activeSection === 0 && <h1 className="text-3xl">Bienvenido al Dashboard</h1>}
            {activeSection === 1 && <AddRecordForm />}
            {activeSection === 2 && <SummaryTable data={records} />}
        </div>
    );
}
