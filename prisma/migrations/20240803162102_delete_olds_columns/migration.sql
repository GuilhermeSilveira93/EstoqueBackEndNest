/*
  Warnings:

  - You are about to drop the column `ID_CLIENTE_OLD` on the `st_cliente` table. All the data in the column will be lost.
  - You are about to drop the column `ID_EMPRESA_OLD` on the `st_empresa` table. All the data in the column will be lost.
  - You are about to drop the column `ID_FORNECEDOR_OLD` on the `st_fornecedor` table. All the data in the column will be lost.
  - You are about to drop the column `ID_GRUPO_OLD` on the `st_grupo` table. All the data in the column will be lost.
  - You are about to drop the column `ID_LOG_ACESSO_OLD` on the `st_log_acesso` table. All the data in the column will be lost.
  - You are about to drop the column `ID_LOTE_OLD` on the `st_lote` table. All the data in the column will be lost.
  - You are about to drop the column `ID_PRODUTO_OLD` on the `st_produto` table. All the data in the column will be lost.
  - You are about to drop the column `ID_TIPO_OLD` on the `st_tipo` table. All the data in the column will be lost.
  - You are about to drop the column `ID_USUARIO_OLD` on the `st_usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `st_cliente` DROP COLUMN `ID_CLIENTE_OLD`;

-- AlterTable
ALTER TABLE `st_empresa` DROP COLUMN `ID_EMPRESA_OLD`;

-- AlterTable
ALTER TABLE `st_fornecedor` DROP COLUMN `ID_FORNECEDOR_OLD`;

-- AlterTable
ALTER TABLE `st_grupo` DROP COLUMN `ID_GRUPO_OLD`;

-- AlterTable
ALTER TABLE `st_log_acesso` DROP COLUMN `ID_LOG_ACESSO_OLD`;

-- AlterTable
ALTER TABLE `st_lote` DROP COLUMN `ID_LOTE_OLD`;

-- AlterTable
ALTER TABLE `st_produto` DROP COLUMN `ID_PRODUTO_OLD`;

-- AlterTable
ALTER TABLE `st_tipo` DROP COLUMN `ID_TIPO_OLD`;

-- AlterTable
ALTER TABLE `st_usuario` DROP COLUMN `ID_USUARIO_OLD`;
