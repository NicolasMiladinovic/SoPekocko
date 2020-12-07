const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

// const stuffRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();
mongoose.connect('mongodb+srv://Nicolas:Motdepassedatabase@database.3867s.mongodb.net/database?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
// });

app.use(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
    console.log(req);
});


// app.post('/api/sauces', (req, res, next) => {
//     // delete req.body._id;
//     const sauce = new Sauce({
//         ...req.body
//     });
//     console.log(req.body.sauce);
//     sauce.save()
//         .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
//         .catch(error => res.status(400).json({ error }));
// });

// app.post('/api/sauces', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//       message: 'Objet créé !'
//     });
// });

// app.use('/api/sauces', (req, res, next) => {
//     const sauce = [
//         {
//             _id: 'oeihfzeoi',
//             name: 'ketchup',
//             manufacturer: 'Heinz',
//             description: 'Les infos de mon premier objet',
//             imageUrl: 'https://cdn.pixabay.com/photo/2013/07/12/14/51/ketchup-148935_960_720.png',
//             heat: 1,
//             userId: 'qsomihvqios',
//         },
//         {
//             _id: 'oeihfzeomoihi',
//             name: 'Harissa',
//             manufacturer: 'Heinz',
//             description: 'Les infos de mon deuxième objet',
//             imageUrl: 'https://media.istockphoto.com/vectors/hot-sauce-pizza-icon-vector-id1148106717',
//             heat: 3,
//             userId: 'qsomihvqios',
//         },
//     ];
//     res.status(200).json(sauce);
// });

app.use('/api/auth', userRoutes);

module.exports = app;