Feature: ADMINISTRADOR

Scenario: administrador tenta criar um usuário para o cliente com um CPF já registrado
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Charles" não possui cadastro no sistema
  And o CPF "120120120-14" está registrado no sistema
  And "Bob" está na tela "Gerenciamento de usuários"
  When "Bob" inicia o cadastro do novo usuário
  And "Bob" preenche os dados do cliente:  
    | Campo         | Valor           |  
    | Nome          | Charles         |  
    | CPF           | 120120120-14    |  
    | Quarto        | Quarto 232      |  
  And confirma o cadastro
  Then o sistema exibe a mensagem: "CPF:120120120-14 já está associado a outro usuário. Por favor verifique se os dados estão corretos."  
  And o cliente cujo CPF é "120120120-14" continua com seus dados inalterados no sistema
  And o usuário "Charles" não foi registrado no sistema. 

# Estou em um dilema sobre como remover um usuário é diferente de deletá-lo...
# Vou continuar partindo do pressuposto que remover seja remover de um Quarto
# e deletar seja apagar todos os dados do usuário do sistema (histórico de pagamento e dados pessoais)

Scenario: Remover associação de usuário a um quarto
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Daniel" está cadastrado com CPF "232232232-23"
  And "Daniel" está associado ao quarto "233"
  When "Bob" acessa a função "Remover Usuário de Quarto"
  And seleciona o usuário "Daniel" (CPF "232232232-23")
  And confirma a remoção
  Then o sistema exibe a mensagem: "Usuário Daniel (CPF: 232232232-23) foi desassociado do quarto 233"
  And o quarto "233" aparece como disponível no sistema
  And "Daniel" permanece cadastrado no sistema sem quarto associado

# Começar editando CPF porque é o único campo que é único de cada pessoa
Scenario: administrador edita o CPF de um usuário
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Eduardo" está cadastrado com:
    | Nome   | Eduardo      |
    | CPF    | 123456789-10 |
    | Quarto | 101          |
  And "Eduardo" aparece na lista de usuários com CPF "123456789-10"
  And o CPF "123456789-11" não está registrado no sistema
  When "Bob" atualiza o CPF de "Eduardo" para "123456789-11"
  Then o sistema exibe a mensagem: "Usuário Eduardo (CPF:123456789-11) foi atualizado com sucesso"
  And "Eduardo" aparece na lista de usuários com CPF "123456789-11"
  And todos os outros dados de "Eduardo" permanecem inalterados
  And o quarto "101" continua associado a "Eduardo"

  Scenario: administrador tenta mudar o CPF de um usuário para o CPF de outro usuário (falha)
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Eduardo" está cadastrado com:
    | Nome   | Eduardo      |
    | CPF    | 123456789-10 |
    | Quarto | 101          |
  And "Eduardo" aparece na lista de usuários com CPF "123456789-10"
  And o CPF "123456789-11" está registrado no sistema como:
    | Nome   | Fabiano      |
    | CPF    | 123456789-11 |
    | Quarto | 102          |
  When "Bob" atualiza o CPF de "Eduardo" para "123456789-11"
  Then o sistema exibe a mensagem: "CPF:123456789-11"
  And "Eduardo" aparece na lista de usuários com CPF "123456789-11 já registrado como Fabiano! Por favor verifique se o novo CPF está correto."
  And todos os dados de "Eduardo" e "Fabiano" permanecem inalterados

Scenario: administrador deleta a conta de um usuário
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
   And o usuário "Felipe" está cadastrado com:
    | Campo | Valor               |
    | Nome  | Felipe              |
    | CPF   | 000000000-00        |
    | Email | felipe@exemplo.com  |
  And "Felipe" aparece na lista de usuários ativos
  When "Bob" solicita a exclusão permanente da conta de "Felipe"
  And confirma a ação na caixa de diálogo "Tem certeza que deseja deletar permanentemente esta conta?"
  Then o sistema exibe a mensagem: "Conta de Felipe (CPF: 000000000-00) foi permanentemente removida"
  And "Felipe" não aparece mais na lista de usuários
  And nenhum registro contendo CPF "000000000-00" permanece no banco de dados
  And um registro de auditoria é criado com:
    | Ação         | Exclusão de usuário  |
    | Responsável  | Bob                  |
    | CPF afetado  | 000000000-00         |

# tratar o cenário de tentar criar um usuário com um CPF deletado anteriormente

Scenario: Administrador visualiza a tabela de usuários
  Given que o usuário "Bob" está autenticado no sistema com o perfil de "administrador"
  And está na tela "Gerenciamento de usuários"
  When Bob clica na opção "Tabela de usuários"
  Then o sistema deve exibir uma tabela com os dados dos usuários
  And a tabela deve conter, para cada usuário, as colunas:
    | Nome  |
    | CPF   |
    | Email |
  And cada linha da tabela deve exibir as informações correspondentes de cada usuário


=======
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
