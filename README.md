# QA Playwright: SauceDemo
Suíte E2E em TypeScript com Page Object Model, rodando em desktop e mobile.

**Cobertura:** login (válido, bloqueado, senha errada, campos vazios), carrinho e checkout (fluxo feliz e validação).

```bash
npm install && npx playwright install
npm test          # roda tudo
npm run report    # abre o relatório HTML
```
Alvo: https://www.saucedemo.com (site público para prática de QA).

**Próximos passos:** adicionar GitHub Actions, testes de ordenação de produtos e fixtures de usuário.

## CI/CD
O workflow `.github/workflows/playwright.yml` roda os testes em cada push e PR, guarda o relatório como artifact e publica o HTML no GitHub Pages (ative em *Settings → Pages → Source: GitHub Actions*).
