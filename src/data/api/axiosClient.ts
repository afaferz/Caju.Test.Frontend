import axios, { AxiosInstance } from "axios";
import { HttpClient } from "../models/httpClientModel";
import configProvider from "~/config";
import singleton from "~/lib/injection/singleton";

class AxiosClient extends HttpClient {
    private _instance!: AxiosInstance;

    constructor() {
        super();
        this._load();
    }

    private async _load() {
        const config = await configProvider().get();
        this._instance = axios.create({
            baseURL: config.host ?? "http://localhost:3000",
        });

        const accessToken = "";
        this._instance.interceptors.request.use((config) => {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            return config;
        });
    }

    public getInstance(): AxiosInstance {
        return this._instance;
    }

    public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        const response = await this._instance.get<T>(url, { params });
        return response.data;
    }

    public async post<T>(url: string, data: any): Promise<T> {
        const response = await this._instance.post<T>(url, data);
        return response.data;
    }

    public async put<T>(url: string, data: any): Promise<T> {
        const response = await this._instance.put<T>(url, data);
        return response.data;
    }

    public async delete<T>(url: string): Promise<T> {
        const response = await this._instance.delete<T>(url);
        return response.data;
    }
}

const axiosClient = singleton(() => new AxiosClient(), []);
export default axiosClient;
