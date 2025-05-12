// frontend/src/components/Gallery.jsx
import React, { useEffect, useState } from 'react';

export default function Gallery() {
    const [items, setItems] = useState([]);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/gallery/')
            .then(res => res.json())
            .then(setItems)
            .catch(console.error);
    }, []);

    const resolveUrl = (url) => {
        if (/^(https?:)?\/\//.test(url)) return url;
        if (url.startsWith('/static')) return `http://localhost:8000${url}`;
        return `${window.location.origin}${url}`;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!file) return alert("Selecione uma imagem.");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('caption', caption);

        const res = await fetch('http://localhost:8000/gallery/upload', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            const newItem = await res.json();
            setItems(prev => [...prev, newItem]);
            setCaption('');
            setFile(null);
        } else {
            console.error("Erro no upload", await res.text());
        }
    };

    return (
        <div className="container">
            <h2>Galeria de Fotos e Vídeos</h2>

            {/* Formulário de upload */}
            <form onSubmit={handleSubmit} className="upload-form">
                {/* esconder input e usar label estilizada */}
                <label className="upload-file-btn">
                    {file ? file.name : 'Escolher imagem'}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setFile(e.target.files[0])}
                    />
                </label>

                <input
                    type="text"
                    className="upload-caption"
                    placeholder="Título da foto"
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    required
                />

                <button type="submit" className="upload-submit">
                    Enviar
                </button>
            </form>

            {/* Grid de imagens */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
                gap: '1rem'
            }}>
                {items.map(item => (
                    <div key={item.id}>
                        <img
                            src={resolveUrl(item.url)}
                            alt={item.caption}
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                        <p>{item.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
