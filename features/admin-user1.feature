Scenario: Seed tenta deletar a si mesmo
  Given existe um usuário "brunao" com função "admin"
  And existe um usuário "Admin Principal" com função "seed"
  When "Admin Principal" confirma a deleção de "brunao"
  Then "brunao" é removido da lista de usuários