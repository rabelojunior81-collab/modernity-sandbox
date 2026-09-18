# Operação do catálogo público

Este catálogo só recebe peças exportadas pelo Studio após seleção editorial e
confirmação vinculada a `projectId`, revisão, ator, hash do payload e expiração.
Preço e estoque ausentes permanecem “sob consulta”; não são preenchidos por
seed, inferência ou cópia de exemplo.

O Studio pode gerar um pacote `ambiente: teste` para validar a integração com
todo o conjunto candidato. Esse pacote é desenvolvimento: `indexable: false`,
sem estoque/preço inventado e com confirmação `catalog.publish.test` vinculada
à revisão e ao hash do payload. Ele não libera robots, canonical, sitemap ou
indexação e não equivale a curadoria comercial. Só o pacote de produção com
allowlist e estoque real pode abrir o portão editorial.

Enquanto não houver allowlist aprovada, `catalogo.json` permanece vazio,
`robots.txt` e `noindex` protegem a superfície, e a ausência de sitemap é
intencional. Publicação segura deve gerar manifesto, validar mídia, canonical,
robots e sitemap, e só então liberar indexação. Peças arquivadas ou blobs sem
vínculo semântico não são curadoria.
