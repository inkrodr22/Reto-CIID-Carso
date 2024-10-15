const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Technology = require('./models/technology');
const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/ciid', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('Error al conectar a MongoDB:', err));


app.post('/api/technologies/create', async (req, res) => {

    const { name, sector, createdDate, adoptionStatus, currentUsage, implementationCost, maturityLevel, description } = req.body;

    if (!name || !sector || !createdDate || !adoptionStatus || !currentUsage || implementationCost === undefined || !maturityLevel || !description) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newTechnology = new Technology({
        name,
        sector,
        createdDate,
        adoptionStatus,
        currentUsage,
        implementationCost,
        maturityLevel,
        description,
        creationDate: new Date()

    });

    try {
        const savedTechnology = await newTechnology.save();
        res.status(201).send(savedTechnology);
    } catch (error) {
        console.error('Error al guardar la tecnología:', error);
        res.status(500).send({ error: 'Error al guardar la tecnología', details: error.message });
    }
});

app.listen(3005, () => {
    console.log('TechnologyService funcionando en el puerto 3005');
});
