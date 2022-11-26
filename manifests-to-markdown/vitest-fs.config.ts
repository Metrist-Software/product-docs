import { expect } from 'vitest'

// Use all matchers of `vitest-fs`.
import * as matchers from 'vitest-fs'
expect.extend(matchers)

// Use some matchers of `vitest-fs`.
import { toBeFile, toEqualFile } from 'vitest-fs'
expect.extend({ toBeFile, toEqualFile })
