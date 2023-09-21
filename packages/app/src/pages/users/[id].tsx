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

import {
  axiosInstance,
  UpdateUserView,
  UsersResponse,
} from '@frachtwerk/essencium-lib'
import { GetStaticPaths } from 'next'

import { baseGetStaticProps } from '@/utils/next'

export const getStaticProps = baseGetStaticProps()

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: tokenData } = await axiosInstance.post(
    '/auth/token',
    {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  )

  const { data: usersData } = await axiosInstance.get<UsersResponse>('/users', {
    params: {
      page: 0,
      size: 9999,
    },
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  })

  const users = usersData?.content || []

  return {
    paths: users.map(user => ({
      params: {
        id: String(user.id),
      },
    })),
    fallback: true,
  }
}

export default UpdateUserView
