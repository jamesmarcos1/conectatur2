# 🚀 ConectaTur

Bem-vindo ao **ConectaTur**! 🌍✨

Uma aplicação full-stack para **secretarias de turismo** e **turistas**, com:

* 🗓️ **Calendário interativo** de eventos locais
* 📚 **Guias de turismo** por cidade (Brasília, Pirinópolis, Florianópolis)
* 🏨 **Informações de hospedagem** com preços e disponibilidade
* 📸 **Galeria de fotos e vídeos** 📹
* 🖼️ **Upload de imagens** direto pelo usuário

---

## 📂 Estrutura do Projeto

```
conectatur/
├── backend/                # API em FastAPI + SQLite
│   ├── app/
│   │   ├── main.py         # Configura FastAPI, CORS e static
│   │   ├── database.py     # Configura conexões SQLAlchemy
│   │   ├── models.py       # Modelos ORM (events, guides, lodging, gallery)
│   │   ├── schemas.py      # Schemas Pydantic
│   │   └── routers/        # Endpoints REST (events, guides, lodging, gallery)
│   ├── static/images/      # Imagens estáticas e uploads
│   ├── .env                # Configurações de ambiente
│   └── requirements.txt    # Dependências Python

└── frontend/               # SPA em React + Parcel
    ├── public/
    │   └── index.html      # Entry-point HTML
    ├── src/
    │   ├── App.js          # Roteamento e topbar
    │   ├── index.js        # Entry-point JS
    │   ├── index.css       # Estilos globais e componentes
    │   └── components/     # React Components:
    │       ├── CalendarView.jsx
    │       ├── GuideList.jsx
    │       ├── LodgingList.jsx
    │       └── Gallery.jsx
    ├── package.json        # Dependências JS e scripts
    └── .parcel-cache/      # Cache de build (gerado)
```

---

## ⚙️ Tecnologias

| Camada       | Tecnologia                                         |
| ------------ | -------------------------------------------------- |
| Backend      | Python 3.9+, FastAPI, SQLAlchemy, Pydantic, SQLite |
| Frontend     | React 19, React Router v6, @fullcalendar, Parcel   |
| Autenticação | CORS Middleware                                    |

---

## 🚀 Como rodar

### 1. Backend

```bash
$ cd backend
$ python3 -m venv .venv       🐍
$ source .venv/bin/activate   # ou .\.venv\Scripts\Activate no Windows
$ pip install -r requirements.txt
$ uvicorn app.main:app --reload --port 8000
```

### 2. Frontend

```bash
$ cd frontend
$ npm install
$ npm start                   # servirá em http://localhost:1234 🎉
```

> Acesse o front-end em `http://localhost:1234` e a documentação da API em `http://localhost:8000/docs`

---

## 📌 Funcionalidades

1. **Calendário de Eventos** 🗓️

   * Filtrado por cidade (Brasília, Pirinópolis, Florianópolis)
   * Adição de eventos via API com atributo `city`

2. **Guias de Turismo** 📍

   * Abas por cidade
   * Cards com imagem, nome e descrição
   * Upload de novas fotos e criação de guias via formulário

3. **Hospedagem** 🏨

   * Lista de hospedagem com nome, endereço, preço e disponibilidade

4. **Galeria de Fotos/Vídeos** 📷

   * Grid responsivo
   * Upload de fotos com título
   * Exclusão de itens via API

---

## 🤝 Contribuindo

1. Faça um fork deste repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Realize as alterações e commit: `git commit -m "feat: descrição da feature"`
4. Faça push: `git push origin minha-feature`
5. Abra um Pull Request 🚀

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir! 😉
