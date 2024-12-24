const mongoose = require('mongoose');

// Remplacez l'URL de connexion par celle de votre base de données MongoDB
const dbURI = 'mongodb://localhost:27017/gestionProjet'; // Changez le nom de la base de données si nécessaire

// Se connecter à la base de données MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données');

    // Récupérer les noms des collections disponibles dans la base de données
    mongoose.connection.db.listCollections().toArray()
      .then((collections) => {
        if (collections.length === 0) {
          console.log('Aucune collection trouvée.');
        } else {
          console.log('Collections disponibles :');
          collections.forEach(collection => {
            console.log(collection.name);  // Affiche le nom de chaque collection
          });
        }

        // Fermer la connexion après avoir récupéré les collections
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des collections', err);
        mongoose.connection.close();  // Assurez-vous de fermer la connexion en cas d'erreur
      });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données', err);
  });
