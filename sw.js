/*
 * Service worker — a segunda visita abre instantânea.
 *
 * Estratégia deliberadamente simples, porque isto é uma VITRINE, não um
 * produto: cache-first para os assets pesados (vídeo, imagens, ícones), que
 * nunca mudam durante a apresentação; network-first para o HTML, para que uma
 * correção minha chegue ao Diego sem ele precisar limpar cache.
 *
 * Trocar `VERSAO` invalida tudo — é o único botão de despejo que existe aqui.
 */
const VERSAO = 'modernity-v1';
const ESTATICOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/hero-poster.jpg',
  './assets/logo-creme.webp',
  './assets/logo-creme.png',
  './assets/loja.webp',
  './assets/loja.jpg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
];

self.addEventListener('install', (evento) => {
  // O vídeo NÃO entra aqui de propósito: 3,7 MB travariam a instalação do
  // service worker e atrasariam a primeira pintura. Ele é cacheado sob demanda.
  evento.waitUntil(
    caches.open(VERSAO).then((c) => c.addAll(ESTATICOS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const req = evento.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // fontes do Google seguem o caminho normal

  // HTML: rede primeiro, cache como rede de segurança (offline / rede ruim).
  if (req.mode === 'navigate' || req.destination === 'document') {
    evento.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(VERSAO).then((c) => c.put(req, copia));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Demais assets: cache primeiro; o que faltar entra no cache ao ser buscado.
  evento.respondWith(
    caches.match(req).then((cacheado) => {
      if (cacheado) return cacheado;
      return fetch(req).then((res) => {
        // `Range` (vídeo) vem com status 206 e não pode ser guardado no Cache API.
        if (res.ok && res.status === 200) {
          const copia = res.clone();
          caches.open(VERSAO).then((c) => c.put(req, copia));
        }
        return res;
      });
    })
  );
});
