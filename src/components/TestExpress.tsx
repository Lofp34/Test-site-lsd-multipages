'use client';

import { useState } from 'react';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';

const TestExpress = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Placeholder questions - à remplacer par les vraies questions de l'utilisateur
  const questions = [
    {
      question: "Question 1 - À définir par l'utilisateur",
      options: ["Réponse A", "Réponse B", "Réponse C"]
    },
    {
      question: "Question 2 - À définir par l'utilisateur", 
      options: ["Réponse A", "Réponse B", "Réponse C"]
    },
    {
      question: "Question 3 - À définir par l'utilisateur",
      options: ["Réponse A", "Réponse B", "Réponse C"]
    },
    {
      question: "Question 4 - À définir par l'utilisateur",
      options: ["Réponse A", "Réponse B", "Réponse C"]
    },
    {
      question: "Question 5 - À définir par l'utilisateur",
      options: ["Réponse A", "Réponse B", "Réponse C"]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8 border border-mint-green/20">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-mint-green mx-auto mb-6" />
          <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
            Test Express Terminé !
          </h3>
          <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
            Merci d'avoir répondu à notre test express. Pour un diagnostic complet et personnalisé, 
            réservez votre diagnostic gratuit de 30 minutes avec Laurent Serre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Diagnostic Complet Gratuit
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <button onClick={resetTest} className="inline-flex items-center border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Refaire le Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg">
          Test Express Commercial
        </h3>
        <div className="text-sm text-gray-500">
          {currentQuestion + 1} / {questions.length}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-mint-green h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <h4 className="text-lg font-semibold text-blue-ink dark:text-primary-bg mb-4">
          {questions[currentQuestion].question}
        </h4>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-mint-green hover:bg-mint-green/5 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Test rapide • Résultat immédiat • Suivi par diagnostic complet gratuit
        </p>
      </div>
    </div>
  );
};

export default TestExpress;