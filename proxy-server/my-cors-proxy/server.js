const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'https://katrinmark2000.github.io',
  methods: ['GET'],
}));



app.get('/api/random', async (req, res) => {
  console.log('Получен запрос');
  
  try {
    const response = await fetch('https://bored-api.appbrewery.com/random');
    console.log('Статус:', response.status);
    
    if (!response.ok) {
      const text = await response.text();
      console.error('API ошибка:', text);
      return res.status(response.status).send({ error: text });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Серверная ошибка:', error);
    res.status(500).send({ error: 'Internal Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


app.get('/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
  });