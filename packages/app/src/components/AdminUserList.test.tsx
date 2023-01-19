import { render } from '@testing-library/react'
import { describe, it } from 'vitest'

import AdminUserList from '@/components/AdminUserList'

describe('AdminUserList', () => {
  it('should render', () => {
    render(<AdminUserList />)
  })
})
