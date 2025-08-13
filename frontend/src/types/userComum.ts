import type { User } from './user'; // Importa a interface base
import type {Avaliacao} from './avaliacao'
import type { MetododePagamento } from './metodo'
// UserComum herda tudo de User e adiciona seus próprios campos

export interface UserComum extends User {
  Telefone: String,
  Avaliacoes: [Avaliacao]
  Metodos: [MetododePagamento]
}
