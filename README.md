# Modernity — Vitrine Temporária

Landing page de apresentação da **Modernity — Joalheria & Relojoaria**, publicada
como GitHub Pages para demonstração ao cliente.

> **Isto é uma vitrine de apresentação, não um site de produção.** Existe para
> mostrar a proposta ao Diego Ribas (fundador e proprietário da Modernity) e
> deve sair do ar depois da decisão.

---

## Ver

O site é servido a partir da raiz deste repositório. Para rodar localmente:

```bash
python -m http.server 8080
# abra http://localhost:8080
```

O `file://` **não** funciona: service worker e `manifest` exigem HTTP.

## Publicar (GitHub Pages)

`Settings → Pages → Source: Deploy from a branch → Branch: main / (root)`

Não há build. `.nojekyll` garante que o GitHub sirva os arquivos como estão.

---

## Comportamento de aplicativo

`manifest.webmanifest` + `sw.js` fazem a página abrir em tela cheia quando
instalada.

- **Android/Chrome** — convite de instalação aparece sozinho após ~2,6s.
- **iOS/Safari** — não existe instalação programática; o Safari só instala por
  *Compartilhar → Adicionar à Tela de Início*. Por isso o iPhone recebe uma
  **instrução**, não um botão. Prometer um clique e não entregar seria pior que
  não oferecer.

O service worker guarda os estáticos (cache-first) e busca o HTML pela rede
primeiro — assim uma correção chega ao cliente sem ele precisar limpar cache.
Para invalidar tudo, troque `VERSAO` em `sw.js`.

---

## O que foi feito a partir do original

O arquivo de origem (`originais/landing-test-modernity-k3.html`) veio de um
sandbox de geração e trazia quatro problemas.

| # | Problema | Correção |
|---|---|---|
| 1 | **Dois documentos HTML aninhados** — um invólucro `lang="en"` de preview envolvendo o documento real `lang="pt-BR"`. O navegador resolvia `en`: a página inteira em português declarava-se inglesa (dano de SEO e de leitor de tela). | Invólucro **desembrulhado**, não remendado. `lang="pt-BR"` verificado no DOM. |
| 2 | **Modal de carregamento de mídia** — três seletores de arquivo e uma cadeia de tentativas (id de anexo → nome local → escolha manual), porque a página rodava solta e não sabia onde os arquivos estariam. | Num repositório o problema não existe: os assets vivem junto, em caminho relativo. Modal, seletores e fallback **removidos** — ~130 linhas a menos. |
| 3 | **Placeholders vivos** — `wa.me/55SEUNUMERO` e `contato@modernity.com`. | Contatos reais em todos os pontos. |
| 4 | **Ícone genérico de telefone** no lugar da marca do WhatsApp. | Silhueta **oficial** — balão com cauda inferior-esquerda e fone — no mesmo traço da casa (`viewBox` 24, `fill:none`, `stroke-width:1.5`). |

### Mídia

Os originais estão preservados em `originais/` e **nunca** foram sobrescritos.

| Item | Antes | Depois | Como |
|---|---|---|---|
| Vídeo | 4,18 MB | **3,68 MB** | Áudio removido (a página o exibe mudo) e `+faststart`, **sem reencodar** (`-c copy`) — zero perda de imagem |
| Pôster | — | **37 KB** | Primeiro quadro; o herói aparece instantâneo enquanto o vídeo carrega |
| Logo | 70,5 KB | **22,5 KB** | WebP, com PNG de reserva via `<picture>` |
| Foto | 92,5 KB | **60,8 KB** | WebP, com JPEG de reserva |

O `faststart` move o índice do MP4 para o início do arquivo: sem ele, o
navegador precisa baixar o vídeo inteiro antes do primeiro quadro.

### Decisão acoplada, registrada

O vídeo tinha uma faixa de áudio de ~500 KB e a página tinha um **botão de som**.
Como o áudio foi removido, esse botão viraria um controle que não faz nada — e
controle morto mente para quem clica. **Ele foi removido junto.** Se o som for
desejado, basta restaurar o áudio a partir de `originais/` e o botão volta.

---

## Catálogo de peças

A seção **Peças** exibe o acervo real da Modernity, lido de
`catalogo/catalogo.json` — um **artefato derivado**, exportado pelo Modernity
Studio. O Studio é a fonte única; aqui nada se edita. Ver `catalogo/README.md`.

**Uma peça por largura no telefone.** Em duas colunas de 170px a joia vira
miniatura, e miniatura não vende alta joalheria.

**A transição de imagem, e o problema do toque.** O pedido era hover no desktop
com equivalente intuitivo no mobile. Hover não existe no telefone, e trocar a
imagem sozinha roubaria o controle de quem olha — então o toque **avança** a
imagem, com pontos mostrando quantas há. Avançar em vez de alternar deixa todos
os ângulos alcançáveis, não só o segundo.

A segunda imagem deveria ser a **gerada** — a que floreia. Nenhuma das 9 peças
tem uma ainda, então a segunda posição recua para a perspectiva e a transição
continua existindo. Sem esse recuo, o recurso seria invisível no catálogo
inteiro.

**O WhatsApp leva a peça no texto.** Sem isso a Modernity recebe "olá" e não
sabe do que a pessoa está falando — e quem escreveu tem que explicar de novo.

**A seção some sozinha** se o catálogo não carregar. Sem `catalogo.json`, ou
aberta em `file://` (onde `fetch` não funciona), a vitrine continua de pé.

> **"Coleções" não foi substituída.** As duas seções fazem trabalhos diferentes:
> Coleções seduz, com três caminhos de desejo; o catálogo mostra a peça, com
> código, composição e preço. E Coleções foi aprovada pelo Diego — trocar o que
> ele aprovou sem perguntar seria decidir no lugar dele.

---

## Não indexado — de propósito

`robots.txt` e `<meta name="robots" content="noindex, nofollow">`.

O repositório é **público por exigência técnica** — GitHub Pages não publica de
repositório privado em conta gratuita. Mas a marca do cliente não deve aparecer
em busca antes da aprovação dele. O link funciona para quem o recebe; o Google
não indexa.

---

## Pendências conhecidas

- **Tipografia miúda:** a menor fonte da página é **9,28 px**. Abaixo do
  confortável para leitura em telefone. Não foi alterada porque mexer no design
  não estava no escopo desta correção — fica registrado para decisão.
- **Resolução do vídeo:** 848×478 é baixo para um herói de tela cheia. Melhorar
  exige refilmagem ou outra fonte, não pós-processamento.
- **Paleta divergente:** esta landing usa ouro `#c4a574`; o *Modernity Studio*
  (projeto irmão) usa `#eab308`. Duas superfícies da mesma marca com paletas
  diferentes é dívida de identidade, a resolver quando a marca for unificada.

---

*Rabelus Lab · 2026*
