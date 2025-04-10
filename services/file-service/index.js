require('dotenv').config();
const express = require('express');
const uploadRoutes = require('./src/uploadRoutes');
const publicRoutes = require('./src/publicRoutes');

const app = express();
const PORT = process.env.PORT || 5003;

// Route simple pour tester le fonctionnement du service
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong 🏓' });
});

// Utilisation des routes pour l'upload (préfixées par /upload)
app.use('/upload', uploadRoutes);

// Routes publiques pour accéder aux fichiers
app.use('/', publicRoutes);

app.listen(PORT, () => {
    console.log(`📁 File Service running on port ${PORT}`);
});