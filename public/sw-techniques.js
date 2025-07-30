// Service Worker pour l'optimisation du cache des techniques de négociation
// Gestion du cache des ressources, images et données

const CACHE_NAME = 'techniques-negociation-v1';
const STATIC_CACHE = 'static-resources-v1';
const IMAGE_CACHE = 'images-v1';
const DATA_CACHE = 'technique-data-v1';

// Ressources à mettre en cache immédiatement
const STATIC_RESOURCES = [
  '/',
  '/ressources/techniques-de-negociation',
  '/styles/negotiation/technique-themes.css',
  '/fonts/inter-400.woff2',
  '/fonts/inter-600.woff2',
  '/fonts/roboto-slab-400.woff2',
  '/fonts/open-sans-400.woff2'
];

// Stratégies de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Configuration des routes et leurs stratégies
const ROUTE_STRATEGIES = [
  {
    pattern: /^https:\/\/laurent-serre-developpement\.fr\/ressources\/techniques-de-negociation\/.+/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: CACHE_NAME
  },
  {
    pattern: /^https:\/\/laurent-serre-developpement\.fr\/images\/techniques\/.+\.(jpg|jpeg|png|webp|avif)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: IMAGE_CACHE
  },
  {
    pattern: /^https:\/\/laurent-serre-developpement\.fr\/api\/techniques\/.+/,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheName: DATA_CACHE
  },
  {
    pattern: /^https:\/\/laurent-serre-developpement\.fr\/.+\.(css|js|woff2)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: STATIC_CACHE
  }
];

/**
 * Installation du Service Worker
 */
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker for techniques');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('SW: Static resources cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('SW: Error caching static resources:', error);
      })
  );
});

/**
 * Activation du Service Worker
 */
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Supprimer les anciens caches
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== IMAGE_CACHE && 
                cacheName !== DATA_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SW: Service worker activated');
        return self.clients.claim();
      })
  );
});

/**
 * Interception des requêtes
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes vers des domaines externes (sauf fonts)
  if (url.origin !== location.origin && !url.hostname.includes('fonts.g')) {
    return;
  }
  
  // Trouver la stratégie appropriée
  const routeConfig = ROUTE_STRATEGIES.find(route => route.pattern.test(request.url));
  
  if (routeConfig) {
    event.respondWith(
      handleRequest(request, routeConfig.strategy, routeConfig.cacheName)
    );
  } else {
    // Stratégie par défaut pour les autres requêtes
    event.respondWith(
      handleRequest(request, CACHE_STRATEGIES.NETWORK_FIRST, CACHE_NAME)
    );
  }
});

/**
 * Gère une requête selon la stratégie spécifiée
 */
async function handleRequest(request, strategy, cacheName) {
  const cache = await caches.open(cacheName);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cache);
      
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cache);
      
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cache);
      
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return fetch(request);
      
    case CACHE_STRATEGIES.CACHE_ONLY:
      return cache.match(request);
      
    default:
      return networkFirst(request, cache);
  }
}

/**
 * Stratégie Cache First
 */
async function cacheFirst(request, cache) {
  try {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('SW: Serving from cache:', request.url);
      return cachedResponse;
    }
    
    console.log('SW: Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('SW: Cache first error:', error);
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Stratégie Network First
 */
async function networkFirst(request, cache) {
  try {
    console.log('SW: Trying network first:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Network failed, trying cache:', request.url);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    console.error('SW: Network first error:', error);
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Stratégie Stale While Revalidate
 */
async function staleWhileRevalidate(request, cache) {
  const cachedResponse = await cache.match(request);
  
  // Fetch en arrière-plan pour mettre à jour le cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.error('SW: Background fetch error:', error);
  });
  
  // Retourner immédiatement la version en cache si disponible
  if (cachedResponse) {
    console.log('SW: Serving stale content:', request.url);
    return cachedResponse;
  }
  
  // Sinon attendre la réponse réseau
  console.log('SW: No cache, waiting for network:', request.url);
  return fetchPromise;
}

/**
 * Gestion des messages du client
 */
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_STATS':
      getCacheStats().then((stats) => {
        event.ports[0].postMessage({ type: 'CACHE_STATS', payload: stats });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearSpecificCache(payload.cacheName).then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
      break;
      
    case 'PRELOAD_TECHNIQUE':
      preloadTechnique(payload.techniqueId).then(() => {
        event.ports[0].postMessage({ type: 'TECHNIQUE_PRELOADED' });
      });
      break;
  }
});

/**
 * Obtient les statistiques du cache
 */
async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    stats[cacheName] = {
      count: keys.length,
      urls: keys.map(request => request.url)
    };
  }
  
  return stats;
}

/**
 * Vide un cache spécifique
 */
async function clearSpecificCache(cacheName) {
  if (cacheName) {
    await caches.delete(cacheName);
    console.log('SW: Cache cleared:', cacheName);
  } else {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('SW: All caches cleared');
  }
}

/**
 * Précharge les ressources d'une technique
 */
async function preloadTechnique(techniqueId) {
  const cache = await caches.open(CACHE_NAME);
  const imageCache = await caches.open(IMAGE_CACHE);
  
  const resourcesToPreload = [
    `/ressources/techniques-de-negociation/${techniqueId}`,
    `/images/techniques/${techniqueId}/hero-${techniqueId}.webp`,
    `/images/techniques/${techniqueId}/og-${techniqueId}.jpg`,
    `/api/techniques/${techniqueId}`
  ];
  
  const preloadPromises = resourcesToPreload.map(async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const targetCache = url.includes('/images/') ? imageCache : cache;
        await targetCache.put(url, response);
        console.log('SW: Preloaded:', url);
      }
    } catch (error) {
      console.warn('SW: Failed to preload:', url, error);
    }
  });
  
  await Promise.all(preloadPromises);
  console.log('SW: Technique preloaded:', techniqueId);
}

/**
 * Nettoyage périodique du cache
 */
async function cleanupCache() {
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    // Supprimer les entrées anciennes (plus de 7 jours)
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    for (const request of requests) {
      const response = await cache.match(request);
      const dateHeader = response.headers.get('date');
      
      if (dateHeader) {
        const responseDate = new Date(dateHeader).getTime();
        if (responseDate < oneWeekAgo) {
          await cache.delete(request);
          console.log('SW: Cleaned up old cache entry:', request.url);
        }
      }
    }
  }
}

// Nettoyage périodique toutes les 24 heures
setInterval(cleanupCache, 24 * 60 * 60 * 1000);

console.log('SW: Techniques negotiation service worker loaded');