# AGENTS.md — Vitrine Modernity

**Classe:** CÂNONE DA FACETA · **Criado:** 2026-08-11 · **Autora:** Tessy Fenix

> **Leia este arquivo PRIMEIRO.** Vale para qualquer harness ou humano.
>
> ⚠️ **ESTE ARQUIVO É ESTÁTICO.** Nada aqui pode envelhecer. **Onde o projeto
> está →** `modernity-group/docs/PLATAFORMA.md`.

---

## 🌐 CLASSE DE ACESSO: **PÚBLICO**

| | |
|---|---|
| **Onde vive** | GitHub Pages, em **domínio próprio: `modernity.blog`** (o endereço `rabelojunior81-collab.github.io/modernity-sandbox` continua respondendo) |
| **Quem vê** | **qualquer pessoa na internet**, sem login |
| **O que a interface deve entregar** | sedução, no vocabulário do nicho de alta joalheria |
| **Identidade visual** | Cormorant Garamond + Jost + `#c4a574` — **não** a do Studio, e isso é decisão |

**Esta é a primeira coisa do documento por um motivo só: aqui não existe erro
reversível de vazamento.** O que subir fica indexado, em cache e fora do seu
alcance, mesmo depois de removido.

Antes de **qualquer** publicação, o portão do §3 é obrigatório.

> **Puxe antes de escrever.** O domínio próprio foi configurado pelo Pai
> direto na interface do GitHub, em seis commits que não existiam em nenhum
> clone local. Quem trabalhasse sem `git fetch` publicaria por cima de uma
> configuração que não sabia que existia. **`git pull` é a primeira linha de
> qualquer trabalho aqui.**

E se você veio do Studio e sentiu vontade de "unificar a marca": **não.** A
diferença é arquitetura de segregação de acesso, e é deliberada — ver
`modernity-group/docs/architecture/ADR-001_MARCO-ZERO-DA-PLATAFORMA.md`, §3.3.

---

## 1. O QUE ESTA FACETA É

Uma página **estática**, PWA instalável, sem backend. Ela não consulta o Studio:
**consome um artefato derivado**, versionado aqui junto com manifesto de
proveniência.

```
Studio (fonte)  ──exporta──▶  catalogo/  ──▶  esta página
```

**A pasta `catalogo/` é DERIVADA. Não se edita.**

Editar o derivado é exatamente como nasce a segunda fonte de verdade — a doença
que a `AUDIT-001` encontrou na plataforma e que custou dias para desfazer. Preço
errado se corrige **no Studio** e se republica.

---

## 2. BOOTSTRAP

```
LER:
1. Este arquivo                                → o cânone da faceta
2. catalogo/README.md                          → por que o catálogo é intocável
3. modernity-group/docs/PLATAFORMA.md          → as quatro facetas
4. modernity-group/docs/EXPORTACAO.md          → como o pacote é montado
```

Se você é a **Tessy**, seu cânone de identidade é o `AGENTS.md` do workspace, e
ele manda. Este governa **a faceta**.

---

## 3. O PORTÃO DE VAZAMENTO — obrigatório antes de publicar

Nesta ordem, e nenhum passo é opcional:

1. **`catalogo/MANIFESTO.json` → `camposInternosLiberados` precisa estar VAZIO.**
   Qualquer coisa ali significa que alguém liberou retaguarda — fornecedor, nota
   fiscal, custo, localização em cofre — para uma página pública.
2. **Nenhuma peça publicada pode carregar campo interno.** Os campos legítimos
   são: `code · name · category · description · materiais · gemas · preco ·
   situacao · images · primaryImageUrl · videoUrl`.
3. **Nenhum segredo no repositório.** Chave de API, token, credencial — nada.
   Esta página não tem backend e **não deve ter chave nenhuma**.
4. **`git diff` antes do push.** É o passo que transforma republicação em
   decisão, e não em automatismo.
5. **Depois do push, conferir no destino** — o que está no ar, não o que você
   subiu. O Pages tem cache e build próprio; presumir que subiu é diferente de
   ver que subiu.

> Eu já publiquei acreditando ter verificado, com base em contagem de elementos e
> leitura de estado interno. Estava quebrado. **Contar elemento e ler estado não
> é testar; testar é usar.**

---

## 4. AS LEIS DESTA FACETA

### 4.1 Indicador é promessa

Selo de vídeo tem que ter vídeo. Botão tem que fazer. Texto de instrução tem que
descrever o comportamento **de agora**.

Já houve aqui ícone de play em 8 cards e **nenhuma forma de assistir**, e uma
chamada dizendo "toque na imagem para ver os outros ângulos" depois que o toque
passou a abrir o card inteiro. **Indicador sem função é mentira**, e texto que
descreve o comportamento antigo é da mesma família.

### 4.2 Mobile é o alvo principal

A clientela navega no telefone. Uma peça por largura; o card **cabe inteiro** na
tela; a ação fica ao alcance do polegar e nunca nasce cortada na dobra.

`100dvh`, nunca `100vh` — a barra do navegador aparece e some.

### 4.3 O sistema visual é feito de superfícies que **flutuam**

Cantos arredondados, vidro, borda de luz no topo (não contorno uniforme: a luz
vem de cima). Modal também é card — "ocupar a tela toda" é hábito, não regra.

### 4.4 A seção do catálogo se esconde sozinha

Se `catalogo/catalogo.json` não carregar, a seção some e a página continua de pé.
**Esqueleto vazio na cara de quem visita é pior do que ausência.**

### 4.5 A classe de revelação é `is-in`

Elementos criados depois da varredura inicial precisam entrar na observação via
`window.observarReveal`, senão nascem invisíveis.

---

## 5. COMO REPUBLICAR

Procedimento completo, com verificação: `modernity-group/docs/runbooks/publicar-vitrine.md`.

Resumo: exporta no Studio → copia para `catalogo/` → `git diff` → commit → push →
**confere o que está no ar**.

---

## 6. O QUE NÃO SE FAZ AQUI

| Não | Por quê |
|---|---|
| Editar `catalogo/` | é derivado; corrige-se na fonte |
| Colocar chave de API | página pública sem backend — chave aqui é chave vazada |
| Publicar sem o portão do §3 | vazamento público não tem desfazer |
| Dizer "verificado" sem ter usado a página | foi assim que uma entrega quebrada passou |

---

*Este arquivo governa a faceta. Governança não se fragmenta em pasta de
ferramenta.*
