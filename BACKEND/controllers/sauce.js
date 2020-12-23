const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        // ... Copie les champs de la request
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauce);
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    const likeObject = req.body.like;
    if (likeObject === 0 && typeof likeObject === 'number') {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                let likeValue = 0;
                let pullType = "";
                let message = "toto";

                if (sauce.usersLiked.includes(req.body.userId)) {
                    likeValue = -1;
                    pullType = "usersLiked";
                    message = "Like retiré";
                }
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    likeValue = 1;
                    pullType = "usersDisliked";
                    message = "Dislike retiré";
                }
                Sauce.updateOne(
                    {
                        _id: req.params.id
                    },
                    {
                        $pull: { pullType: req.body.userId },
                        $inc: { likes: likeValue },
                    }
                )
                    .then(() => res.status(200).json({ message: message }))
                    .catch((error) => res.status(400).json({ error }))
            })
            .catch(error => res.status(400).json({ error }));
    }

    else if (likeObject === 1 && typeof likeObject === 'number') {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                Sauce.updateOne(
                    {
                        _id: req.params.id
                    },
                    {
                        $push: { usersLiked: req.body.userId },
                        $inc: { likes: 1 },
                    }
                )
                    .then(() => res.status(200).json({ message: "Like ajouté" }))
                    .catch((error) => res.status(400).json({ error }))
            })
            .catch(error => res.status(400).json({ error }));
    }

    else if (likeObject === -1 && typeof likeObject === 'number') {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                Sauce.updateOne(
                    {
                        _id: req.params.id
                    },
                    {
                        $push: { usersDisliked: req.body.userId },
                        $inc: { likes: -1 },
                    }
                )
                    .then(() => res.status(200).json({ message: "Dislike ajouté" }))
                    .catch((error) => res.status(400).json({ error }))
            })
            .catch(error => res.status(400).json({ error }));
    };
};



//     if (likeObject === 1) {
//         sauceSchema.usersLiked.push(sauceSchema.userId);
//         likeObject.update({}, { $inc: { likes: 1 } });
//     }
//     if (likeObject === -1) {
//         sauceSchema.usersDisliked.push(sauceSchema.userId);
//         likeObject.update({}, { $inc: { likes: -1 } });
//     }
//     if (likeObject === 0) {
//         sauceSchema.usersLiked.includes(sauceSchema.userId);
//         sauceSchema.deleteOne(userId);
//         likeObject.update({}, { $inc: { likes: -1 } });
//         sauceSchema.usersDisliked.includes(sauceSchema.userId);
//         sauceSchema.deleteOne(userId);
//         likeObject.update({}, { $inc: { likes: 1 } });
//     }
// };
