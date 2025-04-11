/**
 * UPLOAD FUNCTIONS
 */

/**
 * Upload de la bannière d'un restaurant.
 * Le backend renomme le fichier en : {restaurantId}_banner.{extension}
 *
 * @param restaurantId - L'identifiant du restaurant.
 * @param file - Le fichier image (JPEG ou PNG) à uploader.
 * @returns Un objet JSON contenant l'URL publique de l'image uploadée.
 */
export async function uploadRestaurantBanner(
    restaurantId: string,
    file: File
): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
        `http://localhost:5003/upload/banner/${restaurantId}`,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error('Erreur lors de l’upload de la bannière du restaurant');
    }

    return response.json();
}

/**
 * Upload d'une image de menu pour un restaurant.
 * Le backend renomme le fichier en : {restaurantId}_{menuId}.{extension}
 * et le stocke dans restaurants/{restaurantId}/menus/.
 *
 * @param restaurantId - L'identifiant du restaurant.
 * @param menuId - L'identifiant du menu (ou de l'élément du menu).
 * @param file - Le fichier image (JPEG ou PNG) à uploader.
 * @returns Un objet JSON contenant l'URL publique de l'image uploadée.
 */
export async function uploadRestaurantMenuImage(
    restaurantId: string,
    menuId: string,
    file: File
): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
        `http://localhost:5003/upload/menu/${restaurantId}/${menuId}`,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error('Erreur lors de l’upload de l’image de menu du restaurant');
    }

    return response.json();
}

/**
 * Upload de la photo de profil d'un utilisateur.
 * Le backend renomme le fichier en : {userId}_profile_picture.{extension}
 *
 * @param userId - L'identifiant de l'utilisateur.
 * @param file - Le fichier image (JPEG ou PNG) à uploader.
 * @returns Un objet JSON contenant l'URL publique de l'image uploadée.
 */
export async function uploadUserProfilePicture(
    userId: string,
    file: File
): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
        `http://localhost:5003/upload/profile_picture/${userId}`,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error('Erreur lors de l’upload de la photo de profil de l’utilisateur');
    }

    return response.json();
}


/**
 * GET FUNCTIONS
 */

/**
 * Récupère l'URL publique de la bannière d'un restaurant.
 * La route publique est construite comme suit :
 * http://localhost:5003/public/restaurants/{restaurantId}/{restaurantId}_banner.{extension}
 *
 * @param restaurantId - L'identifiant du restaurant.
 * @param ext - L'extension du fichier (par défaut "png").
 * @returns Un objet JSON contenant l'URL publique.
 */
export async function getRestaurantBanner(
    restaurantId: string,
    ext: string = 'png'
): Promise<{ url: string }> {
    const url = `http://localhost:5003/public/restaurants/${restaurantId}/${restaurantId}_banner.${ext}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Impossible de récupérer la bannière du restaurant');
    }
    // La route GET du backend redirige vers l'URL publique. La propriété response.url
    // contiendra l'URL finale (si le navigateur suit la redirection).
    return { url: response.url };
}

/**
 * Récupère l'URL publique d'une image de menu pour un restaurant.
 * La route publique est construite comme suit :
 * http://localhost:5003/public/restaurants/{restaurantId}/menus/{restaurantId}_{menuId}.{extension}
 *
 * @param restaurantId - L'identifiant du restaurant.
 * @param menuId - L'identifiant de l'élément du menu.
 * @param ext - L'extension du fichier (par défaut "png").
 * @returns Un objet JSON contenant l'URL publique.
 */
export async function getRestaurantMenuImage(
    restaurantId: string,
    menuId: string,
    ext: string = 'png'
): Promise<{ url: string }> {
    const url = `http://localhost:5003/public/restaurants/${restaurantId}/menus/${restaurantId}_${menuId}.${ext}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Impossible de récupérer l'image de menu");
    }
    return { url: response.url };
}

/**
 * Récupère l'URL publique de la photo de profil d'un utilisateur.
 * La route publique est construite comme suit :
 * http://localhost:5003/public/users/{userId}/{userId}_profile_picture.{extension}
 *
 * @param userId - L'identifiant de l'utilisateur.
 * @param ext - L'extension du fichier (par défaut "png").
 * @returns Un objet JSON contenant l'URL publique.
 */
export async function getUserProfilePicture(
    userId: string,
    ext: string = 'png'
): Promise<{ url: string }> {
    const url = `http://localhost:5003/public/users/${userId}/${userId}_profile_picture.${ext}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Impossible de récupérer la photo de profil");
    }
    return { url: response.url };
}
