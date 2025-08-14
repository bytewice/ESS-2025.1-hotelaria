import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que o usuario esta na pagina de {string}', (pagina) => {
  cy.visit(`${pagina.toLowerCase()}`);
});

When('o usuario seleciona {string}', (atracao) => {
  cy.contains(atracao).click();
});

Then('o usuario e movido para página {string}', (pagina) => {
  cy.url().should('include', pagina.replace(" ", ""));
});

Given('que o usuArio está na página {string}', (cpf, pagina) => {
  cy.visit(`/${pagina.toLowerCase().replace(" ", "")}`);
  cy.get('input[name="cpf"]').type(cpf);
});

When('o usuário preenche os campos e seleciona {string}', (botao, dataTable) => {
  cy.wrap(dataTable.rowsHash()).each((valor, campo) => {
    if (campo.toLowerCase() === "data") return;
    if (campo.toLowerCase() === "nota") {
      cy.get(`input[name="nota"]`).clear().type(valor);
    } else {
      cy.get(`input[name="${campo.toLowerCase()}"]`).clear().type(valor);
    }
  });
  cy.contains(botao).click();
});

Then('o usuário recebe uma mensagem de erro {string}', (msg) => {
  cy.contains(msg).should('be.visible');
});

Then('visualiza sua avaliação', () => {
  cy.get(".reviews-list").should("contain", "Ana");
});
