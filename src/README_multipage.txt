Patch multipage — Studio Bruna Ferraz (paths ajustados para seu src/)

Rotas:
  /            -> Home
  /sobre       -> Sobre
  /equipe      -> Equipe
  /promocao    -> Promocao (mapeada da sua seção views/IndexSections/promocao.js)
  /contato     -> Contato
  *            -> 404

O que foi adicionado (sem sobrescrever seus arquivos):
  - components/layout/Layout.js        (Navbar + Footer fixos em todas as rotas)
  - components/ScrollToTop.js          (novo utilitário)
  - App.multipage.js                   (rotas com React Router v6)
  - pages/Home.js, Sobre.js, Equipe.js, Promocao.js, Contato.js, NotFound.js
  - main_multipage.js                  (entrypoint alternativo com BrowserRouter)

Como usar:
  1) Opção rápida: renomeie App.multipage.js -> App.js e use seu index atual.
  2) Ou troque seu entry para main_multipage.js.
  3) Confirme que os aliases/resoluções de import permitem "components/..." e "views/...".
     Se não usar alias, troque por caminhos relativos (ex.: ../../components/...).
