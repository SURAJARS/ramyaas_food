import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gettext } from '../utils/translations';
import { LoadingSpinner, ErrorMessage } from '../components/Common';
import { reelsApi } from '../utils/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get correct video URL
const getVideoUrl = (videoPath) => {
  if (!videoPath) return '';
  
  // If it's already a full URL (from Cloudinary), return as-is
  if (videoPath.startsWith('http://') || videoPath.startsWith('https://')) {
    return videoPath;
  }
  
  // For legacy videos, construct the full URL
  const backendUrl = API_BASE_URL.replace('/api', '');
  return `${backendUrl}${videoPath}`;
};

const Reels = () => {
  const { language } = useLanguage();
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await reelsApi.getAll();
        setReels(response.data);
      } catch (err) {
        setError('Failed to load reels');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  useEffect(() => {
    // Load Instagram embed script when reels change
    if (typeof window !== 'undefined' && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [reels]);

  const extractInstagramId = (url) => {
    const match = url?.match(/(?:instagram\.com\/(?:p|reel|tv)\/|instagram\.com\/tv\/|youtu\.be\/|youtube\.com\/watch\?v=)([^\/?]+)/);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (reel) => {
    if (reel.type === 'instagram' && reel.instagramLink) {
      return `https://www.instagram.com/embed.js`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-ramyaas-700 mb-12">
          {gettext('reelsTitle', language)}
        </h1>

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reels.map(reel => (
              <div key={reel._id} className="bg-gray-50 rounded-lg overflow-hidden">
                {reel.type === 'upload' && reel.videoFile && (
                  <video
                    src={getVideoUrl(reel.videoFile)}
                    className="w-full h-64 object-cover"
                    controls
                    controlsList="download"
                    crossOrigin="anonymous"
                    style={{ backgroundColor: '#000' }}
                  />
                )}
                {reel.type === 'instagram' && reel.instagramLink && (
                  <div className="w-full h-64 bg-gray-900 flex items-center justify-center p-4">
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-permalink={reel.instagramLink}
                      data-instgrm-version="14"
                      style={{
                        background: '#FFF',
                        border: '0',
                        borderRadius: '3px',
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                        margin: '1px',
                        maxWidth: '300px',
                        minWidth: '326px',
                        padding: '0',
                        width: '100%'
                      }}
                    >
                      <a href={reel.instagramLink} target="_blank" rel="noopener noreferrer">
                        {reel.titleTA}
                      </a>
                    </blockquote>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {reel[language === 'ta' ? 'titleTA' : 'titleEN']}
                  </h3>
                  {reel[language === 'ta' ? 'descriptionTA' : 'descriptionEN'] && (
                    <p className="text-sm text-gray-600">
                      {reel[language === 'ta' ? 'descriptionTA' : 'descriptionEN']}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reels;
