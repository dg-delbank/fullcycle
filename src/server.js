const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const db = new sqlite3.Database('./sqlite-data/db.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tabela (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      idade INTEGER
    )
  `);

  db.run(`
    INSERT INTO tabela (nome, idade) VALUES ('João', 30), ('Maria', 25), ('Pedro', 40)
  `);
});

app.get('/buscar', (req, res) => {
  db.all('SELECT * FROM tabela', (err, rows) => {
    if (err) {
      console.error('Erro ao buscar conteúdo:', err.message);
      res.status(500).send('Erro ao buscar conteúdo');
    } else {
      res.json(rows);
    }
  });
});

const server = app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
