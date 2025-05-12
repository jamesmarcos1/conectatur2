// src/components/CalendarView.jsx
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function CalendarView() {
    const [events, setEvents] = useState([])
    const cities = ['Brasília', 'Pirinópolis', 'Florianópolis']
    const [selectedCity, setSelectedCity] = useState(cities[0])

    useEffect(() => {
        fetch('http://localhost:8000/events/')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err))
    }, [])

    // Filtra apenas os eventos da cidade selecionada
    const filteredEvents = events.filter(e => e.city === selectedCity)

    return (
        <div className="container">
            {/* Abas de cidade */}
            <div className="city-tabs">
                {cities.map(city => (
                    <button
                        key={city}
                        className={city === selectedCity ? 'active' : ''}
                        onClick={() => setSelectedCity(city)}
                    >
                        {city}
                    </button>
                ))}
            </div>

            {/* Calendário */}
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={filteredEvents}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
            />
        </div>
    )
}
