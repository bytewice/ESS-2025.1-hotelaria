Scenario: Seed cria um novo administrador
  Given o usuário "Admin Principal" está logado no sistema com perfil "seed"
  And não existe usuário cadastrado com email "brunao@gmail.com"
  And não existe usuário cadastrado com CPF "00000000002"
  When "Admin Principal" tenta criar um novo usuário com os dados:
    | Name    | Email            | CPF         | Password | confirmPassword | role  |
    | brunao  | brunao@gmail.com | 00000000002 | 123      | 123             | admin |
  And confirma o cadastro
  Then o novo usuário "brunao" é criado com sucesso com a função "admin"
  And "Admin Principal" pode visualizar o usuário "brunao" na lista de usuários com função "admin"

  
Scenario: Admin cria um novo usuário comum
  Given o usuário "brunao" está logado no sistema com perfil "admin"
  And não existe usuário cadastrado com email "davi@gmail.com"
  And não existe usuário cadastrado com CPF "00000000003"
  When "brunao" tenta criar um novo usuário com os dados:
    | Name | Email          | CPF         | Password | confirmPassword | role   |
    | davi | davi@gmail.com | 00000000003 | 123      | 123             | comum  |
  And confirma o cadastro
  Then o novo usuário "davi" é criado com sucesso com a função "comum"
  And "brunao" pode visualizar o usuário "davi" na lista de todos os usuários


Scenario: Admin deleta um usuário comum
  Given o usuário "brunao" está logado no sistema com perfil "admin"
  And Existe um usuário "comum" com CPF "00000000003" cadastrado no sistema com nome "davi"
  When "brunao" seleciona o usuário "davi" e confirma a exclusão
  Then o usuário "davi" é removido do sistema
  And "brunao" não pode visualizar o usuário "davi" na lista de todos os usuários

Scenario: Admin tenta deletar a si mesmo
  Given o usuário "brunao" está logado no sistema com perfil "admin"
  When "brunao" tenta deletar a própria conta
  Then o sistema impede a exclusão e exibe uma mensagem de erro informando que um administrador não pode excluir sua própria conta
  And "brunao" continua aparecendo na lista de todos os usuários com a função "admin"

Scenario: Seed deleta um administrador
  Given o usuário "Admin Principal" está logado no sistema com perfil "seed"
  And Existe um usuário "admin" chamado "brunao" cadastrado no sistema
  When "Admin Principal" seleciona o usuário "brunao" e confirma a exclusão
  Then o usuário "brunao" é removido do sistema
  And "Admin Principal" não pode visualizar o usuário "brunao" na lista de usuários "admin"     

Scenario: Seed tenta deletar a si mesmo
  Given o usuário "Admin Principal" está logado no sistema com perfil "seed"
  When "Admin Principal" tenta deletar a própria conta
  Then o sistema impede a exclusão e exibe uma mensagem de erro informando que a conta "Seed" não pode ser excluída
  And "Admin Principal" continua aparecendo na lista de todos os usuários com a função "seed"