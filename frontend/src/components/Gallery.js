// frontend/src/components/Gallery.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function Gallery() {
    const { user, token } = useContext(AuthContext);
    console.log('Gallery user:', user);

    const [items, setItems] = useState([]);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');

    // carrega galeria (público)
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

    // upload agora com Authorization
    const handleSubmit = async e => {
        e.preventDefault();
        if (!file) return alert("Selecione uma imagem.");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('caption', caption);

        const res = await fetch('http://localhost:8000/gallery/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
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

    // deleteItem com Authorization e recarrega a lista
    const deleteItem = async (id) => {
        if (!window.confirm("Confirma remoção?")) return;

        const res = await fetch(`http://localhost:8000/gallery/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.status === 204) {
            setItems(prev => prev.filter(i => i.id !== id));
        } else {
            console.error("Falha ao deletar", await res.text());
        }
    };

    return (
        <div className="container">
            <h2>Galeria de Fotos e Vídeos</h2>

            {/* Formulário de upload só para autenticados */}
            {user && (
                <form onSubmit={handleSubmit} className="upload-form">
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
            )}

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
                        {/* botão de delete só para admin ou owner */}
                        {(user?.role === "admin" || item.owner_id === user?.id) && (
                            <button onClick={() => deleteItem(item.id)}>
                                ❌ Deletar
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
