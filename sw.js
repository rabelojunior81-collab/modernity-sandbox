/*
 * Service worker — a segunda visita abre instantânea.
 *
 * Estratégia: cache-first para os assets pesados (vídeo, imagens, ícones), que
 * de fato não mudam; network-first para o HTML e para o CATÁLOGO.
 *
 * ═══ DEFEITO CORRIGIDO EM 2026-08-12 ═══
 *
 * A versão anterior tratava `catalogo/` como asset estático: cache-first, sem
 * revalidação. O efeito era o oposto de tudo o que o Studio garante.
 *
 * O acervo retirou 9 peças da vitrine, o servidor passou a devolver um catálogo
 * VAZIO e as fotos a dar 404 — e quem já tinha visitado o site continuava vendo
 * as nove, indefinidamente, servidas do próprio navegador. O Pai viu isso antes
 * de mim: *"CONTINUA COM AS MERDAS DAS 9 PEÇAS"*.
 *
 * `catalogo/` NÃO é asset: é DADO, e dado que muda por decisão de curadoria.
 * Peça retirada da vitrine cuja foto o navegador continua servindo não foi
 * retirada — e uma peça vendida continuar aparecendo para o cliente é o pior
 * desfecho possível desta página.
 *
 * Trocar `VERSAO` invalida tudo — e ela sobe agora, para despejar o que já
 * está cacheado nos navegadores que visitaram antes desta correção.
 */
const VERSAO = 'modernity-v2';
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

  /*
   * REDE PRIMEIRO para o HTML **e para o catálogo**.
   *
   * O catálogo entra aqui porque ele é o que muda: preço, disponibilidade, e
   * sobretudo QUAIS peças existem. Servir isso do cache transforma a curadoria
   * numa sugestão que o navegador do visitante pode ignorar.
   *
   * O cache continua como rede de segurança para quem estiver offline — mas só
   * depois que a rede falhar, nunca antes dela.
   */
  const ehCatalogo = url.pathname.includes('/catalogo/');
  if (req.mode === 'navigate' || req.destination === 'document' || ehCatalogo) {
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
