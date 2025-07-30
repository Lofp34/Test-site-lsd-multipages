'use client';

import React, { useState, useEffect } from 'react';

interface BrokenLink {
  id: string;
  url: string;
  sourceFiles: string[];
  linkType: 'internal' | 'external' | 'download' | 'anchor';
  priority: 'critical' | 'high' | 'medium' | 'low';
  error: string;
  suggestedActions: string[];
  seoImpact: number;
  lastWorking?: string;
  statusCode?: number;
}

const priorityColors = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-gray-100 text-gray-800 border-gray-200',
};

const linkTypeIcons = {
  internal: '🔗',
  external: '🌐',
  download: '📄',
  anchor: '⚓',
};

export function BrokenLinksTable() {
  const [brokenLinks, setBrokenLinks] = useState<BrokenLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'priority' | 'seoImpact' | 'url'>('priority');
  const [filterBy, setFilterBy] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [selectedLink, setSelectedLink] = useState<BrokenLink | null>(null);

  useEffect(() => {
    const fetchBrokenLinks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/broken-links');
        if (response.ok) {
          const data = await response.json();
          setBrokenLinks(data);
        }
      } catch (error) {
        console.error('Failed to fetch broken links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokenLinks();
  }, []);

  const sortedAndFilteredLinks = brokenLinks
    .filter(link => filterBy === 'all' || link.priority === filterBy)
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === 'seoImpact') {
        return b.seoImpact - a.seoImpact;
      } else {
        return a.url.localeCompare(b.url);
      }
    });

  const handleFixLink = async (linkId: string) => {
    try {
      const response = await fetch(`/api/admin/fix-link/${linkId}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        // Refresh the list
        setBrokenLinks(prev => prev.filter(link => link.id !== linkId));
      }
    } catch (error) {
      console.error('Failed to fix link:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (brokenLinks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Aucun lien mort détecté !
        </h3>
        <p className="text-green-600">
          Tous les liens du site fonctionnent correctement.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and sorting */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mint-green focus:border-transparent"
          >
            <option value="all">Toutes les priorités</option>
            <option value="critical">Critique</option>
            <option value="high">Élevée</option>
            <option value="medium">Moyenne</option>
            <option value="low">Faible</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mint-green focus:border-transparent"
          >
            <option value="priority">Trier par priorité</option>
            <option value="seoImpact">Trier par impact SEO</option>
            <option value="url">Trier par URL</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-600">
          {sortedAndFilteredLinks.length} lien{sortedAndFilteredLinks.length > 1 ? 's' : ''} trouvé{sortedAndFilteredLinks.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Lien</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Priorité</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Erreur</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Impact SEO</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredLinks.map((link) => (
              <tr key={link.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-blue-ink truncate max-w-xs" title={link.url}>
                      {link.url}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {link.sourceFiles.length} fichier{link.sourceFiles.length > 1 ? 's' : ''} source{link.sourceFiles.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </td>
                
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{linkTypeIcons[link.linkType]}</span>
                    <span className="text-sm capitalize">{link.linkType}</span>
                  </div>
                </td>
                
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[link.priority]}`}>
                    {link.priority === 'critical' ? 'Critique' :
                     link.priority === 'high' ? 'Élevée' :
                     link.priority === 'medium' ? 'Moyenne' : 'Faible'}
                  </span>
                </td>
                
                <td className="py-3 px-4">
                  <div className="text-sm text-red-600">
                    {link.statusCode && `${link.statusCode} - `}{link.error}
                  </div>
                </td>
                
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      link.seoImpact >= 8 ? 'bg-red-500' :
                      link.seoImpact >= 5 ? 'bg-orange-500' :
                      link.seoImpact >= 3 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-sm">{link.seoImpact}/10</span>
                  </div>
                </td>
                
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedLink(link)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Détails
                    </button>
                    
                    {link.suggestedActions.length > 0 && (
                      <button
                        onClick={() => handleFixLink(link.id)}
                        className="text-mint-green hover:text-mint-green/80 text-sm font-medium"
                      >
                        Corriger
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Link details modal */}
      {selectedLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-blue-ink">
                  Détails du lien mort
                </h3>
                <button
                  onClick={() => setSelectedLink(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <div className="bg-gray-50 p-3 rounded border break-all">
                    {selectedLink.url}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fichiers sources</label>
                  <div className="bg-gray-50 p-3 rounded border">
                    {selectedLink.sourceFiles.map((file, index) => (
                      <div key={index} className="text-sm font-mono">
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Erreur</label>
                  <div className="bg-red-50 p-3 rounded border border-red-200 text-red-800">
                    {selectedLink.error}
                  </div>
                </div>
                
                {selectedLink.suggestedActions.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Actions suggérées</label>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <ul className="list-disc list-inside space-y-1">
                        {selectedLink.suggestedActions.map((action, index) => (
                          <li key={index} className="text-sm text-blue-800">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {selectedLink.lastWorking && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dernière fois fonctionnel</label>
                    <div className="text-sm text-gray-600">
                      {new Date(selectedLink.lastWorking).toLocaleString('fr-FR')}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedLink(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Fermer
                </button>
                
                {selectedLink.suggestedActions.length > 0 && (
                  <button
                    onClick={() => {
                      handleFixLink(selectedLink.id);
                      setSelectedLink(null);
                    }}
                    className="px-4 py-2 bg-mint-green text-white rounded hover:bg-mint-green/90"
                  >
                    Appliquer la correction
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}