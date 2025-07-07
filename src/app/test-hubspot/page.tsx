'use client';

import { useState } from 'react';

export default function TestHubSpot() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    console.log('🧪 TEST HUBSPOT - Début');
    console.log('📝 Données du formulaire simple:', formData);

    try {
      // Test avec l'API simple
      const response = await fetch('/api/hubspot/contact-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📊 Statut de la réponse:', response.status);

      const data = await response.json();
      console.log('📄 Réponse complète:', data);

      if (response.ok) {
        setResult({
          success: true,
          message: 'Contact créé avec succès !',
          data: data
        });
      } else {
        setResult({
          success: false,
          message: 'Erreur lors de la création du contact',
          error: data,
          status: response.status
        });
      }

    } catch (error) {
      console.error('❌ Erreur réseau:', error);
      setResult({
        success: false,
        message: 'Erreur réseau',
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🧪 Test HubSpot - Formulaire Simple
          </h1>
          
          <p className="text-gray-600 mb-8">
            Formulaire de test avec seulement les champs essentiels pour identifier le problème HubSpot.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre prénom"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre nom"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="votre@email.com"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              {isSubmitting ? '⏳ Test en cours...' : '🚀 Tester HubSpot'}
            </button>
          </form>

          {/* Résultats */}
          {result && (
            <div className={`mt-8 p-6 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                {result.success ? '✅ Succès' : '❌ Erreur'}
              </h3>
              
              <p className={`mb-4 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                {result.success ? result.message :
                  (result.error && result.error.hubspotError && (result.error.hubspotError.category === 'CONFLICT' || result.status === 409)
                    ? 'Un contact avec cet email existe déjà dans HubSpot.'
                    : result.message)
                }
              </p>

              <details className="mt-4">
                <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                  📋 Détails techniques
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                  {JSON.stringify(result.success ? result.data : result.error, null, 2)}
                </pre>
              </details>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Instructions de Test</h4>
            <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
              <li>Ouvrez la console navigateur (F12 → Console)</li>
              <li>Remplissez le formulaire avec des données de test</li>
              <li>Cliquez sur "Tester HubSpot"</li>
              <li>Regardez les logs dans la console</li>
              <li>Vérifiez le résultat ci-dessous</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}