**Configurações do projeto**

- Fiz algumas configurações para desenvolvimento como ajustar o tsconfig.json com as regras do ESLint
- Alterei a identação do projeto para que fique mais claro a visualização em *pull requests*

**tsconfig.json**
```ts
{
    // compilerOptions
    ...
    "jsx": \"react", // Editado para o jsx ser apenas a versão "react"
    "allowSyntheticDefaultImports": true, // Adicionado para comportar o import default de algumas lib, como React e ReactDOM
    ...
}
```

**package.json**

- Adição da variável do Node ```NODE_ENV=test``` para rodar o script dos testes
- Adição da variável do Node ```TZ=UTC``` para não haver distinção de datas no cliente e no server (pelo teste rodar em um ambiente *server-side* com a pipeline)

**api**