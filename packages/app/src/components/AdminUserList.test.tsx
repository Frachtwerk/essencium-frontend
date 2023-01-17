import { describe, it } from 'vitest'

import { render } from '@testing-library/react'
import AdminUserList from '@/components/AdminUserList'

describe('AdminUserList', () => {
  it('should render', () => {
    render(<AdminUserList />)
  })
})
