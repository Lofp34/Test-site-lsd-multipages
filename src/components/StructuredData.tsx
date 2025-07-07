import React from 'react';

interface StructuredDataProps {
  type: 'person' | 'organization' | 'service' | 'course' | 'breadcrumb';
  data?: any;
  pagePath?: string;
}

export default function StructuredData({ type, data, pagePath }: StructuredDataProps) {
  const getSchemaData = () => {
    switch (type) {
      case 'person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Laurent Serre",
          "jobTitle": "Expert Développement Commercial PME",
          "description": "Expert en développement commercial spécialisé PME avec 20 ans d'expérience. Formation commerciale, coaching et transformation digitale.",
          "url": "https://laurentserre.com",
          "image": "https://laurentserre.com/images/laurent-serre-expert-commercial.jpg",
          "email": "contact@laurentserre.com",
          "telephone": "+33 6 XX XX XX XX",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Montpellier",
            "addressRegion": "Occitanie",
            "addressCountry": "FR"
          },
          "worksFor": {
            "@type": "Organization",
            "name": "Laurent Serre Développement"
          },
          "knowsAbout": [
            "Développement commercial PME",
            "Formation commerciale",
            "Coaching commercial",
            "Transformation commerciale",
            "Prospection B2B",
            "Gestion grands comptes"
          ],
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Consultant en développement commercial",
            "occupationLocation": {
              "@type": "City",
              "name": "Montpellier"
            }
          },
          "sameAs": [
            "https://www.linkedin.com/in/laurent-serre-commercial",
            "https://twitter.com/laurentserre_dev"
          ]
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Laurent Serre Développement",
          "description": "Cabinet de conseil spécialisé en développement commercial pour PME. Formation, coaching et transformation commerciale.",
          "url": "https://laurentserre.com",
          "logo": "https://laurentserre.com/images/logo-laurent-serre.png",
          "image": "https://laurentserre.com/images/laurent-serre-expert-commercial.jpg",
          "email": "contact@laurentserre.com",
          "telephone": "+33 6 XX XX XX XX",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Montpellier",
            "addressRegion": "Occitanie",
            "addressCountry": "FR"
          },
          "foundingDate": "2015",
          "founder": {
            "@type": "Person",
            "name": "Laurent Serre"
          },
          "areaServed": [
            "France",
            "Europe"
          ],
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "43.6047",
              "longitude": "3.8772"
            },
            "geoRadius": "500000"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services Développement Commercial PME",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Formation commerciale PME",
                  "description": "Formations spécialisées pour équipes commerciales PME"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Coaching commercial entreprise",
                  "description": "Accompagnement personnalisé des commerciaux"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Transformation commerciale",
                  "description": "Accompagnement transformation et digitalisation"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "ratingCount": "127"
          }
        };

      case 'service':
        const serviceName = data?.name || 'Service développement commercial';
        const serviceDescription = data?.description || 'Service de développement commercial pour PME';
        const servicePrice = data?.price || 'Sur devis';
        
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": serviceName,
          "description": serviceDescription,
          "provider": {
            "@type": "Organization",
            "name": "Laurent Serre Développement",
            "url": "https://laurentserre.com"
          },
          "serviceType": "Conseil en développement commercial",
          "areaServed": [
            "France",
            "Europe"
          ],
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "PME"
          },
          "offers": {
            "@type": "Offer",
            "description": serviceDescription,
            "price": servicePrice,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString().split('T')[0]
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Prestations développement commercial",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Diagnostic commercial",
                  "description": "Analyse complète des processus commerciaux"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Formation équipe",
                  "description": "Formation sur-mesure des équipes commerciales"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "Accompagnement terrain",
                  "description": "Coaching opérationnel sur le terrain"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5", 
            "ratingCount": "89"
          }
        };

      case 'course':
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": data?.name || "Formation commerciale PME",
          "description": data?.description || "Formation spécialisée pour équipes commerciales PME",
          "provider": {
            "@type": "Organization",
            "name": "Laurent Serre Développement",
            "url": "https://laurentserre.com"
          },
          "instructor": {
            "@type": "Person",
            "name": "Laurent Serre",
            "jobTitle": "Expert développement commercial PME"
          },
          "courseMode": [
            "Présentiel",
            "En ligne",
            "Blended"
          ],
          "educationalLevel": "Professionnel",
          "audience": {
            "@type": "EducationalAudience", 
            "audienceType": "Commerciaux PME"
          },
          "teaches": [
            "Techniques de prospection",
            "Négociation commerciale", 
            "Gestion de la relation client",
            "Closing et finalisation"
          ],
          "timeRequired": "PT14H",
          "coursePrerequisites": "Expérience commerciale souhaitée",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "ratingCount": "156"
          }
        };

      case 'breadcrumb':
        const breadcrumbData = data || [];
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbData.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://laurentserre.com${item.url}`
          }))
        };

      default:
        return null;
    }
  };

  const schemaData = getSchemaData();
  
  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  );
}