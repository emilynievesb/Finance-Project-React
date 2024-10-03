import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import ContentFinance from '../components/ContentFinance';

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState(0);
    return (
        <div className="flex min-h-screen">
            {/* Aquí renderizamos el Sidebar */}
            <SideBar activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Aquí renderizamos el contenido basado en la sección activa */}
            <ContentFinance activeSection={activeSection} />
        </div>
    );
}
