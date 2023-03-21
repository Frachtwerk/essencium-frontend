import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
})

axiosInstance.interceptors.request.use(request => {
  const authToken = localStorage.getItem('authToken')

  if (authToken && authToken !== 'null') {
    request.headers.Authorization = `Bearer ${authToken.slice(1, -1)}`
  }

  return request
})

type CreateApi = {
  get: <TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TResponse>>
  put: <TResponse, TBody>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TResponse>>
  patch: <TResponse, TBody>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TResponse>>
  post: <TResponse, TBody>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TResponse>>
  delete: <TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TResponse>>
}

function createApi(instance: AxiosInstance): CreateApi {
  return {
    get: <TResponse>(url: string, config: AxiosRequestConfig = {}) =>
      instance.get<TResponse>(url, config),
    put: <TResponse, TBody>(
      url: string,
      body: TBody,
      config: AxiosRequestConfig = {}
    ) => instance.put<TResponse>(url, body, config),
    patch: <TResponse, TBody>(
      url: string,
      body: TBody,
      config: AxiosRequestConfig = {}
    ) => instance.patch<TResponse>(url, body, config),
    post: <TResponse, TBody>(
      url: string,
      body: TBody,
      config: AxiosRequestConfig = {}
    ) => instance.post<TResponse>(url, body, config),
    delete: <TResponse>(url: string, config: AxiosRequestConfig = {}) =>
      instance.delete<TResponse>(url, config),
  }
}

export const api = createApi(axiosInstance)
