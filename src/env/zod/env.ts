import * as z from 'zod';

export const envSchema = z.object({
  JWT_TOKEN: z
    .string({ required_error: 'É necessário passar uma chave!' })
    .length(29, { message: 'Chave invalida.' }),
  DATABASE_URL: z
    .string({ required_error: 'É Banco de dados é necessario!' })
    .min(5, { message: 'Insira a Conexão com o Banco de Dados' }),
  PORT: z.string().default('3002'),
});
export type Env = z.infer<typeof envSchema>;
export const EnvSchemaParse = envSchema.parse(process.env);
