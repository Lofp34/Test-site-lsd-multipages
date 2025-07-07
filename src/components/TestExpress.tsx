'use client';

import { useState } from 'react';
import Button from "@/components/ui/Button";

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

const TestExpress = () => {
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
        description: "Votre équipe est bien structurée. Des optimisations fines et l'intégration d'outils modernes peuvent vous faire passer au niveau supérieur.",
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
      <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 shadow-xl border border-mint-green/20">
        {/* Résultats */}
        <div className="text-center">
          <div className="text-6xl mb-6">{recommendation.emoji}</div>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-ink dark:text-primary-bg mb-4">
            {recommendation.title}
          </h3>
          <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-6 leading-relaxed">
            {recommendation.description}
          </p>
          
          <div className="inline-block bg-mint-green/10 border-2 border-mint-green rounded-full px-6 py-2 mb-8">
            <span className="font-bold text-mint-green">
              Niveau : {recommendation.level}
            </span>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-anthracite/30 rounded-xl p-4 text-center border hover:border-mint-green/50 transition-all duration-300">
              <div className="text-2xl mb-2">🤐</div>
              <h4 className="font-bold text-blue-ink dark:text-primary-bg mb-2 text-sm">
                Je garde le résultat pour moi
              </h4>
              <p className="text-gray-anthracite dark:text-primary-bg/80 text-xs">
                Diagnostic personnel sauvegardé
              </p>
            </div>

            <div className="bg-mint-green/10 border-2 border-mint-green rounded-xl p-4 text-center hover:bg-mint-green/20 transition-all duration-300">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-bold text-blue-ink dark:text-primary-bg mb-2 text-sm">
                Je veux aller plus loin
              </h4>
              <p className="text-gray-anthracite dark:text-primary-bg/80 text-xs mb-3">
                Discutons de vos défis
              </p>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => window.open('https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone', '_blank')}
              >
                Prendre rendez-vous
              </Button>
            </div>
          </div>

          {/* Refaire le test */}
          <div className="text-center">
            <button 
              onClick={resetDiagnostic}
              className="text-gray-anthracite dark:text-primary-bg/70 hover:text-mint-green underline text-sm"
            >
              Refaire le test express
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 shadow-xl border border-mint-green/20">
      <div className="text-center mb-6">
        <div className="text-3xl mb-4">⚡</div>
        <h3 className="text-2xl font-bold text-blue-ink dark:text-primary-bg mb-2">
          Test Express • 5 Questions
        </h3>
        <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm mb-4">
          Évaluez votre maturité commerciale en 2 minutes
        </p>
        
        {/* CTA Psychologique */}
        <p className="text-xs text-gray-anthracite dark:text-primary-bg/80 italic">
          Votre situation est unique ? Allons droit au but.{" "}
          <a 
            href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold text-blue-ink dark:text-white border-b border-mint-green hover:bg-mint-green/10 transition pb-1"
          >
            Échangeons 15 minutes pour un diagnostic sur-mesure.
          </a>
        </p>
      </div>

      {/* Progression */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-anthracite dark:text-primary-bg/70">
            Question {currentQuestion + 1} sur {questions.length}
          </span>
          <span className="font-bold text-mint-green text-sm">
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

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg md:text-xl font-bold text-blue-ink dark:text-primary-bg mb-6 leading-relaxed">
          {questions[currentQuestion].text}
        </h4>

        {/* Réponses */}
        <div className="space-y-3">
          {questions[currentQuestion].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer.points)}
              className="w-full text-left p-4 bg-gray-50 dark:bg-blue-ink/20 rounded-xl border-2 border-transparent hover:border-mint-green hover:bg-mint-green/5 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-mint-green/20 rounded-full flex items-center justify-center group-hover:bg-mint-green/40 transition-colors">
                  <span className="font-bold text-mint-green text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span className="text-gray-anthracite dark:text-primary-bg group-hover:text-blue-ink dark:group-hover:text-mint-green">
                  {answer.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestExpress;