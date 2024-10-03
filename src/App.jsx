import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage setUserIsLogged={setUserIsLogged} setUserName={setUserName} setUserID={setUserID} />} />
                <Route path="/dashboard/" element={userIsLogged ? <Dashboard userID={userID} userName={userName} /> : <NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
