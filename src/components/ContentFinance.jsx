import React from 'react';
import AddRecordForm from './AddRecordForm';
import SummaryTable from './SummaryTable';
import Graphics from './Graphics';

export default function ContentFinance({ activeSection, userID }) {
    return (
        <div className="flex-1">
            {activeSection === 0 && <Graphics userID={userID} />}
            {activeSection === 1 && <AddRecordForm userID={userID} />}
            {activeSection === 2 && <SummaryTable userID={userID} />}
        </div>
    );
}
