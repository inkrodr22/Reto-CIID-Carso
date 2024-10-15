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

app.put('/api/technologies/update/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        const updatedTechnology = await Technology.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTechnology) {
            return res.status(404).send('Tecnología no encontrada');
        }

        res.json(updatedTechnology);
    } catch (error) {
        console.error('Error al actualizar la tecnología:', error);
        res.status(500).send({ error: 'Error al actualizar la tecnología', details: error.message });
    }
});

app.listen(3007, () => {
    console.log('UpdateTechnologyService funcionando en el puerto 3007');
});
