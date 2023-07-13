import { logout } from '@frachtwerk/essencium-lib'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    // Need to check if window is defined because this code is also used on server side
    if (typeof window === 'undefined') return request

    const authToken = JSON.parse(localStorage.getItem('authToken') as string)

    if (authToken) {
      request.headers.Authorization = `Bearer ${authToken}`
    }

    return request
  },
  (error: AxiosError) => {
    throw error
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      logout()

      if (window.location.pathname !== '/login') window.location.href = '/login'
    }

    throw error
  }
)

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
