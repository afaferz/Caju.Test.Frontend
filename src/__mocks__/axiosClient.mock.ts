import { AxiosError } from "axios";
import { HttpClient } from "~/data/models/httpClientModel";

class MockAxiosClient extends HttpClient {
    private mockResponses: { [key: string]: { status: number; data: any } } =
        {};

    constructor() {
        super();
    }

    public setMockResponse(
        url: string,
        method: string,
        status: number,
        response: any
    ) {
        this.mockResponses[`${method.toUpperCase()} ${url}`] = {
            status,
            data: response,
        };
    }

    public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        return this.getMockResponse("GET", url, params);
    }

    public async post<T>(url: string, _data: any): Promise<T> {
        return this.getMockResponse("POST", url);
    }

    public async put<T>(url: string, _data: any): Promise<T> {
        return this.getMockResponse("PUT", url);
    }

    public async delete<T>(url: string): Promise<T> {
        return this.getMockResponse("DELETE", url);
    }

    private async getMockResponse<T>(
        method: string,
        url: string,
        params?: Record<string, any>
    ): Promise<T> {
        let key = `${method} ${url}`;
        if (params) {
            const params$1 = new URLSearchParams(params).toString();
            key += `?${params$1}`;
        }
        if (key in this.mockResponses) {
            const { status, data } = this.mockResponses[key];
            if (status >= 200 && status < 300) {
                return data;
            }
            const error = new AxiosError(
                `[AXIOS CLIENT MOCK] error`,
                String(status)
            );
            throw error;
        }
        throw new Error(`No mock response set for ${key}`);
    }
}

export { MockAxiosClient };
