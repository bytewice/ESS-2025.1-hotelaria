import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// --- Mapeamento de Páginas (Boa prática para manutenção) ---
const pageMap = {
  Home: "/home",
  Perfil: "/perfil",
  "edição de perfil": "/perfil/editar",
  login: "/",
};

// --- DADOS DE TESTE ---
// Em um projeto real, estes dados viriam de um arquivo de fixture ou seriam criados dinamicamente.
const testUser = {
  CPF: "11122233344",
  Email: "ficticio@exemplo.com",
  Password: "senhaSegura123",
  Name: "Nome Fictício do Usuário",
};

// --- DEFINIÇÃO DOS PASSOS ---

/**
 * Este passo é complexo. Ele faz o login do usuário programaticamente (via API)
 * para acelerar o teste e depois navega para a página desejada.
 * Isso evita ter que passar pela UI de login em todos os cenários.
 */
Given("que o usuário de CPF {string} está logado e na página {string}", (cpf, pageName) => {
    // Comando customizado para login via API (exemplo)
    // Isso é mais rápido e robusto do que preencher o formulário de login toda vez.
    cy.request({
      method: 'POST',
      url: 'localhost:2000/login', // Use o endpoint real da sua API de login
      body: { Email: testUser.Email, Password: testUser.Password },
    });
  
    // Após o login (e o cookie ser setado), visita a página de destino
    const url = pageMap[pageName];
    cy.visit(url);
    cy.contains('button', 'Sair', { timeout: 10000 }).should('be.visible');
  }
);

When("o usuário clica no link {string}", (linkText) => {
  // cy.contains encontra um elemento pelo seu texto
  cy.contains('a', new RegExp(`^${linkText}$`, 'i')).click();
});

When("o usuário clica no botão {string}", (buttonText) => {
  // Usando um seletor de dados para robustez. Ex: <button data-cy="edit-profile-button">
  // Se não tiver, pode usar cy.contains('button', buttonText).click();
  cy.get(`[data-cy="${buttonText.toLowerCase().replace(' ', '-')}"]`).click();
});

When("o usuário altera o campo {string} para {string} e clica no botão {string}", (fieldLabel, newValue, buttonText) => {
    // Encontra o input pelo seu 'label', depois altera e clica.
    cy.contains('label', fieldLabel).find('input').clear().type(newValue);
    cy.contains('button', buttonText).click();
  }
);

When("o usuário apaga o conteúdo do campo {string} e clica no botão {string}", (fieldLabel, buttonText) => {
    cy.contains('label', fieldLabel).find('input').clear();
    cy.contains('button', buttonText).click();
  }
);

When("o usuário clica no botão {string} e confirma a ação", (buttonText) => {
  // Isso instrui o Cypress a aceitar automaticamente a próxima janela de confirmação (window.confirm)
  cy.on('window:confirm', () => true);
  cy.contains('button', buttonText).click();
});

Then("ele é redirecionado para a página {string}", (pageName) => {
  const url = pageMap[pageName];
  cy.url().should("include", url);
});

Then("ele é redirecionado para a página {string} e visualiza seus dados cadastrados", (pageName) => {
    cy.contains('h1', 'Perfil do Usuário', { timeout: 10000 }).should('be.visible');
    const url = pageMap[pageName];
    cy.url().should("include", url);
    cy.get('@userData').then((user) => {
        cy.contains(user.name);
    });
  }
);

Then("ele é redirecionado para a página {string} e seus dados aparecem atualizados", (pageName) => {
    const url = pageMap[pageName];
    cy.url().should("include", url);
    cy.contains("Usuario Editado"); // Verifica se o novo nome está visível
  }
);

Then("uma mensagem de erro {string} é exibida", (errorMessage) => {
  // Supondo que a mensagem de erro aparece em um elemento com a classe 'error'
  cy.get('.error').should('contain', errorMessage);
});

Then("ele é redirecionado para a página {string} e sua conta é removida do sistema", (pageName) => {
    const url = pageMap[pageName];
    cy.url().should("include", url);
  
    // A melhor forma de verificar se a conta foi removida é tentar logar novamente e esperar uma falha.
    cy.request({
      method: 'POST',
      url: '/api/users/login',
      body: { email: testUser.email, password: testUser.password },
      failOnStatusCode: false // Não falha o teste se o status for 4xx ou 5xx
    }).then((response) => {
      // Espera um status de erro (ex: 401 Unauthorized, 404 Not Found)
      expect(response.status).to.be.oneOf([400, 401, 404]);
    });
  }
);