'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  questions,
  categories,
  getBadgeStars,
  getBadgeLabel,
  personas,
  getComparisonText,
  getCategoryMaxScore,
  getRecommendations,
  getCelebration,
  type CategoryId,
  type CategoryResult,
  type DiagnosticResult,
  type Question,
  type QuestionType,
} from '@/data/diagnostic-commercial-data';

// ============================================================
// TYPES
// ============================================================
type Step = 'home' | 'quiz' | 'transition' | 'results' | 'unlocked';

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionId → points
  categoryResults: CategoryResult[];
  showTransition: boolean;
}

// ============================================================
// MAIN ENGINE
// ============================================================
export default function DiagnosticEngine() {
  const [step, setStep] = useState<Step>('home');
  const [answerHistory, setAnswerHistory] = useState<number[]>([]); // questionIds answered
  const [score, setScore] = useState<Record<number, number>>({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [transitionData, setTransitionData] = useState<{
    categoryResult: CategoryResult;
    categoryIndex: number;
  } | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [captureEmail, setCaptureEmail] = useState('');
  const [captureFirstName, setCaptureFirstName] = useState('');
  const [captureLastName, setCaptureLastName] = useState('');
  const [captureCompany, setCaptureCompany] = useState('');
  const [captureSubmitting, setCaptureSubmitting] = useState(false);
  const [captureDone, setCaptureDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showingConfetti, setShowingConfetti] = useState(false);
  const [visitorCount] = useState(() => Math.floor(Math.random() * 151) + 150); // 150-300
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Computed
  const currentQuestion: Question | undefined = questions[currentQIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQIndex) / totalQuestions) * 100;
  const currentCategory = currentQuestion
    ? categories.find(c => c.id === currentQuestion.category)
    : null;

  // Progress text
  const getProgressText = () => {
    const q = currentQuestionIndex + 1;
    if (q === 1) return 'C\'est parti →';
    if (q <= 5) return 'Vous êtes au chaud 🔥';
    if (q === 10) return 'Mi-parcours ! Vous gérez 💪';
    if (q <= 15) return 'Dernière ligne droite ⚡';
    if (q <= 18) return 'Presque fini… 🏁';
    return 'Calcul de votre profil… 🔮';
  };

  const currentQuestionIndex = currentQIndex;

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Handle answer
  const handleAnswer = (points: number) => {
    if (!currentQuestion) return;

    const newAnswers = { ...score, [currentQuestion.id]: points };
    const newAnswered = [...answeredQuestions, currentQuestion.id];
    setScore(newAnswers);
    setAnsweredQuestions(newAnswered);

    // Check if we just completed a category
    const cat = categories.find(c => c.id === currentQuestion.category);
    if (cat) {
      const catQuestions = cat.questions;
      const catAnswered = catQuestions.filter(qId => newAnswered.includes(qId));
      
      if (catAnswered.length === catQuestions.length) {
        // Category completed — calculate score
        const catScore = catQuestions.reduce((sum, qId) => sum + (newAnswers[qId] || 0), 0);
        const maxScore = getCategoryMaxScore(cat.id);
        const percentage = Math.round((catScore / maxScore) * 100);
        const stars = getBadgeStars(percentage);

        const categoryResult: CategoryResult = {
          categoryId: cat.id,
          score: catScore,
          maxScore,
          percentage,
          stars,
        };

        // Find the next category index
        const catIndex = categories.findIndex(c => c.id === cat.id);
        const nextCatIndex = catIndex + 1;

        if (nextCatIndex < categories.length) {
          // Show transition
          setTransitionData({ categoryResult, categoryIndex: nextCatIndex });
          setStep('transition');
          timerRef.current = setTimeout(() => {
            setTransitionData(null);
            setStep('quiz');
            setCurrentQIndex(currentQIndex + 1);
          }, 2000);
        } else {
          // All questions done — calculate final results
          calculateResults(newAnswers);
        }
      } else {
        // Next question
        setCurrentQIndex(currentQIndex + 1);
      }
    }
  };

  // Calculate final results
  const calculateResults = useCallback((answers: Record<number, number>) => {
    setIsCalculating(true);

    setTimeout(() => {
      const categoryResults: CategoryResult[] = categories.map(cat => {
        const catScore = cat.questions.reduce((sum, qId) => sum + (answers[qId] || 0), 0);
        const maxScore = getCategoryMaxScore(cat.id);
        const percentage = Math.round((catScore / maxScore) * 100);
        const stars = getBadgeStars(percentage);
        return { categoryId: cat.id, score: catScore, maxScore, percentage, stars };
      });

      const totalScore = categoryResults.reduce((sum, cr) => sum + cr.score, 0);
      const totalMaxScore = categories.reduce((sum, cat) => sum + getCategoryMaxScore(cat.id), 0);
      const totalPercentage = Math.round((totalScore / totalMaxScore) * 100);

      const persona = personas.find(
        p => totalPercentage >= p.minScore && totalPercentage <= p.maxScore
      ) || personas[4];

      setResult({
        totalScore,
        maxScore: totalMaxScore,
        percentage: totalPercentage,
        persona,
        categories: categoryResults,
        comparisonText: getComparisonText(totalPercentage),
      });

      setIsCalculating(false);
      setStep('results');
    }, 2200); // Simulation suspense
  }, []);

  // Submit lead capture to HubSpot
  const handleLeadSubmit = async () => {
    if (!captureEmail || !captureFirstName || !captureLastName || !captureCompany) return;
    setCaptureSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/hubspot/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: captureFirstName,
          lastName: captureLastName,
          email: captureEmail,
          company: captureCompany,
          message: `Diagnostic Commercial 360° terminé — Score: ${result?.totalScore}/${result?.maxScore} — Persona: ${result?.persona.name}
Catégories: ${result?.categories.map(c => `${c.categoryId}: ${c.score}/${c.maxScore}`).join(', ')}`,
          formType: 'Diagnostic Commercial 360°',
        }),
      });

      if (response.ok) {
        setCaptureDone(true);
        setStep('unlocked');
        setShowingConfetti(true);
        setTimeout(() => setShowingConfetti(false), 3000);
      } else {
        const data = await response.json();
        // Even on error, unlock the content
        setCaptureDone(true);
        setStep('unlocked');
      }
    } catch {
      setSubmitError('Erreur réseau. Mais votre rapport est débloqué !');
      setCaptureDone(true);
      setStep('unlocked');
    } finally {
      setCaptureSubmitting(false);
    }
  };

  // Restart
  const handleRestart = () => {
    setStep('home');
    setAnswerHistory([]);
    setScore({});
    setCurrentQIndex(0);
    setAnsweredQuestions([]);
    setResult(null);
    setTransitionData(null);
    setCaptureDone(false);
    setCaptureEmail('');
    setCaptureFirstName('');
    setCaptureLastName('');
    setCaptureCompany('');
    setSubmitError(null);
    setShowingConfetti(false);
  };

  // ============================================================
  // RENDER: HOME SCREEN
  // ============================================================
  if (step === 'home') {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-mint-green rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-soft rounded-full blur-3xl opacity-50" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Micro-engagement counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-green" />
                </span>
                <span className="text-white/80 text-sm font-medium">
                  Déjà <span className="text-mint-green font-bold">{visitorCount}</span> diagnostics réalisés cette semaine
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Diagnostic Commercial <span className="text-mint-green">360°</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                20 questions, 5 minutes, 1 score. Pas de théorie. Juste la vérité sur votre organisation commerciale.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('quiz')}
                className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-mint-green/25 group"
              >
                <span>▶ Commencer le diagnostic</span>
                <motion.span
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-2xl mx-auto"
              >
                {categories.map(cat => (
                  <div key={cat.id} className="text-center">
                    <div className="text-2xl mb-1">{cat.emoji}</div>
                    <div className="text-white/60 text-xs font-medium">{cat.name.split(' ')[0]}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-8 text-white/50 text-sm"
              >
                <span className="inline-flex items-center gap-1">🔒 Aucun email requis pour commencer</span>
                <span className="mx-3">·</span>
                <span className="inline-flex items-center gap-1">⏱️ 5 minutes chrono</span>
                <span className="mx-3">·</span>
                <span className="inline-flex items-center gap-1">📱 Mobile friendly</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Features preview */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl">🎯</div>
              <h3 className="font-bold text-blue-ink">5 axes analysés</h3>
              <p className="text-sm text-gray-600">Prospection, processus, équipe, performance, stratégie</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">🏆</div>
              <h3 className="font-bold text-blue-ink">Persona & badges</h3>
              <p className="text-sm text-gray-600">Un profil unique avec des badges de compétence</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">📋</div>
              <h3 className="font-bold text-blue-ink">Plan d'action</h3>
              <p className="text-sm text-gray-600">Recommandations personnalisées à débloquer</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER: TRANSITION BETWEEN CATEGORIES
  // ============================================================
  if (step === 'transition' && transitionData) {
    const celebration = getCelebration(transitionData.categoryResult);
    const cat = categories.find(c => c.id === transitionData.categoryResult.categoryId)!;
    const nextCat = categories[transitionData.categoryIndex];
    const starArray = [1, 2, 3];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-ink to-blue-ink/95 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center max-w-md"
        >
          {/* Badge unlock animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-7xl mb-6"
          >
            {cat.emoji}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-white mb-2"
          >
            {cat.badgeName}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-mint-green font-medium mb-4"
          >
            {cat.name}
          </motion.p>

          {/* Stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-2 mb-4"
          >
            {starArray.map(s => (
              <motion.span
                key={s}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: s <= transitionData.categoryResult.stars ? 1 : 0.6,
                  opacity: 1,
                }}
                transition={{ delay: 0.6 + s * 0.15, type: 'spring' }}
                className={`text-4xl ${s <= transitionData.categoryResult.stars ? '' : 'opacity-30'}`}
              >
                ⭐
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/70 text-sm mb-1"
          >
            Niveau <span className="font-bold text-mint-green">{getBadgeLabel(transitionData.categoryResult.percentage)}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/50 text-xs"
          >
            {celebration.message}
          </motion.p>

          {/* Next category preview */}
          {nextCat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <p className="text-white/40 text-xs mb-2">Prochaine catégorie</p>
              <p className="text-white font-medium">
                {nextCat.emoji} {nextCat.name}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // RENDER: CALCULATING
  // ============================================================
  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-ink to-blue-ink/95 flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="text-6xl mb-6"
          >
            🔮
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-white mb-4"
          >
            Analyse de vos réponses…
          </motion.h2>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                className="w-3 h-3 bg-mint-green rounded-full"
              />
            ))}
          </div>
          <p className="text-white/50 text-sm mt-6 max-w-xs mx-auto">
            Nous comparons vos résultats aux benchmarks des PME françaises…
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER: QUIZ
  // ============================================================
  if (step === 'quiz' && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Header with progress */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            {/* Category label */}
            {currentCategory && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-ink">
                  {currentCategory.emoji} {currentCategory.name}
                  <span className="text-gray-400 font-normal">
                    {' '}— question {answeredQuestions.filter(qId => {
                      const q = questions.find(q => q.id === qId);
                      return q?.category === currentQuestion.category;
                    }).length + 1}/{currentCategory.questions.length}
                  </span>
                </span>
                <span className="text-xs text-gray-400">
                  {currentQIndex + 1}/{totalQuestions}
                </span>
              </div>
            )}

            {/* Dynamic progress bar */}
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mint-green to-blue-ink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/* Progress text */}
            <motion.p
              key={currentQIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-gray-400 mt-2 text-right"
            >
              {getProgressText()}
            </motion.p>
          </div>
        </div>

        {/* Question area */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER: RESULTS
  // ============================================================
  if (step === 'results' && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Persona header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              className="text-7xl mb-4"
            >
              {result.persona.emoji}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-blue-ink mb-2"
            >
              Vous êtes : {result.persona.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-gray-600 max-w-xl mx-auto"
            >
              {result.persona.description}
            </motion.p>
          </motion.div>

          {/* Score & Radar grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Score gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-center"
            >
              <ScoreGauge percentage={result.percentage} />
              <p className="text-gray-500 text-sm mt-4">
                Score global : <span className="font-bold text-blue-ink">{result.totalScore}</span>/{result.maxScore}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {result.comparisonText}
              </p>
            </motion.div>

            {/* Radar chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-sm font-semibold text-blue-ink mb-4 text-center">
                Analyse par axe
              </h3>
              <RadarChart categories={result.categories} />
            </motion.div>
          </div>

          {/* Badges collection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-bold text-blue-ink mb-6 text-center">
              🏅 Vos badges
            </h3>
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              {result.categories.map(catResult => {
                const cat = categories.find(c => c.id === catResult.categoryId)!;
                return (
                  <div key={cat.id} className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1 + categories.indexOf(cat) * 0.15, type: 'spring' }}
                      className={`text-3xl sm:text-4xl mb-1 ${catResult.stars < 1 ? 'opacity-30 grayscale' : ''}`}
                    >
                      {cat.emoji}
                    </motion.div>
                    <div className="text-xs mb-1">
                      {[1, 2, 3].map(s => (
                        <span key={s} className={s <= catResult.stars ? '' : 'opacity-20'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] text-gray-500 leading-tight">
                      {cat.badgeName}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA to unlock report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            {!captureDone ? (
              <div className="bg-gradient-to-br from-blue-ink to-blue-ink/90 rounded-2xl p-8 sm:p-10 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-3">
                  📋 Débloquez votre plan d'action personnalisé
                </h3>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Recevez votre rapport complet avec recommandations, plan 30 jours et analyse détaillée.
                </p>

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                    <p className="text-red-300 text-sm">{submitError}</p>
                  </div>
                )}

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleLeadSubmit();
                  }}
                  className="max-w-sm mx-auto space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Prénom"
                      required
                      value={captureFirstName}
                      onChange={e => setCaptureFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green"
                    />
                    <input
                      type="text"
                      placeholder="Nom"
                      required
                      value={captureLastName}
                      onChange={e => setCaptureLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email professionnel"
                    required
                    value={captureEmail}
                    onChange={e => setCaptureEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green"
                  />
                  <input
                    type="text"
                    placeholder="Entreprise"
                    required
                    value={captureCompany}
                    onChange={e => setCaptureCompany(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green"
                  />
                  <button
                    type="submit"
                    disabled={captureSubmitting}
                    className="w-full bg-mint-green hover:bg-mint-green/90 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    {captureSubmitting ? 'Déblocage en cours…' : '👉 Recevoir mon rapport complet'}
                  </button>
                </form>

                <p className="text-white/40 text-xs mt-4">
                  🔒 Vos données sont confidentielles — jamais transmises à des tiers
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                <button
                  onClick={() => setStep('unlocked')}
                  className="bg-mint-green hover:bg-mint-green/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
                >
                  📖 Voir mon rapport complet →
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER: UNLOCKED REPORT
  // ============================================================
  if (step === 'unlocked' && result) {
    const recommendations = getRecommendations(result.categories);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Confetti overlay */}
        {showingConfetti && <ConfettiOverlay />}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Recap header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="text-5xl mb-3">{result.persona.emoji}</div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-blue-ink mb-2"
            >
              Votre rapport {result.persona.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500"
            >
              Score {result.totalScore}/{result.maxScore} — {result.persona.description}
            </motion.p>
          </motion.div>

          {/* Urgency banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-center"
          >
            <p className="text-amber-800 text-sm font-medium">
              ⏰ Ce rapport personnalisé a été généré spécialement pour vous. Il expirera dans 48h.
            </p>
          </motion.div>

          {/* Persona challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl p-6 sm:p-8 border border-blue-ink/10 mb-8"
          >
            <h3 className="text-lg font-bold text-blue-ink mb-3">
              🎯 Votre défi prioritaire
            </h3>
            <p className="text-gray-700">{result.persona.challenge}</p>
          </motion.div>

          {/* Plan d'action 30 jours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold text-blue-ink mb-6 flex items-center gap-2">
              <span>📋</span> Plan d'action 30 jours
            </h3>

            <div className="space-y-4">
              {recommendations.map((rec, index) => {
                const cat = categories.find(c => c.id === rec.category)!;
                const levelColors: Record<string, string> = {
                  urgent: 'border-red-300 bg-red-50',
                  amelioration: 'border-orange-300 bg-orange-50',
                  consolidation: 'border-blue-300 bg-blue-50',
                  excellent: 'border-mint-green/30 bg-mint-green/5',
                };
                const levelLabels: Record<string, string> = {
                  urgent: '🔴 Prioritaire',
                  amelioration: '🟡 À améliorer',
                  consolidation: '🔵 À consolider',
                  excellent: '✅ En bonne voie',
                };

                return (
                  <div
                    key={rec.category}
                    className={`rounded-xl border p-5 ${levelColors[rec.level]}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-lg mr-2">{cat.emoji}</span>
                        <span className="font-bold text-blue-ink">{cat.name}</span>
                        <div className="text-sm text-gray-500 mt-0.5">
                          Score : {rec.score}/{rec.maxScore}
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        rec.level === 'urgent' ? 'bg-red-200 text-red-800' :
                        rec.level === 'amelioration' ? 'bg-orange-200 text-orange-800' :
                        rec.level === 'consolidation' ? 'bg-blue-200 text-blue-800' :
                        'bg-mint-green/20 text-blue-ink'
                      }`}>
                        {levelLabels[rec.level]}
                      </span>
                    </div>
                    <p className="font-medium text-sm mb-2">{rec.title}</p>
                    <ul className="space-y-1">
                      {rec.actions.map((action, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-mint-green mt-0.5">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-4"
          >
            {/* Main CTA: book a call */}
            <motion.a
              href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all"
            >
              🗓️ Discuter de mon diagnostic avec Laurent
            </motion.a>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleRestart}
                className="text-sm text-gray-500 hover:text-blue-ink underline transition-colors"
              >
                Refaire le diagnostic
              </button>
              <a
                href="/formation-commerciale-pme"
                className="text-sm text-gray-500 hover:text-blue-ink underline transition-colors"
              >
                Découvrir les formations
              </a>
              <a
                href="/bootcamp-commercial-intensif"
                className="text-sm text-gray-500 hover:text-blue-ink underline transition-colors"
              >
                Le bootcamp commercial
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Fallback
  return null;
}

// ============================================================
// QUESTION CARD
// ============================================================
function QuestionCard({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (points: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-blue-ink mb-8 leading-relaxed">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(answer.points)}
            className="w-full text-left p-4 sm:p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-mint-green hover:bg-mint-green/5 transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <div className="flex items-center gap-4">
              {answer.emoji && (
                <span className="text-xl flex-shrink-0">{answer.emoji}</span>
              )}
              <span className="flex-1 text-gray-700 group-hover:text-blue-ink font-medium">
                {answer.text}
              </span>
              <span className="text-gray-300 group-hover:text-mint-green text-sm">
                {String.fromCharCode(65 + index)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// SCORE GAUGE (SVG circle)
// ============================================================
function ScoreGauge({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 80 ? '#00BDA4' : percentage >= 60 ? '#1a365d' : percentage >= 40 ? '#FF6B35' : '#ef4444';

  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <motion.circle
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="text-center"
        >
          <span className="text-3xl sm:text-4xl font-bold text-blue-ink">
            {percentage}
          </span>
          <span className="text-gray-400 text-lg">/100</span>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================
// RADAR CHART (SVG)
// ============================================================
function RadarChart({ categories: catResults }: { categories: CategoryResult[] }) {
  const size = 220;
  const center = size / 2;
  const radius = 80;
  const levels = 4;
  const angleStep = (2 * Math.PI) / catResults.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = catResults
    .map((cat, i) => {
      const p = getPoint(i, cat.percentage);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  // Draw radar lines and levels
  const gridLines = [];
  for (let level = 1; level <= levels; level++) {
    const r = (radius * level) / levels;
    const points = catResults
      .map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
      })
      .join(' ');
    gridLines.push(
      <polygon
        key={`grid-${level}`}
        points={points}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  }

  // Axis lines
  const axes = catResults.map((_, i) => {
    const angle = angleStep * i - Math.PI / 2;
    return (
      <line
        key={`axis-${i}`}
        x1={center}
        y1={center}
        x2={center + radius * Math.cos(angle)}
        y2={center + radius * Math.sin(angle)}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gridLines}
        {axes}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(0, 189, 164, 0.15)"
          stroke="#00BDA4"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Data points */}
        {catResults.map((cat, i) => {
          const p = getPoint(i, cat.percentage);
          return (
            <motion.circle
              key={cat.categoryId}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#00BDA4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          );
        })}

        {/* Labels */}
        {catResults.map((cat, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const labelRadius = radius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          const catInfo = categories.find(c => c.id === cat.categoryId);
          return (
            <text
              key={cat.categoryId}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px]"
              fill="#6b7280"
            >
              {catInfo?.emoji} {catInfo?.name.split(' ')[0]}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-5 gap-2 mt-2 w-full">
        {catResults.map(cr => {
          const catInfo = categories.find(c => c.id === cr.categoryId)!;
          return (
            <div key={cr.categoryId} className="text-center">
              <div className="text-xs font-semibold text-blue-ink">{cr.percentage}%</div>
              <div className="text-[9px] text-gray-400">{cr.score}/{cr.maxScore}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// CONFETTI OVERLAY (simple CSS confetti)
// ============================================================
function ConfettiOverlay() {
  const confetti = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 2,
    color: ['#00BDA4', '#FF6B35', '#1a365d', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map(c => (
        <motion.div
          key={c.id}
          className="absolute rounded-sm"
          style={{
            left: `${c.left}%`,
            top: -10,
            width: c.size,
            height: c.size * 0.6,
            backgroundColor: c.color,
            borderRadius: 2,
          }}
          animate={{
            y: [0, window.innerHeight + 50],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
