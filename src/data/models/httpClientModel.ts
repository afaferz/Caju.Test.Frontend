abstract class HttpClient {
    // Método abstrato para fazer uma requisição GET
    abstract get<T>(url: string, params?: Record<string, any>): Promise<T>;

    // Método abstrato para fazer uma requisição POST
    abstract post<T>(url: string, data: any): Promise<T>;

    // Método abstrato para fazer uma requisição PUT
    abstract put<T>(url: string, data: any): Promise<T>;

    // Método abstrato para fazer uma requisição DELETE
    abstract delete<T>(url: string): Promise<T>;
}

export { HttpClient };
