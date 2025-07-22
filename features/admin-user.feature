Scenario: Seed creates an admin

Given o usuário "Admin Principal" com a função "seed"
And não existe usuário cadastrado com email "abcd@gmail.com"
And não existe usuário cadastrado com CPF "00000000002"
When "Admin Principal" tenta criar um novo usuário com função "admin" 
And preenche os seguintes campos
{        
        "Name": "brunao",
        "Email": "brunao@gmail.com",
        "CPF": "00000000002",
        "Password": "123",
        "confirmPassword": "123",
        "role": "admin"
}
Then O novo usuário "Administrador" é criado com sucesso
And "Admin Principal" pode visualizar o usuario "brunao" na lista de usuários com função "admin"

Scenario: Admin creates an user

Given o usuário "brunao" com a função "admin"
And não existe usuário cadastrado com email "davi@gmail.com"
And não existe usuário cadastrado com CPF "00000000003"
When "brunao" tenta criar um perfil com função "comum"
And preenche os seguintes campos
{        
        "Name": "caio",
        "Email": "caio@gmail.com",
        "CPF": "00000000003",
        "Password": "123",
        "confirmPassword": "123",
}
Then O novo usuário "caio" é criado com sucesso
And "brunao" pode visualizar "caio" na lista de todos os usuários 

Scenario: Admin deletes an user

Given o usuário "brunao" com a função "admin" 
And Existe um usuário "comum" com CPF "00000000003" cadastrado no sistema com nome "caio"
When Eu seleciono "caio" na lista de usuários e confirmo a exclusão 
Then "caio" é removido do sistema
And "caio" não aparece na lista de todos os usuários

// continuar a revisao dos cenários daqui!

Scenario: Admin tries to delete himself

Given o usuário "brunao" com a função "admin" 
When Eu tento excluir minha própria conta 
Then O sistema impede a exclusão e exibe uma mensagem de erro informando que um administrador não pode excluir sua própria conta 

Scenario: Seed deletes an admin

Given o usuário "Admin Principal" com a função "seed"
And Existe um usuário "Administrador" chamado "AdminUser" cadastrado no sistema
When Eu seleciono "AdminUser" na lista de usuários e confirmo a exclusão 
Then "AdminUser" é removido do sistema e não consegue mais logar 

Scenario: Seed tries to delete himself

Given o usuário "Admin Principal" com a função "seed"
When Eu tento excluir minha própria conta 
Then O sistema impede a exclusão e exibe uma mensagem de erro informando que a conta "Seed" não pode ser excluída