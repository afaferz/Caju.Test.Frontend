// Define a função de construção para o singleton
type ConstructionFn<T = any> = (...args: any[]) => T;
type DependencieFn = () => any;

// Define a interface base para as funções de injeção
interface BaseActivationFn<T = any, Deps = any> {
    (): T;
    setDeps(deps: Deps[]): BaseActivationFn<T, Deps>;
    getDeps(): Deps[];
}

// Define a interface para as funções que podem ser resetadas no singleton
interface ResetableActivationFn<T = any> {
    reset(): T;
}

// Define a função de ativação que pode ser usada como função de construção para o singleton
type ActivationFn<T = any> = BaseActivationFn<T, DependencieFn>;

// Define a função de ativação que pode ser usada como função de construção para o singleton,
// com suporte para resetar a função de ativação
type SingletonFn<T> = ActivationFn<T> & ResetableActivationFn<SingletonFn<T>>;

export default function singleton<T>(
    constructorFn: ConstructionFn<T>,
    deps: DependencieFn[] = []
): SingletonFn<T> {
    let instance: T | null = null;

    const activationFn = () => {
        if (!instance) {
            const deps$1 = deps.map((_fn) => _fn()); // Inicializa as dependências
            instance = constructorFn.apply(null, deps$1); // Inicializa para a instância as dependências já resolvidas
        }
        return instance;
    };

    activationFn.reset = () => {
        instance = null; // Reseta a instância para reexecutar a função de construção
        return activationFn;
    };

    activationFn.setDeps = (args: DependencieFn[]) => {
        activationFn.reset();
        deps = args;
        return activationFn;
    };

    activationFn.getDeps = () => deps;

    return activationFn as SingletonFn<T>;
}
