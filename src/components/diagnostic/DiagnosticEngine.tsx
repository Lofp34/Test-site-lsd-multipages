'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, GitBranch, Users, BarChart3, TrendingUp,
  ArrowRight, Calendar, CheckCircle, Mail, Building2, User,
  Shield, Clock
} from 'lucide-react';
import {
  questions, categories, personas, getComparisonText,
  getCategoryMaxScore, getRecommendations,
  type CategoryId, type CategoryResult, type DiagnosticResult,
} from '@/data/diagnostic-commercial-data';

// ============================================================
// ICÔNES PAR CATÉGORIE
// ============================================================
const categoryIcons: Record<CategoryId, React.ReactNode> = {
  prospection: <Target className="w-5 h-5" />,
  processus: <GitBranch className="w-5 h-5" />,
  equipe: <Users className="w-5 h-5" />,
  performance: <BarChart3 className="w-5 h-5" />,
  strategie: <TrendingUp className="w-5 h-5" />,
};

// ============================================================
// MAIN ENGINE
// ============================================================
export default function DiagnosticEngine() {
  const [step, setStep] = useState<'home' | 'quiz' | 'results' | 'unlocked'>('home');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState<Record<number, number>>({});
  const [answeredIds, setAnsweredIds] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Lead capture
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captureDone, setCaptureDone] = useState(false);

  const [visitorCount] = useState(() => Math.floor(Math.random() * 151) + 150);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scrollTop = () => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // ============================================================
  // HANDLE ANSWER
  // ============================================================
  const handleAnswer = useCallback((points: number) => {
    const q = questions[currentQIndex];
    if (!q) return;

    const newScore = { ...score, [q.id]: points };
    const newAnswered = [...answeredIds, q.id];
    setScore(newScore);
    setAnsweredIds(newAnswered);

    const nextIndex = currentQIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQIndex(nextIndex);
    } else {
      calculateResults(newScore);
    }
  }, [currentQIndex, score, answeredIds]);

  // ============================================================
  // CALCULATE RESULTS
  // ============================================================
  const calculateResults = useCallback((answers: Record<number, number>) => {
    setIsCalculating(true);
    scrollTop();

    setTimeout(() => {
      const categoryResults: CategoryResult[] = categories.map(cat => {
        const catQs = questions.filter(q => q.category === cat.id);
        const catScore = catQs.reduce((s, q) => s + (answers[q.id] || 0), 0);
        const maxScore = getCategoryMaxScore(cat.id);
        return {
          categoryId: cat.id,
          score: catScore,
          maxScore,
          percentage: Math.round((catScore / maxScore) * 100),
        };
      });

      const totalScore = categoryResults.reduce((s, cr) => s + cr.score, 0);
      const maxTotal = getMaxTotalScore();
      const pct = Math.round((totalScore / maxTotal) * 100);
      const persona = personas.find(p => pct >= p.minScore && pct <= p.maxScore) || personas[4];

      setResult({
        totalScore, maxScore: maxTotal, percentage: pct, persona,
        categories: categoryResults,
        comparisonText: getComparisonText(pct),
        summary: `${persona.description} Score global : ${pct}/100.`,
      });
      setIsCalculating(false);
      setStep('results');
      scrollTop();
    }, 1800);
  }, []);

  // ============================================================
  // SUBMIT LEAD TO HUBSPOT
  // ============================================================
  const submitLead = async () => {
    if (!email || !firstName || !lastName || !company) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/hubspot/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, company,
          message: `Diagnostic 360° — Score ${result?.totalScore}/${result?.maxScore}`,
        }),
      });
    } catch {
      // Silent — unlock anyway
    } finally {
      setCaptureDone(true);
      setStep('unlocked');
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // RESTART
  // ============================================================
  const restart = () => {
    setStep('home');
    setCurrentQIndex(0);
    setScore({});
    setAnsweredIds([]);
    setResult(null);
    setCaptureDone(false);
    setEmail('');
    setFirstName('');
    setLastName('');
    setCompany('');
    scrollTop();
  };

  // ============================================================
  // HOME
  // ============================================================
  if (step === 'home') {
    return (
      <div ref={topRef} className="min-h-screen bg-white">
        <div className="relative bg-gradient-to-br from-blue-ink to-blue-ink/95 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mint-green rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-xs text-white/40 uppercase tracking-widest mb-6 font-medium">
                Outil d'auto-diagnostic — 5 minutes
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                Diagnostic commercial<br />
                <span className="text-mint-green">360°</span>
              </h1>

              <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
                20 questions pour évaluer votre organisation commerciale.<br />
                Prospection, processus, équipe, pilotage, stratégie.<br />
                Un score. Un plan d'action.
              </p>

              <button
                onClick={() => { setStep('quiz'); scrollTop(); }}
                className="inline-flex items-center gap-2 bg-mint-green text-white font-semibold px-8 py-4 rounded-xl hover:bg-mint-green/90 transition-all duration-200 shadow-lg shadow-mint-green/20"
              >
                Commencer le diagnostic
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-white/30 text-xs mt-3">
                {visitorCount} diagnostics réalisés cette semaine
              </div>

              <div className="mt-16 grid grid-cols-2 sm:grid-cols-5 gap-6 max-w-2xl mx-auto">
                {categories.map(cat => (
                  <div key={cat.id} className="text-center">
                    <div className="text-white/40 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 mb-2">
                      {categoryIcons[cat.id]}
                    </div>
                    <div className="text-white/50 text-xs leading-tight">{cat.shortLabel}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Values section */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { title: '5 axes analysés', desc: 'Prospection, processus, équipe, performance, stratégie' },
              { title: 'Score & profil', desc: 'Un score global /100 et un profil détaillé par catégorie' },
              { title: 'Plan d\'action', desc: 'Recommandations personnalisées débloquées par email' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <h3 className="font-semibold text-blue-ink mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // QUIZ
  // ============================================================
  if (step === 'quiz') {
    const q = questions[currentQIndex];
    if (!q) return null;
    const cat = categories.find(c => c.id === q.category)!;
    const catAnswered = answeredIds.filter(id => questions.find(qq => qq.id === id)?.category === q.category).length;
    const catTotal = questions.filter(qq => qq.category === q.category).length;
    const progress = ((currentQIndex) / questions.length) * 100;

    return (
      <div ref={topRef} className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-ink font-medium">{cat.label}</span>
                <span className="text-gray-300">—</span>
                <span className="text-gray-400">{catAnswered + 1}/{catTotal}</span>
              </div>
              <span className="text-xs text-gray-400 tabular-nums">{currentQIndex + 1}/{questions.length}</span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-ink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <div className="inline-flex items-center gap-2 text-xs text-gray-400 mb-6 uppercase tracking-wider font-medium">
                Question {currentQIndex + 1}
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-blue-ink mb-10 leading-relaxed">
                {q.text}
              </h2>

              <div className="space-y-3">
                {q.answers.map((answer, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleAnswer(answer.points)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-gray-200 hover:border-blue-ink/30 hover:bg-blue-ink/[0.02] transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-7 h-7 rounded-full border border-gray-200 group-hover:border-blue-ink/30 flex items-center justify-center text-xs text-gray-400 group-hover:text-blue-ink flex-shrink-0 transition-colors">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-gray-700 group-hover:text-blue-ink text-sm sm:text-base leading-snug transition-colors">
                        {answer.text}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ============================================================
  // CALCULATING
  // ============================================================
  if (isCalculating) {
    return (
      <div ref={topRef} className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gray-100"
              style={{ borderTopColor: '#1a365d' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            />
          </div>
          <p className="text-blue-ink font-medium">Analyse de vos réponses...</p>
          <p className="text-gray-400 text-sm mt-2">Nous préparons votre rapport personnalisé</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RESULTS
  // ============================================================
  if (step === 'results' && result) {
    return (
      <div ref={topRef} className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          {/* Score & Persona */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-5 gap-8 mb-8"
          >
            {/* Score card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4">Score global</div>
              <div className="text-6xl sm:text-7xl font-bold text-blue-ink tracking-tight">
                {result.percentage}
                <span className="text-2xl text-gray-300 font-normal">/100</span>
              </div>
              <div className="mt-4 h-2 w-full max-w-xs bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-ink rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

            {/* Persona card */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-ink/5 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {result.persona.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Profil</div>
                  <h2 className="text-2xl font-bold text-blue-ink mb-1">{result.persona.name}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{result.persona.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="text-gray-400">{result.comparisonText}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category scores */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8"
          >
            {result.categories.map((cr, i) => {
              const cat = categories.find(c => c.id === cr.categoryId)!;
              const pctColors: Record<string, string> = {
                '0-25': 'text-red-500 bg-red-50 border-red-100',
                '25-50': 'text-orange-500 bg-orange-50 border-orange-100',
                '50-75': 'text-blue-ink bg-blue-ink/5 border-blue-ink/10',
                '75-100': 'text-mint-green bg-mint-green/5 border-mint-green/10',
              };
              const pctKey = cr.percentage < 25 ? '0-25' : cr.percentage < 50 ? '25-50' : cr.percentage < 75 ? '50-75' : '75-100';
              const colors = pctColors[pctKey];
              return (
                <motion.div
                  key={cr.categoryId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`bg-white rounded-xl p-4 border ${colors.split(' ').slice(-1)} shadow-sm`}
                >
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-3 ${colors.split(' ').slice(0, 2).join(' ')}`}>
                    {categoryIcons[cr.categoryId]}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{cat.shortLabel}</div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${colors.split(' ')[0]}`}>{cr.percentage}</span>
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        cr.percentage < 25 ? 'bg-red-400' :
                        cr.percentage < 50 ? 'bg-orange-400' :
                        cr.percentage < 75 ? 'bg-blue-ink' : 'bg-mint-green'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cr.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">{cr.score}/{cr.maxScore}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Lead capture CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-ink rounded-2xl p-8 sm:p-10 shadow-lg"
          >
            <div className="max-w-lg mx-auto text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Débloquez votre plan d'action personnalisé
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Recevez vos recommandations détaillées, votre plan 30 jours et l'analyse comparative
              </p>

              <form
                onSubmit={e => { e.preventDefault(); submitLead(); }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text" required placeholder="Prénom"
                      value={firstName} onChange={e => setFirstName(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text" required placeholder="Nom"
                      value={lastName} onChange={e => setLastName(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email" required placeholder="Email professionnel"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text" required placeholder="Entreprise"
                    value={company} onChange={e => setCompany(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent"
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-mint-green hover:bg-mint-green/90 disabled:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  {isSubmitting ? 'Déblocage en cours...' : 'Débloquer mon rapport'}
                </button>
              </form>

              <div className="flex items-center justify-center gap-4 mt-4 text-white/30 text-xs">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Données confidentielles</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Rapport disponible 48h</span>
              </div>
            </div>
          </motion.div>

          {/* Restart */}
          <div className="text-center mt-8">
            <button onClick={restart} className="text-sm text-gray-400 hover:text-blue-ink transition-colors">
              Refaire le diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // UNLOCKED REPORT
  // ============================================================
  if (step === 'unlocked' && result) {
    const recommendations = getRecommendations(result.categories);

    return (
      <div ref={topRef} className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
              Rapport personnalisé
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-ink mb-2">
              {result.persona.name}
            </h1>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Score {result.totalScore}/{result.maxScore} — {result.percentage}/100
            </p>
          </motion.div>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-8 flex items-center gap-3"
          >
            <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              Ce rapport est disponible pendant 48h. Téléchargez-le ou imprimez-le pour le consulter plus tard.
            </p>
          </motion.div>

          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <h3 className="font-semibold text-blue-ink mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-mint-green" />
              Priorité identifiée
            </h3>
            <p className="text-gray-600 text-sm">{result.persona.challenge}</p>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="font-semibold text-blue-ink mb-5 text-lg">Plan d'action par catégorie</h3>
            <div className="space-y-4">
              {recommendations.map((rec, i) => {
                const cat = categories.find(c => c.id === rec.categoryId)!;
                const levelStyles: Record<string, { border: string; bg: string; label: string; labelStyle: string }> = {
                  critique: {
                    border: 'border-red-200', bg: 'bg-red-50',
                    label: 'Critique', labelStyle: 'bg-red-100 text-red-700',
                  },
                  prioritaire: {
                    border: 'border-orange-200', bg: 'bg-orange-50',
                    label: 'Prioritaire', labelStyle: 'bg-orange-100 text-orange-700',
                  },
                  amelioration: {
                    border: 'border-yellow-200', bg: 'bg-yellow-50',
                    label: 'À améliorer', labelStyle: 'bg-yellow-100 text-yellow-700',
                  },
                  consolidation: {
                    border: 'border-blue-200', bg: 'bg-blue-50',
                    label: 'À consolider', labelStyle: 'bg-blue-100 text-blue-700',
                  },
                  excellent: {
                    border: 'border-mint-green/20', bg: 'bg-mint-green/5',
                    label: 'Point fort', labelStyle: 'bg-mint-green/10 text-mint-green',
                  },
                };
                const s = levelStyles[rec.level];

                return (
                  <motion.div
                    key={rec.categoryId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className={`rounded-xl border ${s.border} ${s.bg} p-5`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-ink">{categoryIcons[rec.categoryId]}</span>
                        <div>
                          <div className="font-semibold text-blue-ink text-sm">{cat.label}</div>
                          <div className="text-xs text-gray-400">{rec.score}/{rec.maxScore} pts</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${s.labelStyle}`}>
                        {s.label}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-blue-ink mb-2">{rec.title}</div>
                    <ul className="space-y-1">
                      {rec.actions.map((action, ai) => (
                        <li key={ai} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-blue-ink/30 mt-1">—</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-4"
          >
            <a
              href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-mint-green text-white font-semibold px-8 py-4 rounded-xl hover:bg-mint-green/90 transition-all shadow-lg shadow-mint-green/20"
            >
              <Calendar className="w-4 h-4" />
              Discuter de mon diagnostic avec Laurent
            </a>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <button onClick={restart} className="hover:text-blue-ink transition-colors">Refaire le diagnostic</button>
              <span className="text-gray-300">|</span>
              <a href="/formation-commerciale-pme" className="hover:text-blue-ink transition-colors">Nos formations</a>
              <span className="text-gray-300">|</span>
              <a href="/bootcamp-commercial-intensif" className="hover:text-blue-ink transition-colors">Le bootcamp</a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
