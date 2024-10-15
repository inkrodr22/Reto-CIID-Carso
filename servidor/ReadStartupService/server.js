const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Startup = require('./models/startup');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ciid', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB:', err));


app.get('/api/startups/read/:id?', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (id) {
            const startup = await Startup.findById(id);
            if (!startup) {
                return res.status(404).send('Startup no encontrada');
            }
            return res.json(startup);
        } else {

            const startups = await Startup.find(); 
            return res.json(startups);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener startups');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
