import React, { useEffect, useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthContext } from '../AuthContext';
import './CalendarView.css'; // vai colocar o CSS dos modais aqui

export default function CalendarView() {
    const { user, token } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const cities = ['Brasília', 'Pirinópolis', 'Florianópolis'];
    const [selectedCity, setSelectedCity] = useState(cities[0]);

    // Estados de UI para os modais
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detailEvent, setDetailEvent] = useState(null);

    // Campos do formulário de criação
    const [newTitle, setNewTitle] = useState('');
    const [newStart, setNewStart] = useState('');
    const [newEnd, setNewEnd] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/events/')
            .then(r => r.json())
            .then(setEvents)
            .catch(console.error);
    }, []);

    const filteredEvents = events.filter(e => e.city === selectedCity);

    // Submete novo evento
    const handleCreate = async e => {
        e.preventDefault();
        const body = {
            title: newTitle,
            start: newStart,
            end: newEnd,
            description: '',
            city: selectedCity
        };
        const res = await fetch('http://localhost:8000/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            const created = await res.json();
            setEvents(ev => [...ev, created]);
            setShowCreate(false);
            setNewTitle(''); setNewStart(''); setNewEnd('');
        } else {
            alert('Falha ao criar evento');
        }
    };

    // Quando clica num evento existente
    const handleEventClick = ({ event }) => {
        setDetailEvent({
            title: event.title,
            start: event.startStr,
            end: event.endStr
        });
        setShowDetail(true);
    };

    return (
        <div className="container calendar-container">
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
                {user?.role === 'admin' && (
                    <button
                        className="btn-create-event"
                        onClick={() => setShowCreate(true)}
                    >+ Evento</button>
                )}
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
                events={filteredEvents}
                eventClick={handleEventClick}
            />

            {/* Modal de criação */}
            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>Criar Evento em {selectedCity}</h3>
                        <form onSubmit={handleCreate}>
                            <input
                                type="text" placeholder="Título"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                required
                            />
                            <label>
                                Início:
                                <input
                                    type="datetime-local"
                                    value={newStart}
                                    onChange={e => setNewStart(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Fim:
                                <input
                                    type="datetime-local"
                                    value={newEnd}
                                    onChange={e => setNewEnd(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit">Salvar</button>
                            <button type="button" onClick={() => setShowCreate(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de detalhes */}
            {showDetail && detailEvent && (
                <div className="modal-overlay" onClick={() => setShowDetail(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>{detailEvent.title}</h3>
                        <p>Início: {new Date(detailEvent.start).toLocaleString()}</p>
                        <p>Fim:    {new Date(detailEvent.end).toLocaleString()}</p>
                        <button onClick={() => setShowDetail(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
