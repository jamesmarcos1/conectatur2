// src/components/GuideList.jsx
import React, { useEffect, useState } from 'react';

export default function GuideList() {
    const cities = ['Brasília', 'Pirinópolis', 'Florianópolis'];
    const [guides, setGuides] = useState([]);
    const [city, setCity] = useState(cities[0]);
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [captionCity, setCaptionCity] = useState(city);

    useEffect(() => {
        fetch('http://localhost:8000/guides/')
            .then(r => r.json())
            .then(setGuides)
            .catch(console.error);
    }, []);

    const resolveUrl = url => {
        if (/^(https?:)?\/\//.test(url)) return url;
        if (url.startsWith('/static')) return `http://localhost:8000${url}`;
        return `${window.location.origin}${url}`;
    };

    const handleUpload = async e => {
        e.preventDefault();
        if (!file) return alert('Selecione uma foto!');
        const data = new FormData();
        data.append('file', file);
        data.append('name', name);
        data.append('description', description);
        data.append('city', captionCity);

        const res = await fetch('http://localhost:8000/guides/upload', {
            method: 'POST', body: data
        });
        if (res.ok) {
            const novo = await res.json();
            setGuides(g => [...g, novo]);
            setFile(null); setName(''); setDescription('');
        } else {
            console.error(await res.text());
        }
    };

    const filtered = guides.filter(g => g.city === city);

    return (
        <div className="container">
            <h2>Guias de Turismo</h2>

            {/* Abas de cidade */}
            <div className="tabs">
                {cities.map(c => (
                    <button
                        key={c}
                        className={c === city ? 'active' : ''}
                        onClick={() => setCity(c)}
                    >{c}</button>
                ))}
            </div>

            {/* Formulário de upload */}
            <form onSubmit={handleUpload} className="upload-form">
                <label className="upload-file-btn">
                    {file ? file.name : 'Escolher foto'}
                    <input
                        type="file" accept="image/*"
                        onChange={e => setFile(e.target.files[0])}
                    />
                </label>
                <input
                    type="text" placeholder="Nome do ponto turístico"
                    className="upload-text"
                    value={name} onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type="text" placeholder="Descrição"
                    className="upload-text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <select
                    className="upload-city"
                    value={captionCity}
                    onChange={e => setCaptionCity(e.target.value)}
                >
                    {cities.map(c => <option key={c}>{c}</option>)}
                </select>
                <button type="submit" className="upload-submit">
                    Adicionar Guia
                </button>
            </form>

            {/* Grade de cards */}
            <div className="guide-grid">
                {filtered.map(g => (
                    <div key={g.id} className="guide-card">
                        {g.photo_url && (
                            <img src={resolveUrl(g.photo_url)} alt={g.name} />
                        )}
                        <div className="info">
                            <h3>{g.name}</h3>
                            <p>{g.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
