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

/* eslint-disable no-console */

import { faker } from '@faker-js/faker'
import {
  RightOutput,
  RoleOutput,
  UserOutput,
} from '@frachtwerk/essencium-types'
import axios, { AxiosError, AxiosResponse } from 'axios'

const CONFIG = {
  NUM_ENTITIES: 50,
  AVAILABLE_LOCALES: ['en', 'de'],
  ADMIN_USERNAME: '',
  ADMIN_PASSWORD: '',
  BASE_URL: 'https://backend.staging.essencium.dev',
  ROLES_TO_KEEP: ['ADMIN', 'USER'],
}

async function seedDatabase(): Promise<void> {
  console.log('🌱 Started seeding database')

  console.log(`➡ Creating ${CONFIG.NUM_ENTITIES} users and roles`)

  let accessToken = ''

  // Setup axios instance
  console.log('➡ Setting up axios instance')

  const axiosInstance = axios.create({
    baseURL: CONFIG.BASE_URL,
  })

  axiosInstance.interceptors.request.use(
    request => {
      request.headers.Authorization = `Bearer ${accessToken}`

      return request
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    },
  )

  // Authenticate and set access token
  console.log('➡ Authenticating')

  const { data } = await axiosInstance.post('/auth/token', {
    username: CONFIG.ADMIN_USERNAME,
    password: CONFIG.ADMIN_PASSWORD,
  })

  accessToken = data.token

  // Delete all users and roles to have a clean state
  console.log('➡ Deleting existing users and roles')

  const { data: users } = await axiosInstance.get('/v1/users')

  await Promise.all(
    users.content
      .filter((user: UserOutput) => user.email !== CONFIG.ADMIN_USERNAME)
      .map((user: UserOutput) => {
        return axiosInstance.delete(`/v1/users/${user.id}`)
      }),
  )

  const { data: roles } = await axiosInstance.get('/v1/roles')

  await Promise.all(
    roles.content
      .filter((role: RoleOutput) => !CONFIG.ROLES_TO_KEEP.includes(role.name))
      .map((role: RoleOutput) => {
        return axiosInstance.delete(`/v1/roles/${role.id}`)
      }),
  )

  // Create new roles and users
  console.log('➡ Creating new roles and users')

  const { data: rights } = await axiosInstance.get('/v1/rights')

  const createdRolesResponse = await Promise.all(
    Array(CONFIG.NUM_ENTITIES)
      .fill(null)
      .map(() => {
        return axiosInstance
          .post<RoleOutput>('/v1/roles', {
            description: faker.name.jobTitle(),
            editable: faker.datatype.boolean(),
            name: faker.name.jobType().toUpperCase(),
            protected: faker.datatype.boolean(),
            rights: faker.helpers.arrayElements(
              rights.content.map((right: RightOutput) => right.id),
            ),
          })
          .catch((error: AxiosError) => {
            if (error?.response?.status !== 409) {
              console.log(error?.response?.data)
            }

            return null
          })
      }),
  )

  const createdRoles = createdRolesResponse
    .filter(
      (response): response is AxiosResponse<RoleOutput> => response !== null,
    )
    .map(response => response.data)

  await Promise.all(
    Array(CONFIG.NUM_ENTITIES)
      .fill(null)
      .map(() => {
        return axiosInstance
          .post('/v1/users', {
            email: faker.internet.email(),
            enabled: faker.datatype.boolean(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            locale: faker.helpers.arrayElement(CONFIG.AVAILABLE_LOCALES),
            mobile: faker.phone.number(),
            role: faker.helpers.arrayElement(
              createdRoles.map((role: RoleOutput) => role.id),
            ),
          })
          .catch((error: AxiosError) => {
            if (error?.response?.status !== 409) {
              console.log(error?.response?.data)
            }

            return null
          })
      }),
  )

  console.log('✅ Seeding successful')
}

seedDatabase()
