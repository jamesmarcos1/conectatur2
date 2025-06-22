// src/App.js
import React, { useContext } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useLocation,
    Navigate
} from 'react-router-dom';

import { AuthContext } from './AuthContext';
import Login from './components/Login';
import CalendarView from './components/CalendarView';
import GuideList from './components/GuideList';
import LodgingList from './components/LodgingList';
import Gallery from './components/Gallery';

function AppRoutes() {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // se não estiver logado e não for /login, redireciona pra login
    if (!user && location.pathname !== '/login') {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {/* Topbar */}
            <div className="topbar">ConectaTur</div>

            {/* Navbar */}
            <nav className="navbar">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Calendário</NavLink>
                <NavLink to="/guides" className={({ isActive }) => isActive ? 'active' : ''}>Guias</NavLink>
                <NavLink to="/lodging" className={({ isActive }) => isActive ? 'active' : ''}>Hospedagem</NavLink>
                <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>Galeria</NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
            </nav>

            <main className="container">
                <Routes>
                    <Route path="/" element={<CalendarView />} />
                    <Route path="/guides" element={<GuideList />} />
                    <Route path="/lodging" element={<LodgingList />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>

            <footer className="container" style={{ textAlign: 'center', padding: '1rem 0' }}>
                © Secretaria de Turismo
            </footer>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
