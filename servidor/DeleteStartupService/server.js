const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ciid', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB:', err));

const Startup = require('./models/Startup');

app.delete('/api/startups/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Startup.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'Startup no encontrada' });
        }
        res.send({ message: 'Startup eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la startup');
    }
});

app.listen(3004, () => {
  console.log('DeleteStartupService funcionando en el puerto 3004');
});
