Feature: Criação dos usuários pelo admin
  Para gerenciar a plataforma de hotelaria
  Como um administrador
  Eu quero criar e registrar novos usuários no sistema

Scenario: Admin cria um novo usuário comum  
  Given o usuário "brunao" está logado como "admin"  
  And não existe um usuário com email "davi@test.com" ou CPF "000.000.000-03" no sistema  
  When "brunao" cria um novo usuário com:  
    | Name | Email          | CPF         | Password | Role  |  
    | davi | davi@test.com | 000.000.000-03 | 123      | comum |  
  Then o sistema registra o usuário com CPF "000.000.000-03" com os dados:  
    | Name | Email          | CPF         |  
    | davi | davi@test.com | 000.000.000-03 |  