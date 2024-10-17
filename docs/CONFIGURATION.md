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
