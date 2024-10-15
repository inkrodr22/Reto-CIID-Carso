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

app.put('/api/startups/update/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        const updatedStartup = await Startup.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedStartup) {
            return res.status(404).send('Startup no encontrada');
        }

        res.json(updatedStartup);
    } catch (error) {
        console.error('Error al actualizar la startup:', error);
        res.status(500).send({ error: 'Error al actualizar la startup', details: error.message });
    }
});

app.listen(3003, () => {
    console.log('UpdateStartupService funcionando en el puerto 3003');
});
