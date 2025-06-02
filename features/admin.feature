Feature: administrador

Scenario: administrador criar um usuário para o cliente
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Charles" não possui cadastro no sistema
  And o CPF "120120120-14" não está registrado no sistema
  And "Bob" está na tela "Gerenciamento de usuários"
  When "Bob" inicia o cadastro do novo usuário
  And "Bob" preenche os dados do cliente:  
    | Campo         | Valor           |  
    | Nome          | Charles         |  
    | CPF           | 120120120-14    |  
    | Quarto        | Quarto 232      |  
  And confirma o cadastro
  Then o sistema exibe a mensagem: "Usuário 'Charles' criado com sucesso"  
  And o cliente "Charles" aparece na lista de usuários com CPF "120120120-14"  

Scenario: administrador remove um usuário
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Daniel" possui cadastro no sistema com o CPF "232232232-23"
  And "Bob" está na tela "Gerenciamento de usuários"
  When "Bob" acessa a tela "Remover usuário"
  And seleciona o CPF "232232232-23"

Scenario: administrador edita um usuário

Scenario: administrador deleta a conta de um usuário