import * as zod from 'zod';
export const LoginDtoSchema = zod.object({
  body: zod.object({
    S_EMAIL: zod
      .string()
      .min(1, { message: 'Email é Obrigatório.' })
      .max(150, { message: 'E-mail inválido' })
      .email(),
    S_SENHA: zod
      .string()
      .min(1, { message: 'Digite uma senha.' })
      .max(64, { message: 'Tamanho deve ser entre 1 e 64 caracteres.' }), // 64 is the maximum length for bcrypt's hashing algorithm. 128 is recommended for modern applications.
  }),
});
export type LoginDtoSchemaType = zod.infer<typeof LoginDtoSchema>;