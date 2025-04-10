const express = require('express');
const multer = require('multer');
const supabase = require('./supabase');

const router = express.Router();
const upload = multer();

// Autoriser uniquement JPEG et PNG (les GIF ne sont pas acceptés)
const allowedMimeTypes = ['image/jpeg', 'image/png'];

/**
 * Route pour uploader une image de menu d'un restaurant.
 * Le fichier sera renommé en : {restaurantId}_{menuId}.{extension}
 * et stocké dans restaurants/{restaurantId}/menus/.
 *
 * Exemple d'URL : POST /upload/menu/42/5
 * Résultat : restaurants/42/menus/42_5.png
 */
router.post('/menu/:restaurantId/:menuId', upload.single('file'), async (req, res) => {
    const { restaurantId, menuId } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Aucun fichier uploadé' });
    }

    // Vérification du type MIME
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Seules les images JPG et PNG sont autorisées' });
    }

    const extension = file.originalname.split('.').pop();
    // Nouveau nom au format {restaurantId}_{menuId}.{extension}
    const newFileName = `${restaurantId}_${menuId}.${extension}`;
    // Chemin complet : restaurants/{restaurantId}/menus/{restaurantId}_{menuId}.{extension}
    const filePath = `restaurants/${restaurantId}/menus/${newFileName}`;

    const { error } = await supabase.storage
        .from('restaurant-assets')
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const { data } = supabase.storage
        .from('restaurant-assets')
        .getPublicUrl(filePath);

    res.status(200).json({ url: data.publicUrl });
});

/**
 * Route générique pour uploader d'autres types d'images.
 * Cette route gère par exemple l'upload d'une bannière de restaurant ou
 * la photo de profil d'un utilisateur.
 *
 * Pour une bannière de restaurant :
 *   - Endpoint : POST /upload/banner/:id
 *   - Fichier renommé en : {id}_banner.{extension} et rangé dans restaurants/{id}/
 *
 * Pour une photo de profil :
 *   - Endpoint : POST /upload/profile_picture/:id
 *   - Fichier renommé en : {id}_profile_picture.{extension} et rangé dans users/{id}/
 *
 * Pour les autres cas, on utilisera par défaut le dossier "restaurants".
 */
router.post('/:type/:id', upload.single('file'), async (req, res) => {
    const { type, id } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Aucun fichier uploadé' });
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Seules les images JPG et PNG sont autorisées' });
    }

    const extension = file.originalname.split('.').pop();

    let baseFolder = "restaurants";
    let newFileName = "";
    let filePath = "";

    if (type === "profile_picture") {
        // Pour la photo de profil d'un utilisateur
        baseFolder = "users";
        newFileName = `${id}_profile_picture.${extension}`;
        filePath = `${baseFolder}/${id}/${newFileName}`;
    } else if (type === "banner") {
        // Pour la bannière d'un restaurant
        newFileName = `${id}_banner.${extension}`;
        filePath = `restaurants/${id}/${newFileName}`;
    } else {
        // Cas par défaut
        newFileName = `${id}_${type}.${extension}`;
        filePath = `${baseFolder}/${id}/${newFileName}`;
    }

    const { error } = await supabase.storage
        .from('restaurant-assets')
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const { data } = supabase.storage
        .from('restaurant-assets')
        .getPublicUrl(filePath);

    res.status(200).json({ url: data.publicUrl });
});

module.exports = router;
