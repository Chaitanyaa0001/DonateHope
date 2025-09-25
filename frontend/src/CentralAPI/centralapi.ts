import api from "./axios";

export interface APIOptions<TData = undefined> {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: TData;
}
export const callAPI = async <TResponse, TData = undefined>({method,url,data}: APIOptions<TData>): Promise<TResponse> => {
    try {
        const response = await api({ method, url, data });
        return response.data as TResponse;
    }catch (error) {
        console.error("API central error:", error);
        throw error;
    }
};
