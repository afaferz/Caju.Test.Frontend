# NÃO IMPORTE ARQUIVOS .json DIRETAMENTE NO .ts OU .tsx
Estes arquivos .json tem o propósito de centralizar configuração necessárias e específicas em tempo de *runtime*. Configurações de *secrets* ou configurações específicas de build são necessárias serem inseridas no arquiv ```.env``` próprio do ambiente.

# Types
Pelo *typescript* não conseguir tipar arquivos do modo .json o arquivo ```index.d.ts``` tipa corretamente os arquivos necessários nessa maneira de configuração.

## Dummy File
Não mexer neste arquivo, ele serve apenas para o build, onde ele seria substituido baseado na *environment* do projeto