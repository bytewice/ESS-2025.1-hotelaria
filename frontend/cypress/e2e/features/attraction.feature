 Feature: atrações

  As a hóspede,
  I want to visualizar a lista de atrações disponíveis e classificar as que já visitei,
  So that eu possa organizar minhas experiências e descobrir novas atrações para aproveitar
 
 Scenario: Entrando em uma página de uma atração
   Given que o usuario esta na pagina de "Atracoes"
   When o usuario seleciona "SPA"
   Then o usuario e movido para página "SPA"
  Scenario: Entrando na página de avaliação
   Given que o usuario esta na pagina de "SPA"
   When o usuario seleciona "Avaliar"
   Then o usuario e movido para página "Avaliar Spa"

  Scenario: Preenchendo a página de avaliação com campos válidos
    Given que o usuário de CPF "08622635480" está na página "Avaliar Spa"
    And visualiza os seguintes campos a serem preenchidos:
      | Campo      | Valor            |
      | Nome       | Ana              |
      | Nota       | 5                |
      | Comentário | Muito Relaxante  |
      | Data       | <data atual>     |
    When o usuário preenche os campos e seleciona "Confirmar"
    Then o usuário é movido para a página "Avaliar Spa"
    And visualiza sua avaliação

  Scenario: Preenchendo a página de avaliação sem preencher nome
    Given que o usuário de CPF "08622635480" está na página "Avaliar Spa"
    And visualiza os seguintes campos a serem preenchidos:
      | Campo      | Valor            |
      | Nome       |                  |
      | Nota       | 5                |
      | Comentário | Muito Relaxante  |
      | Data       | <data atual>     |
    When o usuário preenche os campos e seleciona "Confirmar"
    Then o usuário recebe uma mensagem de erro "Campos inválidos"

  Scenario: Preenchendo a página de avaliação sem preencher nota
    Given que o usuário de CPF "08622635480" está na página "Avaliar Spa"
    And visualiza os seguintes campos a serem preenchidos:
      | Campo      | Valor            |
      | Nome       | Ana              |
      | Nota       |                  |
      | Comentário | Muito Relaxante  |
      | Data       | <data atual>     |
    When o usuário preenche os campos e seleciona "Confirmar"
    Then o usuário recebe uma mensagem de erro "Campos inválidos"