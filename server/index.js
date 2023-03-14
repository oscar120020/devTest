const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 4000;

const http = axios.create({})

app.use(cors());

app.get('/', (req, res) => {
  res.send('Proxy Server Running');
});

app.get('/announcement', async(req, res) => {
    try {
        const { data } = await http.get('https://www.bitmex.com/api/v1/announcement')
        res.json({data})
    } catch (error) {
        res.status(400).json({
            message: 'Error al obtener noticias'
        })
    }
})

app.listen(port, () => {
  console.log(`Proxy Server Listening on Port ${port}`);
});