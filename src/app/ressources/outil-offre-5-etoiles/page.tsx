'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { ArrowLeft, Star, Sparkles, CheckCircle, Download, Copy, Zap, Target, Award, TrendingUp, FileText, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function OutilOffre5EtoilesPage() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientCompany: '',
    clientSector: '',
    clientProblem: '',
    solution: '',
    budget: '',
    timeline: '',
    benefits: ['', '', ''],
    urgency: '',
    guarantee: '',
    pricing: '',
    bonuses: ['', '']
  });

  const [generatedOffer, setGeneratedOffer] = useState('');
  const [showOffer, setShowOffer] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const generateOffer = () => {
    const offer = `
# PROPOSITION COMMERCIALE EXCLUSIVE
## Pour ${formData.clientName} - ${formData.clientCompany}

---

### 🎯 VOTRE SITUATION ACTUELLE

**Secteur d'activité :** ${formData.clientSector}

**Défi identifié :** ${formData.clientProblem}

**Impact sur votre activité :** ${formData.urgency}

---

### ✨ NOTRE SOLUTION SUR-MESURE

**Ce que nous vous proposons :**
${formData.solution}

**Calendrier de mise en œuvre :**
${formData.timeline}

---

### 🚀 VOS BÉNÉFICES GARANTIS

${formData.benefits.filter(benefit => benefit.trim()).map((benefit, index) => 
  `**${index + 1}.** ${benefit}`
).join('\n')}

---

### 💎 VOTRE INVESTISSEMENT

**Tarif exceptionnel :** ${formData.pricing}

**Budget alloué :** ${formData.budget}

**Garantie incluse :** ${formData.guarantee}

---

### 🎁 BONUS EXCLUSIFS

${formData.bonuses.filter(bonus => bonus.trim()).map((bonus, index) => 
  `**Bonus ${index + 1} :** ${bonus}`
).join('\n')}

---

### ⚡ OFFRE LIMITÉE

Cette proposition est valable jusqu'au [DATE + 7 JOURS] uniquement.

**Prochaine étape :** Confirmer votre accord sous 48h pour bénéficier de ces conditions exceptionnelles.

---

*Proposition établie par Laurent Serre*
*Contact : laurent@laurentserre.com*
    `;

    setGeneratedOffer(offer);
    setShowOffer(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedOffer);
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/ressources" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux ressources
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <Star className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Outil Exclusif • Générateur d'Offres
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Créateur d'Offres
              <span className="block text-mint-green">5 Étoiles</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Générez des propositions commerciales irrésistibles qui convertissent vos prospects en clients.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6 flex items-center">
              <Sparkles className="w-8 h-8 text-mint-green mr-3" />
              L'Art de l'Offre Irrésistible
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              Une offre 5 étoiles transforme un prospect hésitant en client enthousiaste. 
              Cet outil vous guide pour créer des propositions commerciales qui font la différence.
            </p>
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-mint-green" />
                </div>
                <h3 className="font-semibold text-blue-ink text-sm">Ciblage Précis</h3>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-mint-green" />
                </div>
                <h3 className="font-semibold text-blue-ink text-sm">Valeur Maximale</h3>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-mint-green" />
                </div>
                <h3 className="font-semibold text-blue-ink text-sm">Urgence Légitme</h3>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-mint-green" />
                </div>
                <h3 className="font-semibold text-blue-ink text-sm">Taux de Conversion</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Générateur d'Offre */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-title font-bold text-blue-ink mb-6 flex items-center">
                <FileText className="w-6 h-6 text-mint-green mr-3" />
                Créer votre offre
              </h2>
              
              <div className="space-y-6">
                {/* Informations Client */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-ink">👤 Informations Client</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nom du contact"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                    />
                    <input
                      type="text"
                      placeholder="Entreprise"
                      value={formData.clientCompany}
                      onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Secteur d'activité"
                    value={formData.clientSector}
                    onChange={(e) => handleInputChange('clientSector', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                  />
                </div>

                {/* Problème et Solution */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-ink">🎯 Problème et Solution</h3>
                  <textarea
                    placeholder="Problème principal du client"
                    value={formData.clientProblem}
                    onChange={(e) => handleInputChange('clientProblem', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                  />
                  <textarea
                    placeholder="Votre solution"
                    value={formData.solution}
                    onChange={(e) => handleInputChange('solution', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                  />
                </div>

                {/* Bénéfices */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-ink">✨ Bénéfices Clés</h3>
                  {formData.benefits.map((benefit, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Bénéfice ${index + 1}`}
                      value={benefit}
                      onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                    />
                  ))}
                </div>

                {/* Tarification */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-ink">💰 Tarification</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Tarif proposé"
                      value={formData.pricing}
                      onChange={(e) => handleInputChange('pricing', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                    />
                    <input
                      type="text"
                      placeholder="Budget client"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Garantie offerte"
                    value={formData.guarantee}
                    onChange={(e) => handleInputChange('guarantee', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                  />
                </div>

                {/* Bonus et Urgence */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-ink">🎁 Bonus et Urgence</h3>
                  {formData.bonuses.map((bonus, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Bonus ${index + 1}`}
                      value={bonus}
                      onChange={(e) => handleArrayChange('bonuses', index, e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Calendrier/timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                  />
                  <textarea
                    placeholder="Raison de l'urgence"
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent bg-white text-gray-anthracite"
                  />
                </div>

                {/* Bouton de génération */}
                <button
                  onClick={generateOffer}
                  className="w-full bg-mint-green hover:bg-mint-green/90 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Générer l'offre 5 étoiles
                </button>
              </div>
            </div>

            {/* Aperçu de l'offre */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-title font-bold text-blue-ink mb-6 flex items-center">
                <Star className="w-6 h-6 text-mint-green mr-3" />
                Votre offre générée
              </h2>
              
              {showOffer ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-anthracite font-mono">
                      {generatedOffer}
                    </pre>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 bg-blue-ink hover:bg-blue-ink/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copier
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 bg-mint-green hover:bg-mint-green/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-lg text-gray-anthracite">
                    Remplissez le formulaire et cliquez sur "Générer" pour voir votre offre 5 étoiles
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Conseils */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6 text-center">
              💡 Les Secrets d'une Offre 5 Étoiles
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-title font-semibold text-mint-green mb-3">✅ À Faire</h3>
                  <ul className="space-y-2 text-gray-anthracite">
                    <li>• Personnaliser chaque détail</li>
                    <li>• Quantifier les bénéfices</li>
                    <li>• Créer une urgence légitime</li>
                    <li>• Proposer des bonus cohérents</li>
                    <li>• Inclure une garantie forte</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-title font-semibold text-red-500 mb-3">❌ À Éviter</h3>
                  <ul className="space-y-2 text-gray-anthracite">
                    <li>• Offres génériques</li>
                    <li>• Trop de choix</li>
                    <li>• Fausse urgence</li>
                    <li>• Bénéfices vagues</li>
                    <li>• Prix sans justification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-blue-ink rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-title font-bold mb-4">
              Envie d'aller plus loin ?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Cet outil n'est qu'un début. Découvrez comment créer des offres qui convertissent à plus de 80% 
              avec mes techniques avancées.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Maîtriser l'art de l'offre
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}