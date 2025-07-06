'use client';

import { useState } from 'react';
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Question {
  id: number;
  text: string;
  answers: {
    text: string;
    points: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Comment qualifieriez-vous la stratégie commerciale de votre équipe ?",
    answers: [
      { text: "Nous n'avons pas de stratégie définie", points: 1 },
      { text: "Nous avons quelques processus en place", points: 2 },
      { text: "Nous avons une stratégie claire et documentée", points: 3 },
      { text: "Notre stratégie est optimisée et régulièrement mise à jour", points: 4 }
    ]
  },
  {
    id: 2,
    text: "Vos commerciaux suivent-ils un processus de vente structuré ?",
    answers: [
      { text: "Chacun fait comme il veut", points: 1 },
      { text: "Nous avons des étapes de base", points: 2 },
      { text: "Oui, avec un processus clair et suivi", points: 3 },
      { text: "Processus optimisé avec mesure de performance", points: 4 }
    ]
  },
  {
    id: 3,
    text: "Comment mesurez-vous la performance de votre équipe commerciale ?",
    answers: [
      { text: "Uniquement par le CA réalisé", points: 1 },
      { text: "CA + quelques indicateurs basiques", points: 2 },
      { text: "Tableau de bord avec KPIs pertinents", points: 3 },
      { text: "Analytics avancées et prédictives", points: 4 }
    ]
  },
  {
    id: 4,
    text: "Votre équipe commerciale reçoit-elle une formation régulière ?",
    answers: [
      { text: "Aucune formation spécifique", points: 1 },
      { text: "Formation ponctuelle quand nécessaire", points: 2 },
      { text: "Programme de formation structuré", points: 3 },
      { text: "Formation continue et coaching personnalisé", points: 4 }
    ]
  },
  {
    id: 5,
    text: "Utilisez-vous des outils numériques pour optimiser vos ventes ?",
    answers: [
      { text: "Uniquement email et téléphone", points: 1 },
      { text: "CRM basique", points: 2 },
      { text: "CRM + outils de prospection", points: 3 },
      { text: "Suite complète avec IA et automatisation", points: 4 }
    ]
  }
];

