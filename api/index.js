const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas usando variable de entorno
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.post('/register', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await client.connect();
    const db = client.db('multimedios'); // Cambia por el nombre de tu base de datos
    const collection = db.collection('registros');
    await collection.insertOne({ name, email, phone, createdAt: new Date() });
    res.json({ ok: true, message: 'Usuario registrado' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send('API funcionando');
});

module.exports = app;