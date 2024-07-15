/*
  Warnings:

  - A unique constraint covering the columns `[S_NOME]` on the table `st_cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[S_NOME]` on the table `st_empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[S_NOME]` on the table `st_fornecedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[S_NOME]` on the table `st_grupo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[S_NOME]` on the table `st_produto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[S_NOME]` on the table `st_tipo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[S_EMAIL]` on the table `st_usuario` will be added. If there are existing duplicate values, this will fail.
  - Made the column `S_NOME` on table `st_cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_ATIVO` on table `st_cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_ATIVO` on table `st_empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_NOME` on table `st_fornecedor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_ATIVO` on table `st_fornecedor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `N_NIVEL` on table `st_grupo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_ATIVO` on table `st_grupo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `D_DATA_INICIO` on table `st_lote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_NOME` on table `st_produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_ATIVO` on table `st_produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_NOME` on table `st_tipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_ATIVO` on table `st_tipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_CHAVE` on table `st_usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `S_ATIVO` on table `st_usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `st_cliente` MODIFY `S_NOME` VARCHAR(45) NOT NULL,
    MODIFY `S_ATIVO` CHAR(1) NOT NULL DEFAULT 'S';

-- AlterTable
ALTER TABLE `st_empresa` MODIFY `S_ATIVO` CHAR(1) NOT NULL DEFAULT 'S';

-- AlterTable
ALTER TABLE `st_fornecedor` MODIFY `S_NOME` VARCHAR(45) NOT NULL,
    MODIFY `S_ATIVO` CHAR(1) NOT NULL DEFAULT 'S';

-- AlterTable
ALTER TABLE `st_grupo` MODIFY `N_NIVEL` INTEGER NOT NULL,
    MODIFY `S_ATIVO` CHAR(1) NOT NULL DEFAULT 'S';

-- AlterTable
ALTER TABLE `st_lote` MODIFY `D_DATA_INICIO` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `st_produto` MODIFY `S_NOME` VARCHAR(150) NOT NULL,
    MODIFY `S_ATIVO` CHAR(1) NOT NULL DEFAULT 'S';

-- AlterTable
ALTER TABLE `st_tipo` MODIFY `S_NOME` VARCHAR(45) NOT NULL,
    MODIFY `S_ATIVO` VARCHAR(1) NOT NULL DEFAULT 'S';

-- AlterTable
ALTER TABLE `st_usuario` ALTER COLUMN `D_EXPIRACAO_SENHA` DROP DEFAULT,
    MODIFY `S_CHAVE` VARCHAR(30) NOT NULL,
    MODIFY `S_ATIVO` VARCHAR(1) NOT NULL DEFAULT 'S';

-- CreateIndex
CREATE UNIQUE INDEX `st_cliente_S_NOME_key` ON `st_cliente`(`S_NOME`);

-- CreateIndex
CREATE UNIQUE INDEX `st_empresa_S_NOME_key` ON `st_empresa`(`S_NOME`);

-- CreateIndex
CREATE UNIQUE INDEX `st_fornecedor_S_NOME_key` ON `st_fornecedor`(`S_NOME`);

-- CreateIndex
CREATE UNIQUE INDEX `st_grupo_S_NOME_key` ON `st_grupo`(`S_NOME`);

-- CreateIndex
CREATE UNIQUE INDEX `st_produto_S_NOME_key` ON `st_produto`(`S_NOME`);

-- CreateIndex
CREATE UNIQUE INDEX `st_tipo_S_NOME_key` ON `st_tipo`(`S_NOME`);

-- CreateIndex
CREATE UNIQUE INDEX `st_usuario_S_EMAIL_key` ON `st_usuario`(`S_EMAIL`);
