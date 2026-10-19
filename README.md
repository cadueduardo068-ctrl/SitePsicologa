# Letícia Jabbour · Psicologia

Site demonstrativo em React, Vite, TypeScript e Motion. Composição editorial original, fontes locais e ilustrações botânicas em SVG/CSS; nenhuma imagem representa a profissional ou seu consultório. CSS próprio mantém a identidade visual sem acrescentar um framework de estilos.

## Desenvolvimento

Node.js 22.12+ (validado com 24.19), npm 11.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

O build estático é gerado em `dist`. Não exige servidor de aplicação, banco, credenciais ou variáveis de ambiente. Não coleta dados nem instala analytics. Links de contato abrem o WhatsApp, serviço externo sujeito à sua própria política de privacidade.

## Testes

```sh
npm test
```

O ambiente utiliza Chromium em `/usr/bin/chromium`. Em outra máquina, instale um navegador e defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` com o caminho do executável.

Os testes verificam quatro larguras, menu mobile, FAQ, WhatsApp, ausência de overflow, navegação por teclado, preferência de movimento reduzido e erros de JavaScript. Lighthouse não faz parte destes testes.

## Cloudflare Pages

Conecte o repositório, selecione `main` quando essa branch existir e configure:

- Comando de build: `npm run build`
- Diretório de saída: `dist`
- Node.js: `24` (`NODE_VERSION` nas configurações do build)
- Diretório raiz: a raiz deste projeto.

O arquivo `public/_headers` configura CSP, restrições de permissões e proteção contra indexação. O site é uma página única com navegação por âncoras e não requer roteador ou backend.

## Antes da publicação definitiva

Esta demonstração pode ser hospedada para apresentação, mas permanece com `noindex, nofollow` em HTML e cabeçalhos e `Disallow: /` no robots.txt. Isso é uma orientação a buscadores, não controle de acesso.

1. Obter aprovação da profissional e confirmar nome de divulgação, CRP, formação, abordagem, serviços, modalidades, públicos atendidos e endereço.
2. Revisar os textos demonstrativos, a conformidade da publicidade profissional e o número de contato informado pelo solicitante.
3. Substituir os espaços reservados por fotografias reais autorizadas e otimizar os arquivos. Identificar imagens meramente ilustrativas.
4. Definir domínio HTTPS confirmado. Configure `SITE_ORIGIN=https://dominio-confirmado` no build: o gerador cria `dist/sitemap.xml`; sem domínio, o sitemap fica vazio, sem URLs inventadas.
5. Adicionar URL canônica, `og:url` e imagem social autorizada. Dados estruturados profissionais devem ser adicionados apenas com CRP, endereço e demais dados efetivamente verificados.
6. Após aprovação, remover as diretivas de não indexação de `index.html` e `public/_headers`, permitir rastreamento em `public/robots.txt` e incluir nele a URL real do sitemap.
7. Validar em dispositivos reais e executar Lighthouse na hospedagem final. Nenhuma pontuação Lighthouse foi presumida.

## Organização

- `src/main.tsx`: componentes, conteúdo, FAQ e animações.
- `src/styles.css`: identidade visual, composições e responsividade.
- `public/`: favicon, robots e cabeçalhos da Cloudflare.
- `scripts/sitemap.mjs`: sitemap sem domínio fictício.
- `tests/`: verificações funcionais de interface.
