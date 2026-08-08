# Catálogo — artefato DERIVADO

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

No Studio: **aba Acervo → Exportar catálogo**. Escolha o destino `vitrine`,
confira a prévia, exporte. Depois, no host:

```bash
cp modernity-group/data/exportacao/vitrine-<selo>/catalogo.json   modernity-sandbox/catalogo/
cp modernity-group/data/exportacao/vitrine-<selo>/MANIFESTO.json  modernity-sandbox/catalogo/
cp modernity-group/data/exportacao/vitrine-<selo>/media/*         modernity-sandbox/catalogo/media/
```

Depois disso, **`git diff` antes de publicar**. É o passo que transforma
republicação em decisão, e não em automatismo.

## Se algo aqui não existir

A seção de catálogo **se esconde sozinha** e a vitrine continua de pé. Esqueleto
vazio na cara de quem visita é pior do que ausência.

---

*Como o artefato é montado: `modernity-group/docs/EXPORTACAO.md`.*
