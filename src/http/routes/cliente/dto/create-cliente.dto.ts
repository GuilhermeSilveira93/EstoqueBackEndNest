import { IsString } from 'class-validator';
import * as zod from 'zod'

export const CreateClienteSchema = zod.object({
  S_NOME: zod.string({required_error: 'Nome do Cliente é Obrigatório!'}),
  ID_EMPRESA: zod.string({required_error: 'Empresa obrigatória'})
})
export type CreateClienteSchemaType = zod.infer<typeof CreateClienteSchema>