export default function DiagnosticSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getRecommendation = (score: number) => {
    if (score <= 8) {
      return {
        level: "Débutant",
        color: "orange-soft",
        title: "Structuration nécessaire",
        description: "Votre équipe commerciale manque de structure. Il est temps de poser des bases solides pour optimiser vos performances.",
        emoji: "🚀"
      };
    } else if (score <= 12) {
      return {
        level: "Intermédiaire",
        color: "mint-green",
        title: "Bonne base à optimiser",
        description: "Vous avez de bonnes fondations. Quelques ajustements stratégiques peuvent considérablement améliorer vos résultats.",
        emoji: "📈"
      };
    } else if (score <= 16) {
      return {
        level: "Avancé",
        color: "blue-ink",
        title: "Performance à maximiser",
        description: "Votre équipe est bien structurée. Des optimisations fines et l&apos;intégration d&apos;outils modernes peuvent vous faire passer au niveau supérieur.",
        emoji: "🎯"
      };
    } else {
      return {
        level: "Expert",
        color: "mint-green",
        title: "Excellence commerciale",
        description: "Félicitations ! Votre maturité commerciale est excellente. Maintenez cette dynamique et inspirez-vous des meilleures pratiques.",
        emoji: "🏆"
      };
    }
  };

  const resetDiagnostic = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const score = calculateScore();
  const recommendation = getRecommendation(score);

  if (showResults) {
    return (
      <section id="diagnostic" className="py-20 bg-primary-bg dark:bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Titre */}
          <AnimatedSection animation="slide-up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight mb-4">
                Diagnostic commercial
                <span className="block text-mint-green">gratuit</span>
              </h2>
              <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
                Évaluez votre maturité commerciale en 2 minutes et découvrez vos opportunités d&apos;amélioration
              </p>
            </div>
          </AnimatedSection>

          {/* Résultats */}
          <AnimatedSection animation="slide-up" delay={200}>
            <div className="bg-white/90 dark:bg-gray-anthracite/40 rounded-3xl p-8 shadow-xl text-center">
              <div className="text-6xl mb-6">{recommendation.emoji}</div>
              <h3 className="text-2xl md:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                {recommendation.title}
              </h3>
              <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg/80 mb-6 leading-relaxed">
                {recommendation.description}
              </p>
              
              <div className="inline-block bg-mint-green/10 border-2 border-mint-green rounded-full px-6 py-2 mb-6">
                <span className="font-title font-bold text-mint-green">
                  Niveau : {recommendation.level}
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Actions */}
          <AnimatedSection animation="fade-in" delay={400}>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/80 dark:bg-gray-anthracite/30 rounded-2xl p-6 text-center border-2 border-transparent hover:border-mint-green/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-4">🤐</div>
                <h3 className="font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                  Je garde le résultat pour moi
                </h3>
                <p className="font-body text-gray-anthracite dark:text-primary-bg/80 text-sm">
                  Vous pouvez sauvegarder ce diagnostic pour votre usage personnel
                </p>
              </div>

              <div className="bg-mint-green/10 border-2 border-mint-green rounded-2xl p-6 text-center hover:bg-mint-green/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                  Je veux aller plus loin
                </h3>
                <p className="font-body text-gray-anthracite dark:text-primary-bg/80 text-sm mb-4">
                  Discutons de vos défis et opportunités
                </p>
                <Button variant="primary" size="sm">
                  Prendre rendez-vous
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Refaire le test */}
          <AnimatedSection animation="fade-in" delay={600}>
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetDiagnostic}
                className="font-italic text-gray-anthracite dark:text-primary-bg/70 hover:text-mint-green underline"
              >
                Refaire le diagnostic
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section id="diagnostic" className="py-20 bg-primary-bg dark:bg-blue-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Titre */}
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight mb-4">
              Diagnostic commercial
              <span className="block text-mint-green">gratuit</span>
            </h2>
            <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
              Évaluez votre maturité commerciale en 2 minutes et découvrez vos opportunités d&apos;amélioration
            </p>
          </div>
        </AnimatedSection>

        {!showResults ? (
          <>
            {/* Progression */}
            <AnimatedSection animation="fade-in" delay={200}>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-sm text-gray-anthracite dark:text-primary-bg/70">
                    Question {currentQuestion + 1} sur {questions.length}
                  </span>
                  <span className="font-title font-bold text-mint-green">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-mint-green h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* CTA Psychologique */}
            <div className="text-center mb-8 px-4">
              <p className="text-sm font-body text-gray-anthracite dark:text-primary-bg/80 italic">
                Votre situation est unique ? Allons droit au but.{" "}
                <a 
                  href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-blue-ink dark:text-white border-b-2 border-mint-green hover:bg-mint-green/10 transition pb-1"
                >
                  Échangeons 15 minutes pour un diagnostic sur-mesure.
                </a>
              </p>
            </div>

            {/* Question */}
            <AnimatedSection animation="slide-up" delay={400}>
              <div className="bg-white/90 dark:bg-gray-anthracite/40 rounded-3xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 leading-relaxed">
                  {questions[currentQuestion].text}
                </h3>

                {/* Réponses */}
                <div className="space-y-4">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(answer.points)}
                      className="w-full text-left p-4 bg-primary-bg dark:bg-blue-ink/50 rounded-xl border-2 border-transparent hover:border-mint-green hover:bg-mint-green/5 transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-mint-green/20 rounded-full flex items-center justify-center group-hover:bg-mint-green/40 transition-colors">
                          <span className="font-title font-bold text-mint-green">
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <span className="font-body text-lg text-gray-anthracite dark:text-primary-bg group-hover:text-blue-ink dark:group-hover:text-mint-green">
                          {answer.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </>
        ) : (
          <>
            {/* Résultats */}
            <AnimatedSection animation="slide-up" delay={200}>
              <div className="bg-white/90 dark:bg-gray-anthracite/40 rounded-3xl p-8 shadow-xl text-center">
                <div className="text-6xl mb-6">{recommendation.emoji}</div>
                <h3 className="text-2xl md:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                  {recommendation.title}
                </h3>
                <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg/80 mb-6 leading-relaxed">
                  {recommendation.description}
                </p>
                
                <div className="inline-block bg-mint-green/10 border-2 border-mint-green rounded-full px-6 py-2 mb-6">
                  <span className="font-title font-bold text-mint-green">
                    Niveau : {recommendation.level}
                  </span>
                </div>
              </div>
            </AnimatedSection>

            {/* Actions */}
            <AnimatedSection animation="fade-in" delay={400}>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/80 dark:bg-gray-anthracite/30 rounded-2xl p-6 text-center border-2 border-transparent hover:border-mint-green/50 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl mb-4">🤐</div>
                  <h3 className="font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                    Je garde le résultat pour moi
                  </h3>
                  <p className="font-body text-gray-anthracite dark:text-primary-bg/80 text-sm">
                    Vous pouvez sauvegarder ce diagnostic pour votre usage personnel
                  </p>
                </div>

                <div className="bg-mint-green/10 border-2 border-mint-green rounded-2xl p-6 text-center hover:bg-mint-green/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                    Je veux aller plus loin
                  </h3>
                  <p className="font-body text-gray-anthracite dark:text-primary-bg/80 text-sm mb-4">
                    Discutons de vos défis et opportunités
                  </p>
                  <Button variant="primary" size="sm">
                    Prendre rendez-vous
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Refaire le test */}
            <AnimatedSection animation="fade-in" delay={600}>
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={resetDiagnostic}
                  className="font-italic text-gray-anthracite dark:text-primary-bg/70 hover:text-mint-green underline"
                >
                  Refaire le diagnostic
                </Button>
              </div>
            </AnimatedSection>
          </>
        )}
      </div>
    </section>
  );
} 