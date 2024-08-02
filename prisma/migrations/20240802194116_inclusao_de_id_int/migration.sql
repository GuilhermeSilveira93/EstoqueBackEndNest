/*
  Warnings:

  - Added the required column `ID_CLIENTE_OLD` to the `st_cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EMPRESA_OLD` to the `st_empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_FORNECEDOR_OLD` to the `st_fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_GRUPO_OLD` to the `st_grupo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_LOG_ACESSO_OLD` to the `st_log_acesso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_LOTE_OLD` to the `st_lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PRODUTO_OLD` to the `st_produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PRODUTO_LOTE_OLD` to the `st_produto_lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_TIPO_OLD` to the `st_tipo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_USUARIO_OLD` to the `st_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `st_cliente` ADD COLUMN `ID_CLIENTE_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_empresa` ADD COLUMN `ID_EMPRESA_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_fornecedor` ADD COLUMN `ID_FORNECEDOR_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_grupo` ADD COLUMN `ID_GRUPO_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_log_acesso` ADD COLUMN `ID_LOG_ACESSO_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_lote` ADD COLUMN `ID_LOTE_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_produto` ADD COLUMN `ID_PRODUTO_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_produto_lote` ADD COLUMN `ID_PRODUTO_LOTE_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_tipo` ADD COLUMN `ID_TIPO_OLD` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `st_usuario` ADD COLUMN `ID_USUARIO_OLD` INTEGER NOT NULL;
