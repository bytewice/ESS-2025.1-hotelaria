Feature: Gerenciamento do Perfil do Usuário

  As a usuário Comum logado,
  I want to visualizar, editar e deletar minhas informações de perfil,
  So that eu possa manter meus dados atualizados e gerenciar minha conta.

Scenario: Visualização de dados do perfil
  Given que o usuário de CPF "11122233344" está logado e na página "Home"
  When o usuário clica no link "Perfil"
  Then ele é redirecionado para a página "Perfil" e visualiza seus dados cadastrados

Scenario: Navegação para a página de edição
  Given que o usuário de CPF "11122233344" está logado e na página "Perfil"
  When o usuário clica no botão "Editar Perfil"
  Then ele é redirecionado para a página "edição de perfil"

Scenario: Edição de dados com sucesso
  Given que o usuário de CPF "11122233344" está logado e na página "edição de perfil"
  When o usuário altera o campo "Nome" para "Usuario Editado" e clica no botão "Salvar Alterações"
  Then ele é redirecionado para a página "Perfil" e seus dados aparecem atualizados

Scenario: Tentativa de edição com campo nome vazio
  Given que o usuário de CPF "11122233344" está logado e na página "edição de perfil"
  When o usuário apaga o conteúdo do campo "Nome" e clica no botão "Salvar Alterações"
  Then uma mensagem de erro "O campo Nome não pode ser vazio" é exibida

Scenario: Deleção da conta com sucesso
  Given que o usuário de CPF "11122233344" está logado e na página "Perfil"
  When o usuário clica no botão "Deletar Conta" e confirma a ação
  Then ele é redirecionado para a página "login" e sua conta é removida do sistema