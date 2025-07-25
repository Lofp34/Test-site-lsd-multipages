import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface CategoryBreadcrumbProps {
  items: BreadcrumbItem[];
  relatedCategories?: {
    title: string;
    href: string;
    icon: string;
    description: string;
  }[];
  className?: string;
}

export default function CategoryBreadcrumb({ 
  items, 
  relatedCategories = [], 
  className = "" 
}: CategoryBreadcrumbProps) {
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