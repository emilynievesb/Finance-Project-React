import './App.css';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard/" element={<Dashboard />} />
                {/* import { useParams } from 'react-router-dom';
                 */}
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </Router>
        // <>
        //     <LoginPage />
        // </>
    );
}

export default App;
