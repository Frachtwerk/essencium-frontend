import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

type NewType = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>
  put: <T>(
    url: string,
    body: T,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>
  patch: <T>(
    url: string,
    body: T,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>
  post: <T>(
    url: string,
    body: T,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>
}

function createApi(instance: AxiosInstance): NewType {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      instance.get<T>(url, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      instance.put<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      instance.patch<T>(url, body, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      instance.post<T>(url, body, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      instance.delete<T>(url, config),
  }
}

export const api = createApi(axiosInstance)
