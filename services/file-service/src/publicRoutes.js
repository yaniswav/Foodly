const express = require('express');
const supabase = require('./supabase');

const router = express.Router();

// Petit cache en mémoire pour stocker les URL publiques déjà calculées
const publicUrlCache = {};

/**
 * Route pour accéder à une image via son chemin public :
 * Exemple d'URL : GET /public/restaurants/42/42_banner.png
 */
router.get('/public/:type/:id/:filename', async (req, res) => {
    const { type, id, filename } = req.params;
    const filePath = `${type}/${id}/${filename}`;

    // Si l'URL publique a déjà été récupérée, la renvoyer directement
    if (publicUrlCache[filePath]) {
        return res.redirect(publicUrlCache[filePath]);
    }

    const { data, error } = supabase.storage
        .from('restaurant-assets')
        .getPublicUrl(filePath);

    if (error || !data?.publicUrl) {
        return res.status(404).json({ error: 'Image non trouvée' });
    }

    // Mettre en cache l'URL pour que les futurs GET utilisent directement ce résultat
    publicUrlCache[filePath] = data.publicUrl;

    return res.redirect(data.publicUrl);
});

/**
 * Route pour accéder à une image statique dans le dossier /static
 * Exemple : GET /static/someImage.png
 */
router.get('/static/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = `static/${filename}`;

    if (publicUrlCache[filePath]) {
        return res.redirect(publicUrlCache[filePath]);
    }

    const { data, error } = supabase.storage
        .from('restaurant-assets')
        .getPublicUrl(filePath);

    if (error || !data?.publicUrl) {
        return res.status(404).json({ error: 'Image non trouvée' });
    }

    publicUrlCache[filePath] = data.publicUrl;
    return res.redirect(data.publicUrl);
});

module.exports = router;
