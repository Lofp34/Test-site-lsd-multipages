import Link from 'next/link';

interface ContextualCTA {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'accent';
  category?: string;
}

interface ContextualCTAsProps {
  ctas: ContextualCTA[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ContextualCTAs({ 
  ctas, 
  title = "Passez à l'action", 
  subtitle,
  className = "" 
}: ContextualCTAsProps) {
  if (ctas.length === 0) return null;

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return {
          container: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-300/30',
          badge: 'bg-blue-500/30 text-blue-300',
          title: 'text-blue-ink dark:text-blue-300',
          button: 'bg-blue-500 text-white hover:bg-blue-600'
        };
      case 'secondary':
        return {
          container: 'bg-gradient-to-r from-mint-green/20 to-blue-ink/20 border-mint-green/30',
          badge: 'bg-mint-green/30 text-mint-green',
          title: 'text-blue-ink dark:text-mint-green',
          button: 'bg-mint-green text-blue-ink hover:bg-mint-green/90'
        };
      case 'accent':
        return {
          container: 'bg-gradient-to-r from-orange-soft/20 to-yellow-400/20 border-orange-soft/30',
          badge: 'bg-orange-soft/30 text-orange-soft',
          title: 'text-blue-ink dark:text-orange-soft',
          button: 'bg-orange-soft text-white hover:bg-orange-soft/90'
        };
      default:
        return {
          container: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-300/30',
          badge: 'bg-blue-500/30 text-blue-300',
          title: 'text-blue-ink dark:text-blue-300',
          button: 'bg-blue-500 text-white hover:bg-blue-600'
        };
    }
  };

  return (
    <section className={`max-w-4xl mx-auto px-6 mb-12 ${className}`}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-ink dark:text-blue-300 mb-4">
            🚀 {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className={`grid ${ctas.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
        {ctas.map((cta, index) => {
          const styles = getVariantStyles(cta.variant);
          
          return (
            <div 
              key={index}
              className={`${styles.container} rounded-2xl shadow-xl p-8 text-center border backdrop-blur-sm`}
            >
              <div className={`inline-block ${styles.badge} font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur`}>
                {cta.icon} {cta.category || 'Action'}
              </div>
              <h3 className={`text-2xl font-bold ${styles.title} mb-4`}>
                {cta.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                {cta.description}
              </p>
              <Link 
                href={cta.buttonLink}
                className={`inline-block ${styles.button} font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
              >
                {cta.buttonText}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}