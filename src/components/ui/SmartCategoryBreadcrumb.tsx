import Link from 'next/link';
import { categoryBreadcrumbSuggestions, generateIntelligentRecommendations } from '@/utils/cross-category-suggestions';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface SmartCategoryBreadcrumbProps {
  items: BreadcrumbItem[];
  currentCategory: string;
  userProfile?: 'Commercial' | 'Manager' | 'Dirigeant' | 'SDR';
  showIntelligentRecommendations?: boolean;
  className?: string;
}

export default function SmartCategoryBreadcrumb({ 
  items, 
  currentCategory,
  userProfile,
  showIntelligentRecommendations = false,
  className = "" 
}: SmartCategoryBreadcrumbProps) {
  const relatedCategories = categoryBreadcrumbSuggestions[currentCategory] || [];
  const intelligentRecommendations = showIntelligentRecommendations 
    ? generateIntelligentRecommendations(currentCategory, userProfile)
    : [];

  return (
    <nav className={`max-w-6xl mx-auto px-4 mb-8 ${className}`}>
      {/* Breadcrumb navigation */}
      <div className="flex items-center space-x-2 text-sm mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="text-gray-400 mx-2">→</span>
            )}
            {item.current ? (
              <span className="text-blue-ink font-semibold">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Intelligent Recommendations (if enabled) */}
      {showIntelligentRecommendations && intelligentRecommendations.length > 0 && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200/30">
            <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Recommandations Métier Personnalisées
              {userProfile && (
                <span className="ml-2 text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {userProfile}
                </span>
              )}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {intelligentRecommendations.map((rec, index) => (
                <Link
                  key={index}
                  href={`/ressources/meilleurs-livres/${rec.targetCategory}`}
                  className="group flex items-start p-4 bg-white/70 rounded-lg border border-green-200/30 hover:border-green-400/50 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-ink group-hover:text-green-600 transition-colors text-sm mb-2">
                      {rec.targetCategoryTitle}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {rec.complementarityReason}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      💼 {rec.businessValue}
                    </p>
                  </div>
                  <span className="text-green-500 opacity-70 group-hover:opacity-100 transition-opacity ml-2">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related categories */}
      {relatedCategories.length > 0 && (
        <div className="bg-white/70 rounded-xl shadow-lg p-6 border border-blue-200/30 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-blue-ink mb-4">
            📚 Autres catégories qui pourraient vous intéresser
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCategories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group flex items-start p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-md"
              >
                <span className="text-2xl mr-3 flex-shrink-0">{category.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-blue-ink group-hover:text-blue-500 transition-colors text-sm">
                    {category.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
                <span className="text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity ml-2">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}