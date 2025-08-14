import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que o usuario esta na pagina de {string}', (pagina) => {
  cy.visit(`${pagina.toLowerCase()}`);
});

When('o usuario seleciona {string}', (atracao) => {
  cy.contains(atracao)
  .parents(".atracao-card")
  .find(".atracao-button")
  .click();
});

Then('o usuario e movido para página {string}', (pagina) => {
  cy.url().should('include', pagina.replace(" ", ""));
});

Given('que o usuario esta na pagina de atração {string}', (pagina) => {
  cy.visit(`/atracoes/${pagina}`);
});

When('o usuário preenche os campos e seleciona {string}', (botao, dataTable) => {
  const campos = dataTable.rowsHash();

  if (campos["Nome"] || campos["Seu nome"]) {
    cy.contains('label', 'Seu nome')
      .parent()
      .find('input')
      .clear()
      .type(campos["Nome"] || campos["Seu nome"]);
  }

  
  if (campos["Comentário"]) {
    cy.contains('label', 'Comentário')
      .parent()
      .find('textarea')
      .clear()
      .type(campos["Comentário"]);
  }

  
  if (campos["Nota"]) {
    cy.contains('label', 'Nota')
      .parent()
      .find('input[type="number"]')
      .clear()
      .type(campos["Nota"]);
  }

  
  cy.contains('button', botao).click();
});

Then('o usuário recebe uma mensagem de erro {string}', (msg) => {
  cy.contains(msg).should('be.visible');
});

Then('visualiza sua avaliação', () => {
  cy.url().should('include', pagina.replace(" ", ""));
});
