import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gettext } from '../utils/translations';
import { SnackCard, LoadingSpinner, ErrorMessage } from '../components/Common';
import { snackApi } from '../utils/api';

const Snacks = () => {
  const { language } = useLanguage();
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const response = await snackApi.getAll();
        setSnacks(response.data);
      } catch (err) {
        setError('Failed to load snacks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSnacks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-ramyaas-700 mb-4">
          {gettext('snacksTitle', language)}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {gettext('ourStory', language)}
        </p>

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snacks.map(snack => (
              <SnackCard key={snack._id} snack={snack} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Snacks;
