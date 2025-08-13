import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("que o usuario esta na pagina de {string}", (pagina: string) => {
  // Aqui você pode usar a variável 'pagina' para navegar
  // mas como você quer ir direto para /atracoes, mantém fixo
  cy.visit("/atracoes");
});

When("o usuario seleciona {string}", (nomeAtracao: string) => {
  cy.contains(nomeAtracao).click();
});

Then("o usuario e movido para página {string}", (nomeAtracao: string) => {
  cy.url().should("include", `/atracoes/${encodeURIComponent(nomeAtracao)}`);
  cy.contains(nomeAtracao).should("be.visible");
});
