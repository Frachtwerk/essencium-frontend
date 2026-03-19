/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export type GetFilterParams = {
  page: number
  size: number
  sort?: string
  filter?: { [key: string]: string | boolean | undefined }
}

type CreateApi = {
  get: <TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TResponse>>
  put: <TResponse, TBody>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TResponse>>
  patch: <TResponse, TBody>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TResponse>>
  post: <TResponse, TBody>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TResponse>>
  delete: <TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TResponse>>
  interceptors: AxiosInstance['interceptors']
}

function createApi(instance: AxiosInstance): CreateApi {
  return {
    get: <TResponse>(url: string, config: AxiosRequestConfig = {}) =>
      instance.get<TResponse>(url, config),
    put: <TResponse, TBody>(
      url: string,
      body: TBody,
      config: AxiosRequestConfig = {},
    ) => instance.put<TResponse>(url, body, config),
    patch: <TResponse, TBody>(
      url: string,
      body: TBody,
      config: AxiosRequestConfig = {},
    ) => instance.patch<TResponse>(url, body, config),
    post: <TResponse, TBody>(
      url: string,
      body: TBody,
      config: AxiosRequestConfig = {},
    ) => instance.post<TResponse>(url, body, config),
    delete: <TResponse>(url: string, config: AxiosRequestConfig = {}) =>
      instance.delete<TResponse>(url, config),
    interceptors: instance.interceptors,
  }
}

const axiosInstance = axios.create()

export const api = createApi(axiosInstance)

function getStoredAuthToken(): string | null {
  const authToken = localStorage.getItem('authToken')

  if (!authToken) {
    return null
  }

  try {
    const parsedToken = JSON.parse(authToken)

    return typeof parsedToken === 'string' ? parsedToken : null
  } catch {
    return authToken
  }
}

api.interceptors.request.use(
  (request: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    // Need to check if window is defined because this code is also used on server side
    if (typeof window === 'undefined') return request

    if (!request.baseURL) {
      const apiUrl = window.runtimeConfig?.required?.API_URL
      if (apiUrl) {
        request.baseURL = `${apiUrl}/v1`

        axiosInstance.defaults.baseURL = `${apiUrl}/v1`
      }
    }

    const authToken = getStoredAuthToken()

    if (authToken) {
      request.headers.Authorization = `Bearer ${authToken}`
    }

    return request
  },
  (error: AxiosError) => {
    throw error
  },
)

function clearAuthState(): void {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  localStorage.removeItem('rights')
}

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (typeof window === 'undefined') {
      throw error
    }

    if (error?.response?.status === 401) {
      clearAuthState()

      if (!window.location.pathname.includes('/login')) {
        window.location.href = `/login?redirect=${window.location.pathname}`
      }
    }

    throw error
  },
)
