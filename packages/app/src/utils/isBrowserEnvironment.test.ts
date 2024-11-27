import { describe, expect, it } from 'vitest'

import { isBrowserEnvironment } from './isBrowserEnvironment'

describe('isBrowserEnvironment', () => {
  it('should return "true" if invoked in browser', () => {
    const isBrowserEnvironmentValue = isBrowserEnvironment()

    expect(isBrowserEnvironmentValue).toBe(true)
  })

  it('should return "false" if invoked in Node.js', () => {
    // simulate the absence of the window object
    const windowBackup = global.window
    global.window = undefined as unknown as Window & typeof globalThis

    const isBrowserEnvironmentValue = isBrowserEnvironment()

    expect(isBrowserEnvironmentValue).toBe(false)

    global.window = windowBackup
  })
})
