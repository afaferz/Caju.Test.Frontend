abstract class HttpClient {
    abstract get<T>(url: string, params?: Record<string, any>): Promise<T>;
    abstract post<T>(url: string, data: any): Promise<T>;
    abstract put<T>(url: string, data: any): Promise<T>;
    abstract delete<T>(url: string): Promise<T>;
}

export { HttpClient };
