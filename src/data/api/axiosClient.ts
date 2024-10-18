import axios, { AxiosInstance } from "axios";
import { HttpClient } from "../models/httpClientModel";
import configProvider from "~/config";
import singleton from "~/lib/injection/singleton";

class AxiosClient extends HttpClient {
    private static _instance: AxiosInstance;

    constructor() {
        super();
    }

    public static async load() {
        await AxiosClient.prototype._load();
    }
    private async _load() {
        const config = await configProvider().get();
        const instance = axios.create({
            baseURL: config.host ?? "http://localhost:3000",
        });

        const accessToken = "";
        instance.interceptors.request.use((config) => {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            return config;
        });
        AxiosClient._instance = instance;
    }

    public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        if (!AxiosClient._instance) return Promise.reject(void 0);
        const response = await AxiosClient._instance.get<T>(url, {
            params,
        });
        return response.data;
    }

    public async post<T>(url: string, data: any): Promise<T> {
        const response = await AxiosClient._instance.post<T>(url, data);
        return response.data;
    }

    public async put<T>(url: string, data: any): Promise<T> {
        const response = await AxiosClient._instance.put<T>(url, data);
        return response.data;
    }

    public async delete<T>(url: string): Promise<T> {
        const response = await AxiosClient._instance.delete<T>(url);
        return response.data;
    }
}

// Executa a função apenas para gerar a instância do Axios dentro da class
(async () => await AxiosClient.load())();

const axiosClient = singleton(() => new AxiosClient(), []);
export default axiosClient;
