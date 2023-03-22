import { LoginCredentials } from '../Login'

export type UserRole = {
  createdAt: string
  createdBy: string
  description: string
  editable: boolean
  id: number
  name: string
  protected: boolean
  rights: UserRights[]
  updatedAt: string
  updatedBy: string
}

export type UserRights = {
  description: string
  id: number
  name: string
}

export type User = {
  createdAt: string
  createdBy: string
  email: string
  enabled: boolean
  firstName: string
  id: number
  lastName: string
  locale: string
  mobile: string
  phone: string
  role: UserRole
  source: string
  updatedAt: string
  updatedBy: string
}

export type UpdatedUserData = {
  firstName?: string
  lastName?: string
  email?: string
  mobile?: string
  phone?: string
  locale?: string
  enabled?: boolean
  role?: number
}

export type UserProps = {
  user: {
    lastName: string
    firstName: string
    id: number
    email: string
    phone: string
    mobile: string
    locale: string
    role: {
      id: number
      name: string
    }
    enabled: boolean
  }
  roles: UserRole[]
  handleUpdate: (data: UpdatedUserData) => void
  handlePasswordUpdate: (oldPassword: string, newPassword: string) => void
}

export type PersonalDataFormProps = {
  user: {
    lastName: string
    firstName: string
    email: string
    phone: string
    mobile: string
    locale: string
    enabled: boolean
  }
  handleUpdate: (data: UpdatedUserData) => void
}

export type PasswordChangeFormProps = {
  handlePasswordUpdate: (oldPassword: string, newPassword: string) => void
}

export type ProfileSettingFormProps = {
  user: {
    firstName: string
    lastName: string
    role: {
      id: number
    }
    enabled: boolean
  }
  roles: UserRole[]
  handleUpdate: (data: UpdatedUserData) => void
}

export type ProfileOverviewCardProps = {
  user: {
    lastName: string
    firstName: string
    enabled: boolean
    role: {
      name: string
    }
  }
}

export type Password = Pick<LoginCredentials, 'password'>

export type ChangePassword = {
  verification: string
  password: string
  confirmPassword?: string
}
