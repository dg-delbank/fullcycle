const express = require('express');
const sql = require('mssql');
const app = express();

const config = {
  user: 'sa',
  password: '123%$#¨%$DFfhgv',
  server: 'localhost',
  database: 'db',
  options: {
    encrypt: true, 
  },
};

app.get('/buscar', async (req, res) => {
  try {

    await sql.connect(config);

    const result = await sql.query`SELECT * FROM tabela`;

    res.json(result.recordset);
  } catch (err) {
    console.error('Erro ao buscar conteúdo:', err.message);
    res.status(500).send('Erro ao buscar conteúdo');
  } finally {
    sql.close();
  }
});

const server = app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
