const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Technology = require('./models/technology');

const app = express();
const PORT = process.env.PORT || 3006;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ciid', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB:', err));

app.get('/api/technologies/read/:id?', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const technology = await Technology.findById(id);
            if (!technology) {
                return res.status(404).send('Tecnología no encontrada');
            }
            return res.json(technology);
        } else {
            const technologies = await Technology.find(); 
            return res.json(technologies);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener tecnologías');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
