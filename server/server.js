const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/gestionProjet';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données');

    mongoose.connection.db.listCollections().toArray()
      .then((collections) => {
        if (collections.length === 0) {
          console.log('Aucune collection trouvée.');
        } else {
          console.log('Collections disponibles :');
          collections.forEach(collection => {
            console.log(collection.name);
          });
        }
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des collections', err);
        mongoose.connection.close();
      });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données', err);
  });
