# Operação do catálogo público

Este catálogo só recebe peças exportadas pelo Studio após confirmação vinculada a
`projectId`, revisão, ator, hash do payload e expiração.
Preço e estoque ausentes permanecem “sob consulta”; não são preenchidos por
seed, inferência ou cópia de exemplo.

O Studio pode gerar um pacote `ambiente: teste` privado (`indexable: false`) ou
`ambiente: teste-publico` para validar a integração na superfície pública. O
segundo usa confirmação `catalog.publish.test.public`, libera robots/canonical/
sitemap e é explicitamente `development-public-no-stock-no-price-invention`:
não é curadoria comercial, não contém estoque ou preço inventado e não inclui os
blobs históricos em quarentena. Produção continua exigindo allowlist anunciada,
revisão e modo comercial `release`.

Cada publicação deve gerar manifesto, validar mídia, canonical, robots e
sitemap antes de liberar indexação. Peças arquivadas ou blobs sem vínculo
semântico não são curadoria.
