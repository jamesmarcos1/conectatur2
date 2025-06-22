import sqlite3

conn = sqlite3.connect("turismo.db")
try:
    conn.execute("ALTER TABLE gallery ADD COLUMN owner_id INTEGER NOT NULL DEFAULT 0;")
    print("Coluna owner_id adicionada com sucesso!")
except Exception as e:
    print("Erro ao adicionar coluna:", e)
finally:
    conn.commit()
    conn.close()
