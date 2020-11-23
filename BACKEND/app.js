const express = require('express');
const mongoose = require('mongoose');


const app = express();
mongoose.connect('mongodb+srv://Nicolas:Motdepassedatabase@database.3867s.mongodb.net/database?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

module.exports = app;