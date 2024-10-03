import React from 'react';
import AddRecordForm from './AddRecordForm';

export default function ContentFinance({ activeSection }) {
    return (
        <div className="flex-1">
            {activeSection === 0 && <h1 className="text-3xl">Bienvenido al Dashboard</h1>}
            {activeSection === 1 && <AddRecordForm />}
            {activeSection === 2 && <h1 className="text-3xl">Aquí están tus Resumen</h1>}
        </div>
    );
}
