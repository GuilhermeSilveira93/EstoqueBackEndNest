import * as z from 'zod';
export const envSchema = z.object({
  JWT_PRIVATE_KEY: z
    .string({ required_error: 'É necessário passar uma chave!' })
    .length(2280, { message: 'Chave privada invalida.' }),
  JWT_PUBLIC_KEY: z
    .string({ required_error: 'É necessário passar uma chave!' })
    .length(604, { message: 'Chave publica invalida.' }),
  DATABASE_URL: z.string(),
  PORT: z.string().default('3002').transform(Number),
});
export type EnvType = z.infer<typeof envSchema>;
