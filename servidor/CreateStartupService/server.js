const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Startup = require('./models/startup');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ciid', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('Error al conectar a MongoDB:', err));


app.post('/api/startups/create', async (req, res) => {

    const { name, foundedDate, location, category, investmentReceived, description, employees } = req.body;

    if (!name || !foundedDate || !location || !category || investmentReceived === undefined || !description || employees === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }


    const newStartup = new Startup({
        name,
        foundedDate,
        location,
        category,
        investmentReceived,
        description,
        employees,
        creationDate: new Date()
    });

    try {
        const savedStartup = await newStartup.save();
        res.status(201).send(savedStartup);
    } catch (error) {
        console.error('Error al guardar la startup:', error);
        res.status(500).send({ error: 'Error al guardar la startup', details: error.message });
    }
});

app.listen(3001, () => {
    console.log('CreateStartupService funcionando en el puerto 3001');
});
