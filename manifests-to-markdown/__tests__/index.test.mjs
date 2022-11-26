import { config } from '../config.mjs'
import {
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { maybeMakeTmpDirectory } from '../src'

describe(`config`, () => {
  it(`indicates the home directory of vitepress`, () => {
    expect(config.__vitepressMonitorsFolder).toContain(`vitepress/docs/monitors/shared`)
  })
})

describe(`maybeMakeTmpDirectory`, () => {
  afterEach(() => {
    vi.resetAllMocks()
    vi.restoreAllMocks()
  })
  const aPath = config.__vitepressMonitorsFolder
  it(`doesn't remake existing directory and returns its path`, async () => {
    vi.mock('node:fs/promises', async () => {
      return {
        ...(await vi.importActual('node:fs/promises')),
        mkdtemp: vi.fn().mockRejectedValue('rejected')
      }
    })
    const { mkdtemp } = await import ('node:fs/promises')
    const result = await maybeMakeTmpDirectory(aPath)
    // expect(mkdtemp).toHaveBeenCalledTimes(1)
    expect(result).toBe(aPath)
  })
  it(`make new directory and returns its path`, async () => {
    const aPath = `new path`
    vi.mock('node:fs/promises', async () => {
      return {
        ...(await vi.importActual('node:fs/promises')),
        mkdtemp: vi.fn().mockResolvedValue('a mock path')
      }
    })
    const { mkdtemp } = await import ('node:fs/promises')
    const result = await maybeMakeTmpDirectory(aPath)
    expect(mkdtemp).toHaveBeenCalledTimes(1)
    expect(result).toBe(undefined)
  })
})
