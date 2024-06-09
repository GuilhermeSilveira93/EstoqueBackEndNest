FROM mysql:latest

LABEL maintainer=GuilhermeSilveira
# Definindo variáveis de ambiente para configurar o MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=estoquedocker
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
# Expondo a porta 3306
EXPOSE 3306