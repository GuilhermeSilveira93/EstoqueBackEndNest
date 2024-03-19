import * as z from 'zod';
export const envSchema = z.object({
  JWT_TOKEN: z
    .string({ required_error: 'É necessário passar uma chave!' })
    .length(29, { message: 'Chave invalida.' }),
  POSTGRES_URL: z.string().optional(),
  POSTGRES_PRISMA_URL: z.string({
    required_error: 'É necessário passar a URL do Postgres para o Prisma!',
  }),
  POSTGRES_URL_NO_SSL: z.string().optional(),
  POSTGRES_URL_NON_POOLING: z.string({
    required_error: 'POSTGRES_URL_NON_POOLING necessario!',
  }),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_HOST: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DATABASE: z.string().optional(),
  PORT: z.string().default('3002'),
});
export type Env = z.infer<typeof envSchema>;
export const EnvSchemaParse: Env = envSchema.parse(process.env);
