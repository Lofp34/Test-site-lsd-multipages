'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, GitBranch, Users, BarChart3, TrendingUp,
  ArrowRight, Calendar, CheckCircle, Mail, Building2, User,
  Shield, Clock, Sparkles, MessageSquare, Lightbulb, AlertTriangle, Bot
} from 'lucide-react';
import CoachChat from './CoachChat';
import {
  questions, categories, getCategoryMaxScore, getMaxTotalScore,
  type CategoryId, type DiagnosticAnalysis,
} from '@/data/diagnostic-commercial-data';

// ============================================================
// TYPES
// ============================================================

interface CategoryScore {
  categoryId: CategoryId;
  score: number;
  maxScore: number;
  percentage: number;
}

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
  const [step, setStep] = useState<'home' | 'quiz' | 'capture' | 'calculating' | 'results'>('home');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState<Record<number, number>>({});
  const [answeredIds, setAnsweredIds] = useState<number[]>([]);
  const [analysis, setAnalysis] = useState<DiagnosticAnalysis | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCoach, setShowCoach] = useState(false);
  const [questionnaireSummary, setQuestionnaireSummary] = useState('');

  // Lead capture (required before analysis)
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Internal scores for passing to API
  const [categoryResults, setCategoryResults] = useState<CategoryScore[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const topRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // ============================================================
  // HANDLE ANSWER
  // ============================================================
  function handleAnswer(points: number) {
    if (isCalculating) return;

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
      // Quiz finished → show lead capture
      computeScores(newScore);
      setStep('capture');
      scrollTop();
    }
  }

  // ============================================================
  // COMPUTE SCORES (for context, shown to LLM)
  // ============================================================
  function computeScores(answers: Record<number, number>) {
    const catResults: CategoryScore[] = categories.map(cat => {
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

    const total = catResults.reduce((s, cr) => s + cr.score, 0);
    const maxTotal = getMaxTotalScore();

    // Build questionnaire summary for Sales Coach (enrichi avec scores catégories)
    const headerLines = catResults.map(cr => {
      const cat = categories.find(c => c.id === cr.categoryId)!;
      return `[${cat.label}] ${cr.score}/${cr.maxScore} (${cr.percentage}%)`;
    });
    const detailLines = questions.map(q => {
      const answer = q.answers.find(a => a.points === answers[q.id]);
      const cat = categories.find(c => c.id === q.category)!;
      return `Q${q.id} (${cat.shortLabel}): ${q.text} → "${answer?.text || 'N/A'}" (${answers[q.id] || 0}/${Math.max(...q.answers.map(a => a.points))})`;
    });
    setQuestionnaireSummary(
      `--- SCORES PAR AXE ---\n${headerLines.join('\n')}\n\n--- DÉTAIL DES 20 RÉPONSES ---\n${detailLines.join('\n')}`
    );

    setCategoryResults(catResults);
    setTotalScore(total);
    setPercentage(Math.round((total / maxTotal) * 100));
  }

  // ============================================================
  // SUBMIT & CALL LLM
  // ============================================================
  const submitAndAnalyze = async () => {
    if (!email || !firstName || !lastName || !company) return;
    setIsSubmitting(true);
    setError(null);

    // Build the answer data for the API
    const answerData = questions.map(q => ({
      questionId: q.id,
      questionText: q.text,
      category: q.category,
      answerText: q.answers.find(a => a.points === score[q.id])?.text || '',
      points: score[q.id] || 0,
      maxPoints: Math.max(...q.answers.map(a => a.points)),
    }));

    try {
      // Optional: send lead to HubSpot silently
      fetch('/api/hubspot/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, company,
          message: `Diagnostic 360° — Score ${totalScore}/${getMaxTotalScore()}`,
        }),
      }).catch(() => {});

      // Show calculating state
      setStep('calculating');
      scrollTop();

      // Call the LLM analysis API
      const res = await fetch('/api/diagnostic/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answerData,
          user: { firstName, lastName, email, company },
          totalScore,
          maxScore: getMaxTotalScore(),
          percentage,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setAnalysis(data.analysis);
      setStep('results');
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('L\'analyse n\'a pas pu être générée. Vous recevrez votre rapport par email.');
      setStep('results');
    } finally {
      setIsSubmitting(false);
      scrollTop();
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
    setAnalysis(null);
    setError(null);
    setEmail('');
    setFirstName('');
    setLastName('');
    setCompany('');
    setCategoryResults([]);
    setTotalScore(0);
    setPercentage(0);
    setShowCoach(false);
    setQuestionnaireSummary('');
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
                Une analyse personnalisée par IA.
              </p>

              <button
                onClick={() => { setStep('quiz'); scrollTop(); }}
                className="inline-flex items-center gap-2 bg-mint-green text-white font-semibold px-8 py-4 rounded-xl hover:bg-mint-green/90 transition-all duration-200 shadow-lg shadow-mint-green/20"
              >
                Commencer le diagnostic
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-white/30 text-xs mt-3">
                Analyse générée par IA — 5 minutes chrono
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
              { title: 'Analyse IA personnalisée', desc: 'Signaux faibles, risques, hypothèses de diagnostic' },
              { title: 'Plan d\'action sur mesure', desc: 'Recommandations actionnables par catégorie' },
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
  // LEAD CAPTURE (avant analyse LLM)
  // ============================================================
  if (step === 'capture') {
    return (
      <div ref={topRef} className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
                Questionnaire terminé
              </div>
              <h2 className="text-2xl font-bold text-blue-ink mb-2">
                Votre analyse personnalisée
              </h2>
              <p className="text-gray-500 text-sm">
                Laissez-nous vos coordonnées pour générer votre rapport d'analyse IA
              </p>
            </div>

            <form
              onSubmit={e => { e.preventDefault(); submitAndAnalyze(); }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text" required placeholder="Prénom"
                    value={firstName} onChange={e => setFirstName(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-blue-ink placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-ink/20 focus:border-blue-ink"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text" required placeholder="Nom"
                    value={lastName} onChange={e => setLastName(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-blue-ink placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-ink/20 focus:border-blue-ink"
                  />
                </div>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="email" required placeholder="Email professionnel"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-blue-ink placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-ink/20 focus:border-blue-ink"
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text" required placeholder="Entreprise"
                  value={company} onChange={e => setCompany(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-blue-ink placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-ink/20 focus:border-blue-ink"
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className="w-full bg-blue-ink hover:bg-blue-ink/90 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                {isSubmitting ? 'Génération en cours...' : 'Générer mon analyse'}
              </button>
            </form>

            <div className="flex items-center justify-center gap-4 mt-4 text-gray-300 text-xs">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Données confidentielles</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Analyse par IA</span>
            </div>
          </div>

          <div className="text-center mt-6">
            <button onClick={restart} className="text-sm text-gray-400 hover:text-blue-ink transition-colors">
              Refaire le diagnostic
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // CALCULATING (analyse LLM en cours)
  // ============================================================
  if (isCalculating || step === 'calculating') {
    return (
      <div ref={topRef} className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gray-100"
              style={{ borderTopColor: '#1a365d' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-gray-100"
              style={{ borderTopColor: '#FF6B35' }}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
            />
          </div>
          <p className="text-blue-ink font-medium">Analyse de vos réponses...</p>
          <p className="text-gray-400 text-sm mt-2">
            Notre IA génère une analyse personnalisée de votre organisation commerciale
          </p>
          <div className="mt-6 text-xs text-gray-300">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Analyse IA en cours
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RESULTS (analyse LLM)
  // ============================================================
  if (step === 'results') {
    return (
      <div ref={topRef} className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
          {error && !analysis ? (
            /* Error state */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-lg mx-auto">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-blue-ink mb-2">Analyse temporairement indisponible</h2>
                <p className="text-gray-500 text-sm mb-6">{error}</p>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-mint-green text-white font-semibold px-6 py-3 rounded-xl hover:bg-mint-green/90 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Prendre rendez-vous
                  </a>
                  <button onClick={restart} className="text-sm text-gray-400 hover:text-blue-ink transition-colors mt-2">
                    Refaire le diagnostic
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header with score badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
                  Analyse personnalisée
                </div>
                <div className="inline-flex items-center gap-2 text-4xl sm:text-5xl font-bold text-blue-ink mb-2">
                  {analysis?.persona?.emoji || '📊'}
                  <span>{percentage}<span className="text-xl text-gray-300 font-normal">/100</span></span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-ink">
                  {analysis?.persona?.name || 'Analyse commerciale'}
                </h1>
                <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
                  {analysis?.persona?.description || 'Analyse générée par IA à partir de vos réponses'}
                </p>
              </motion.div>

              {/* Synthèse */}
              {analysis?.synthesis && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6"
                >
                  <h3 className="font-semibold text-blue-ink mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-mint-green" />
                    Synthèse
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {analysis.synthesis}
                  </p>
                </motion.div>
              )}

              {/* Category scores */}
              {categoryResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6"
                >
                  {categoryResults.map((cr, i) => {
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
                        transition={{ delay: 0.2 + i * 0.06 }}
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
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">{cr.score}/{cr.maxScore}</div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Two CTAs: Laurent + Sales Coach */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-6"
              >
                <h3 className="font-semibold text-blue-ink text-lg mb-4">Donner de la profondeur à cette analyse</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <a
                    href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-blue-ink hover:bg-blue-ink/90 text-white font-semibold px-5 py-4 rounded-xl transition-all duration-200 shadow-sm group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">Approfondir avec Laurent</div>
                      <div className="text-xs text-white/50">RDV 30 min — débriefing personnalisé</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/70 flex-shrink-0" />
                  </a>

                  <button
                    onClick={() => setShowCoach(true)}
                    className="flex items-center gap-3 bg-white border border-gray-200 hover:border-blue-ink/30 hover:bg-blue-ink/[0.02] text-blue-ink font-semibold px-5 py-4 rounded-xl transition-all duration-200 group text-left"
                  >
                    <div className="w-10 h-10 bg-mint-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-mint-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-blue-ink">Approfondir avec le Sales Coach</div>
                      <div className="text-xs text-gray-400">Chat interactif — questions personnalisées</div>
                    </div>
                    <MessageSquare className="w-4 h-4 text-gray-300 group-hover:text-blue-ink/50 flex-shrink-0" />
                  </button>
                </div>
              </motion.div>

              {/* Coach Chat Modal */}
              {showCoach && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <CoachChat
                    questionnaireContext={questionnaireSummary}
                    userEmail={email}
                    userName={firstName || lastName || ''}
                    onClose={() => setShowCoach(false)}
                  />
                </motion.div>
              )}

              {/* Analyse par catégorie (LLM) */}
              {analysis?.categories && analysis.categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-3 mb-6"
                >
                  <h3 className="font-semibold text-blue-ink text-lg mb-3">Analyse détaillée par axe</h3>
                  {analysis.categories.map((cat, i) => {
                    const catMeta = categories.find(c => c.id === cat.categoryId);
                    if (!catMeta) return null;
                    const levelColors: Record<string, string> = {
                      critique: 'border-red-200 bg-red-50',
                      prioritaire: 'border-orange-200 bg-orange-50',
                      amelioration: 'border-yellow-200 bg-yellow-50',
                      consolidation: 'border-blue-200 bg-blue-50',
                      excellent: 'border-green-200 bg-green-50',
                    };
                    const levelLabels: Record<string, string> = {
                      critique: 'Critique', prioritaire: 'Prioritaire',
                      amelioration: 'À améliorer', consolidation: 'À consolider', excellent: 'Point fort',
                    };
                    const colors = levelColors[cat.level] || 'border-gray-200 bg-gray-50';
                    return (
                      <motion.div
                        key={cat.categoryId}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className={`rounded-xl border ${colors} p-5`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-ink">{categoryIcons[cat.categoryId as CategoryId]}</span>
                          <span className="font-semibold text-blue-ink text-sm">{catMeta.label}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ml-auto ${
                            cat.level === 'critique' ? 'bg-red-100 text-red-700' :
                            cat.level === 'prioritaire' ? 'bg-orange-100 text-orange-700' :
                            cat.level === 'amelioration' ? 'bg-yellow-100 text-yellow-700' :
                            cat.level === 'consolidation' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {levelLabels[cat.level] || cat.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{cat.comment}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Signaux faibles & Risques */}
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {analysis?.signauxFaibles && analysis.signauxFaibles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <h3 className="font-semibold text-blue-ink mb-3 flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      Signaux faibles détectés
                    </h3>
                    <ul className="space-y-2">
                      {analysis.signauxFaibles.map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {analysis?.risques && analysis.risques.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <h3 className="font-semibold text-blue-ink mb-3 flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      Risques identifiés
                    </h3>
                    <ul className="space-y-2">
                      {analysis.risques.map((r, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-orange-400 mt-0.5">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Hypothèses de diagnostic */}
              {analysis?.hypotheses && analysis.hypotheses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6"
                >
                  <h3 className="font-semibold text-blue-ink mb-3 flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-blue-500" />
                    Hypothèses de diagnostic
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">Pistes à explorer — pas des certitudes</p>
                  <ul className="space-y-2">
                    {analysis.hypotheses.map((h, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-ink/30 mt-0.5 font-mono">{i + 1}.</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Questions d'approfondissement */}
              {analysis?.questionsApprofondissement && analysis.questionsApprofondissement.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6"
                >
                  <h3 className="font-semibold text-blue-ink mb-3 flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    Pour aller plus loin
                  </h3>
                  <ul className="space-y-2">
                    {analysis.questionsApprofondissement.map((q, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">?</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Recommandations */}
              {analysis?.recommandations && analysis.recommandations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6"
                >
                  <h3 className="font-semibold text-blue-ink mb-3 flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-mint-green" />
                    Recommandations
                  </h3>
                  <ul className="space-y-2">
                    {analysis.recommandations.map((r, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-mint-green mt-0.5">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Prochaine étape + CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-ink rounded-2xl p-8 sm:p-10 shadow-lg"
              >
                <div className="max-w-lg mx-auto text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Donner de la profondeur à cette analyse
                  </h3>
                  <p className="text-white/60 text-sm mb-6">
                    {analysis?.prochaineEtape || 'Échangeons 30 minutes pour creuser ces hypothèses ensemble.'}
                  </p>

                  <div className="space-y-3">
                    <a
                      href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone"
                      target="_blank" rel="noopener noreferrer"
                      className="block w-full bg-mint-green hover:bg-mint-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                       Échanger sur mon diagnostic
                      </span>
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-4 text-white/30 text-xs">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Analyse confidentielle</span>
                    <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Généré par IA</span>
                  </div>
                </div>
              </motion.div>

              {/* Footer links */}
              <div className="text-center mt-6 space-y-2">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <button onClick={restart} className="hover:text-blue-ink transition-colors">Refaire le diagnostic</button>
                  <span className="text-gray-300">|</span>
                  <a href="/formation-commerciale-pme" className="hover:text-blue-ink transition-colors">Nos formations</a>
                  <span className="text-gray-300">|</span>
                  <a href="/bootcamp-commercial-intensif" className="hover:text-blue-ink transition-colors">Le bootcamp</a>
                </div>
                <p className="text-xs text-gray-300">
                  Analyse envoyée à {email}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
