import sqlite3

db = sqlite3.connect("turismo.db")
cursor = db.cursor()

# Substitua "meuadmin" pelo username que você cadastrou
cursor.execute("""
    UPDATE users
    SET role = 'admin'
    WHERE username = ?
""", ("meuadmin",))

db.commit()
db.close()
print("Usuário convertido em admin com sucesso!")
