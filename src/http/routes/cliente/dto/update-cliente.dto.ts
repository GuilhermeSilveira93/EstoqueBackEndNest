import * as zod from 'zod'
import { CreateClienteSchema } from './create-cliente.dto';

export const UpdateClienteSchema = CreateClienteSchema.extend({
  S_ATIVO: zod.boolean()
})
export type UpdateClienteSchemaType = zod.infer<typeof UpdateClienteSchema>