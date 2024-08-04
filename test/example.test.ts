import { test, expect } from 'vitest';

test('Usuario carrega tabela de produtos', async () => {
  // Simula requisição ao endpoint
  const response = await fetch('http://localhost:3002/produto/tabela');

  // Verifica se a resposta é um status 202 (OK)
  expect(response.status).toBe(202);

  // Converte a resposta em JSON
  const data = await response.json();

  // Verifica se a resposta possui um array de produtos
  expect(Array.isArray(data)).toBeTruthy();
});
