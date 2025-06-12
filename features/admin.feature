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

Scenario (GUI): Edição de reserva bem sucedida
  Given estou na página “Lista De Reservas” logado como “admin”
  And existe uma reserva cadastrada para o hóspede "01828392300" com check-in em "10/07/2025" e check-out em "15/07/2025"  
  When o administrador clica no campo "Data da Reserva" da reserva de "01828392300"  
  And altera a data de check-out para "17/07/2025"  
  And clica no botão "Salvar Alterações"  
  Then o sistema exibe a mensagem "Reserva atualizada com sucesso"  
  And a reserva de "01828392300" agora mostra check-out em "17/07/2025"

Scenario (GUI): Exclusão de reserva bem-sucedida  
  Given estou na página "Lista De Reservas" logado como "admin"  
  And existe uma reserva cadastrada para o hóspede "01828392300" com check-in em "10/07/2025" e check-out em "15/07/2025"  
  When o administrador clica no botão "DELETAR" da reserva de "01828392300"  
  And “confirmar” a exclusão na janela de confirmação  
  And clica no botão "Salvar Alterações"  
  Then o sistema exibe a mensagem "Reserva excluída com sucesso"  
  And a reserva de "01828392300" não aparece mais na lista de reservas

Scenario (GUI): Bloqueio de reserva bem-sucedido  
  Given estou na página "Lista De Reservas" logado como "admin"  
  And existe uma reserva cadastrada para o hóspede "01828392300" com check-in em "10/07/2025" e check-out em "15/07/2025"  
  When o administrador clica no botão "Bloquear" da reserva de "01828392300"  
  And confirma o bloqueio na janela de confirmação  
  And clica no botão "Salvar Alterações"  
  Then o sistema exibe a mensagem "Reserva bloqueada com sucesso"  
  And a reserva de "01828392300" aparece com o status "Bloqueada" na lista de reservas

Scenatio (GUI): Edição de reserva mal sucedida
  Given estou na página "Lista de reservas"
  And estou logado como "admin"
  And existe uma reserva cadastrada para o hóspede "01828392300" com check-in em "10/07/2025" e check-out em "15/07/2025"  
  When o administrador clica no campo "Data da Reserva" da reserva de "01828392300" 
  And altera a data de check-out para "17/07/2025"    
  Then o sistema exibe a mensagem "Conflito de data detectado"
  And a reserva de "01828392300" permanece inalterada

Scenario (GUI): Visualização de estatísticas gerais de reservas  
  Given estou na página "Lista De Reservas" logado como "admin"  
  When clico na opção "Ver Estatísticas Gerais"  
  Then um pop-up é exibido com as Estatísticas Gerais
  
Scenario (Service): Obter taxa de ocupação em um intervalo de datas
  Given o sistema possui reservas cadastradas com diferentes datas de check-in e check-out  
  And o intervalo de datas consultado é de "01/07/2025" a "31/07/2025"  
  When o sistema calcula a taxa de ocupação no intervalo  
  Then o sistema retorna "73%" como taxa de ocupação  
  And considera apenas as reservas ativas e finalizadas no cálculo

Scenario (Service): Identificar conflitos de reserva para um mesmo quarto
  Given o sistema possui uma reserva no quarto “305” com check-in em “10/08/2025” e check-out em “15/08/2025”
  And uma nova reserva é cadastrada para o mesmo quarto com check-in em "12/08/2025" e check-out em "17/08/2025"  
  When o sistema valida conflitos de reserva para o quarto "305"
  Then o sistema retorna "Conflito detectado entre reservas de 10/08/2025 a 15/08/2025 e 12/08/2025 a 17/08/2025"  
  And impede a confirmação da segunda reserva
