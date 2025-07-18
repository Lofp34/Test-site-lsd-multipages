import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Fonction pour traiter le contenu Markdown
  const processMarkdown = (text: string): JSX.Element[] => {
    // Diviser le texte en paragraphes
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      // Traiter le texte gras **texte**
      const processedText = paragraph.split(/(\*\*[^*]+\*\*)/).map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return <strong key={partIndex} className="font-semibold text-primary-title">{boldText}</strong>;
        }
        
        // Traiter les sauts de ligne simples \n
        const lines = part.split('\n');
        return lines.map((line, lineIndex) => (
          <React.Fragment key={`${partIndex}-${lineIndex}`}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        ));
      });
      
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {processedText}
        </p>
      );
    });
  };

  return (
    <div className={className}>
      {processMarkdown(content)}
    </div>
  );
}