import React from 'react';

interface MistakeAlertProps {
  mistake: string;
  consequence: string;
  solution: string;
  className?: string;
}

const MistakeAlert: React.FC<MistakeAlertProps> = ({
  mistake,
  consequence,
  solution,
  className = ''
}) => {
  return (
    <div className={`
      bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg 
      border-l-4 border-red-500 p-6 
      hover:shadow-xl transition-all duration-300
      ${className}
    `}>
      {/* Warning header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">⚠️</span>
        </div>
        <h3 className="text-lg font-bold text-red-600">
          Piège à éviter
        </h3>
      </div>

      {/* Mistake */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-red-500">❌</span>
          Erreur courante
        </h4>
        <p className="text-gray-700 bg-red-50 p-3 rounded-lg border border-red-200">
          {mistake}
        </p>
      </div>

      {/* Consequence */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-orange-500">⚡</span>
          Conséquence
        </h4>
        <p className="text-gray-700 bg-orange-50 p-3 rounded-lg border border-orange-200">
          {consequence}
        </p>
      </div>

      {/* Solution */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-green-500">✅</span>
          Solution recommandée
        </h4>
        <p className="text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
          {solution}
        </p>
      </div>
    </div>
  );
};

export default MistakeAlert;