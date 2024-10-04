import React from 'react';
import AddRecordForm from './AddRecordForm';
import SummaryTable from './SummaryTable';
// import { useHandleViewTransactionsUser } from '../shared/hooks/useHandleViewTransactionsUser';
import { useHandleTransactionsPagination } from '../shared/hooks/useHandleTransactionsPagination';

export default function ContentFinance({ activeSection, userID }) {
    return (
        <div className="flex-1">
            {activeSection === 0 && <h1 className="text-3xl">Bienvenido al Dashboard</h1>}
            {activeSection === 1 && <AddRecordForm userID={userID} />}
            {activeSection === 2 && <SummaryTable userID={userID} />}
        </div>
    );
}
