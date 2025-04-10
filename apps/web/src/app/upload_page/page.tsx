"use client";

import React, { useState } from 'react';
import {
    uploadRestaurantBanner,
    getRestaurantBanner
} from '@/lib/images_api';

const BannerUploadAndDisplay: React.FC<{ restaurantId: string }> = ({ restaurantId = 42 }) => {
    const [file, setFile] = useState<File | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Veuillez sélectionner un fichier image.');
            return;
        }

        try {
            setLoading(true);
            setMessage('Téléversement en cours...');
            // Effectue l'upload
            const uploadResponse = await uploadRestaurantBanner(restaurantId, file);
            console.log("Upload Response:", uploadResponse.url);
            // Une fois l'upload terminé, récupère l'URL via GET pour être certain (et cela se fait qu'une fois)
            const getResponse = await getRestaurantBanner(restaurantId);
            console.log("Get Response:", getResponse.url);
            setBannerUrl(getResponse.url);
            setMessage('Upload réussi !');
        } catch (error: any) {
            console.error("Erreur d'upload:", error);
            setMessage("Erreur lors de l'upload de la bannière.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            margin: '0 auto',
            maxWidth: '600px',
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1>Test d'Upload de Bannière</h1>
            <p>Restaurant ID : <strong>{restaurantId}</strong></p>
            <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                style={{ display: 'block', margin: '20px auto' }}
            />
            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none'
                }}
            >
                {loading ? "Téléversement..." : "Uploader l'image"}
            </button>
            {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
            {bannerUrl && (
                <div style={{ marginTop: '30px' }}>
                    <h2>Bannière Uploadée</h2>
                    <img
                        src={bannerUrl}
                        alt="Bannière du restaurant"
                        style={{
                            maxWidth: '100%',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default BannerUploadAndDisplay;
