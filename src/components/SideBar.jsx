import React from 'react';
import LogoFinanzas from '../assets/FinanzasHorizontal.png';
import AvatarDefault from '../assets/AvatarDefault.avif';
import { FaSearchDollar } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { BiBookBookmark } from 'react-icons/bi';

export default function SideBar({ activeSection, setActiveSection }) {
    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="flex items-center justify-center h-16 bg-gray-800">
                    <img src={LogoFinanzas} alt="Logo" className="h-12" />
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                    <a
                        href="#"
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-300 
                        ${activeSection === 0 ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        onClick={() => setActiveSection(0)}
                    >
                        <FiHome className="mr-3 h-6 w-6" />
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-300 
                        ${activeSection === 1 ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        onClick={() => setActiveSection(1)}
                    >
                        <FaSearchDollar className="mr-3 h-6 w-6" />
                        Ingresos/Egresos
                    </a>

                    <a
                        href="#"
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-300 
                        ${activeSection === 2 ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        onClick={() => setActiveSection(2)}
                    >
                        <BiBookBookmark className="mr-3 h-6 w-6" />
                        Resumen
                    </a>
                </nav>
                <div className="p-4 bg-gray-800">
                    <div className="flex items-center">
                        <img className="inline-block h-10 w-10 rounded-full" src={AvatarDefault} alt="User" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">Tom Cook</p>
                            {/* <p className="text-xs font-medium text-gray-400">View profile</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
