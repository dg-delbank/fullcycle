const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

const mongoUrl = 'mongodb://root:example@mongodb:27017';
const dbName = 'mydatabase';

const dadosIniciais = [
    { nome: 'Item 1', descricao: 'Descrição 1' },
    { nome: 'Item 2', descricao: 'Descrição 2' },
    { nome: 'Item 3', descricao: 'Descrição 3' }
  ];

  async function hardCodedData() {
    try {
      const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('tabela');
      const resultado = await collection.insertMany(dadosIniciais);
      client.close();
    } catch (err) {
      console.error(err.message);
    }
  }

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
