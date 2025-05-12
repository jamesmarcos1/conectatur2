// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import CalendarView from './components/CalendarView'
import GuideList from './components/GuideList'
import LodgingList from './components/LodgingList'
import Gallery from './components/Gallery'

export default function App() {
    return (
        <BrowserRouter>
            {/* Topbar */}
            <div className="topbar">ConectaTur</div>

            {/* Navbar */}
            <nav className="navbar">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Calendário</NavLink>
                <NavLink to="/guides" className={({ isActive }) => isActive ? 'active' : ''}>Guias</NavLink>
                <NavLink to="/lodging" className={({ isActive }) => isActive ? 'active' : ''}>Hospedagem</NavLink>
                <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>Galeria</NavLink>
            </nav>

            <main className="container">
                <Routes>
                    <Route path="/" element={<CalendarView />} />
                    <Route path="/guides" element={<GuideList />} />
                    <Route path="/lodging" element={<LodgingList />} />
                    <Route path="/gallery" element={<Gallery />} />
                </Routes>
            </main>

            <footer className="container" style={{ textAlign: 'center', padding: '1rem 0' }}>
                © Secretaria de Turismo
            </footer>
        </BrowserRouter>
    )
}
