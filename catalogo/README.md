# Catálogo — artefato DERIVADO

> ## 📭 Hoje esta pasta está VAZIA de propósito
>
> `catalogo.json` tem **zero peças**, e isso **não é defeito**.
>
> As 9 peças que estavam no ar viraram
> [arqueologia](../../modernity-group/docs/archaeology/acervo-jewelry-001-009/)
> em 2026-08-12: o acervo passou a ser capturado em micro-estúdio próprio
> (GemCam), e manter dois acervos vivos com padrões diferentes de captura seria
> a segunda fonte de verdade outra vez.
>
> O lote novo — 20 peças, 80 ativos — está **inteiro por curar**, porque a
> planilha veio com preços fora de escala e quem decide preço é o Pai.
> Onde exatamente paramos: `modernity-group/docs/RETOMADA.md`.
>
> **A vitrine no ar mostra a verdade: nenhuma peça.** Mostrar peça que não está
> mais no acervo seria mais bonito e seria mentira.

**Não edite nada nesta pasta.**

O conteúdo aqui é gerado pelo **Modernity Studio** e copiado para cá. O Studio é
a fonte única; isto é um derivado, regenerável.

Editar o derivado é exatamente como nasce a segunda fonte de verdade — a doença
que a `AUDIT-001` encontrou neste projeto e que custou dias para desfazer. Se um
preço está errado, corrija **no Studio** e republique.

---

## O que tem aqui

| Arquivo | O quê |
|---|---|
| `catalogo.json` | manifesto + peças projetadas |
| `MANIFESTO.json` | proveniência: quando, de onde, sob que recorte |
| `media/` | as fotos e vídeos, copiados |

O `MANIFESTO.json` responde a pergunta que sempre volta: *este catálogo está
desatualizado, ou aquele campo foi omitido de propósito?*

Vale olhar `camposInternosLiberados`: ele **precisa estar vazio** numa
exportação para a vitrine. Se tiver qualquer coisa, alguém liberou retaguarda —
fornecedor, nota fiscal, localização do cofre — para uma página pública.

## Como republicar

No Studio: **Console de Gestão → Publicação**. Escolha o destino `vitrine`,
confira a prévia, exporte. A exportação **escreve direto nesta pasta** — o
contêiner a enxerga montada — e **apaga as mídias órfãs**: peça retirada da
vitrine tem que sair de verdade, não continuar acessível por URL direta.

Escrever aqui **não publica**. Publicar é:

```bash
git -C modernity-sandbox diff --stat && git -C modernity-sandbox add -A && git -C modernity-sandbox commit && git -C modernity-sandbox push
```

O `git diff` antes do push é o passo que transforma republicação em decisão, e
não em automatismo. Não há git dentro do contêiner de propósito: pôr coisa na
internet não pode ser efeito colateral de um clique.

## Se algo aqui não existir

A seção de catálogo **se esconde sozinha** — e, junto com ela, o item **"Peças"
do menu**, nos dois menus. Esqueleto vazio na cara de quem visita é pior do que
ausência; e item de menu que não leva a lugar nenhum é mentira na porta de
entrada. Some junto, aparece junto.

---

*Como o artefato é montado: `modernity-group/docs/EXPORTACAO.md`.*
