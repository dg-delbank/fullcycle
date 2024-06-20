const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

const mongoUrl = 'mongodb://root:example@mongodb:27017';
const dbName = 'mydatabase';

async function connectMongo() {
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.get('/buscar', async (req, res) => {
  try {
    const db = await connectMongo();
    const collection = db.collection('tabela');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error('Erro ao buscar conteúdo:', err.message);
    res.status(500).send('Erro ao buscar conteúdo');
  }
});

const server = app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
