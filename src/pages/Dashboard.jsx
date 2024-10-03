import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import ContentFinance from '../components/ContentFinance';

export default function Dashboard({ userID, userName, setUserIsLogged }) {
    const [activeSection, setActiveSection] = useState(0);
    return (
        <div className="flex min-h-screen">
            {/* Aquí renderizamos el Sidebar */}
            <SideBar userName={userName} activeSection={activeSection} setActiveSection={setActiveSection} setUserIsLogged={setUserIsLogged} />
            {/* Aquí renderizamos el contenido basado en la sección activa */}
            <ContentFinance userID={userID} activeSection={activeSection} />
        </div>
    );
}
