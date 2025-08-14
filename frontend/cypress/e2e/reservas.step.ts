import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// BACKGROUND
Given('que estou na página de "Gerenciar Reservas"', () => {
  cy.visit("/reservas");
});

// CENÁRIO: Criar uma reserva válida
When('clico no botão "➕ Nova Reserva"', () => {
  cy.contains("button", "➕ Nova Reserva").click();
});

When('preencho o campo "CPF do Hóspede" com {string}', (cpf: string) => {
  cy.get('input[name="cpf"]').type(cpf);
});

When('preencho a data de entrada com {string}', (data: string) => {
  cy.get('input[name="dataEntrada"]').type(data);
});

When('preencho a data de saída com {string}', (data: string) => {
  cy.get('input[name="dataSaida"]').type(data);
});

When('preencho o campo "Número do Quarto" com {string}', (quarto: string) => {
  cy.get('input[name="numeroQuarto"]').type(quarto);
});

When('preencho o campo "Preço" com {string}', (preco: string) => {
  cy.get('input[name="preco"]').type(preco);
});

When('preencho o campo "Pagamento" com {string}', (valor: string) => {
  cy.get('input[name="pagamento"]').type(valor);
});

When('clico no botão "Salvar"', () => {
  cy.contains("button", "Salvar").click();
});

Then('devo ver a reserva com CPF {string} na lista de reservas', (cpf: string) => {
  cy.contains(cpf).should("exist");
});

// CENÁRIO: Editar o check-out de uma reserva
Given('que existe uma reserva com CPF {string}', (cpf: string) => {
  cy.contains(cpf).should("exist");
});

When('clico no botão "✏️ Editar" correspondente a essa reserva', () => {
  cy.contains("✏️ Editar").click();
});

When('altero a data de saída para {string}', (data: string) => {
  cy.get('input[name="dataSaida"]').clear().type(data);
});

When('clico em "Salvar"', () => {
  cy.contains("Salvar").click();
});

Then('a reserva com CPF {string} deve ter a data de saída {string}', (cpf: string, data: string) => {
  cy.contains(cpf).parent().should("contain", data);
});

// CENÁRIO: Excluir uma reserva existente
When('clico no botão "🗑️ Excluir" correspondente a essa reserva', () => {
  cy.contains("🗑️ Excluir").click();
});

When('confirmo a exclusão', () => {
  cy.on('window:confirm', () => true);
});

Then('não devo ver a reserva com CPF {string} na lista', (cpf: string) => {
  cy.contains(cpf).should("not.exist");
});

// CENÁRIO: Filtrar reservas usando CPF
Given('que existem reservas com CPFs {string} e {string}', (cpf1: string, cpf2: string) => {
  cy.contains(cpf1).should("exist");
  cy.contains(cpf2).should("exist");
});

When('seleciono "CPF" no filtro', () => {
  cy.get('select[name="filtro"]').select("CPF");
});

When('preencho o filtro com {string}', (valor: string) => {
  cy.get('input[name="filtroValor"]').type(valor);
});

When('clico em "🔍 Buscar CPF"', () => {
  cy.contains("🔍 Buscar CPF").click();
});

Then('devo ver apenas a reserva com CPF {string} na lista', (cpf: string) => {
  cy.get("table tbody tr").should("have.length", 1).and("contain", cpf);
});

// CENÁRIO: Filtrar reservas por datas
Given(
  'que existem reservas de {string} a {string} e de {string} a {string}',
  (de1: string, ate1: string, de2: string, ate2: string) => {
    cy.contains(de1).should("exist");
    cy.contains(ate1).should("exist");
    cy.contains(de2).should("exist");
    cy.contains(ate2).should("exist");
  }
);

When('seleciono "Intervalo de Datas" no filtro', () => {
  cy.get('select[name="filtro"]').select("Intervalo de Datas");
});

When('preencho "De" com {string}', (data: string) => {
  cy.get('input[name="dataDe"]').type(data);
});

When('preencho "Até" com {string}', (data: string) => {
  cy.get('input[name="dataAte"]').type(data);
});

When('clico em "🔍 Buscar Datas"', () => {
  cy.contains("🔍 Buscar Datas").click();
});

Then('devo ver apenas a reserva que começa em {string}', (data: string) => {
  cy.get("table tbody tr").should("have.length", 1).and("contain", data);
});

// CENÁRIO: Filtrar reservas por quarto
Given('que existem reservas nos quartos {string} e {string}', (q1: string, q2: string) => {
  cy.contains(q1).should("exist");
  cy.contains(q2).should("exist");
});

When('seleciono "Número do Quarto" no filtro', () => {
  cy.get('select[name="filtro"]').select("Número do Quarto");
});

When('clico em "🔍 Buscar Quarto"', () => {
  cy.contains("🔍 Buscar Quarto").click();
});

Then('devo ver apenas a reserva do quarto {string}', (quarto: string) => {
  cy.get("table tbody tr").should("have.length", 1).and("contain", quarto);
});
