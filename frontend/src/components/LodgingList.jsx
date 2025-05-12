// frontend/src/components/LodgingList.jsx

import React, { useEffect, useState } from 'react';

export default function LodgingList() {
    const [lodgings, setLodgings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/lodging/')
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar hospedagens');
                return res.json();
            })
            .then(setLodgings)
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h2>Opções de Hospedagem</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {lodgings.map(lodging => (
                    <li key={lodging.id} style={{ marginBottom: '1rem' }}>
                        <h3>{lodging.name}</h3>
                        <p>Endereço: {lodging.address}</p>
                        <p>Preço: R$ {lodging.price.toFixed(2)}</p>
                        <p>Status: {lodging.availability}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
