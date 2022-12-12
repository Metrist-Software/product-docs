import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { getManifestsJSON } from '../src/httprequest'
import { setupServer } from 'msw/node'
import { http_handler } from './__mocks__/httprequest_handler'

const mockServiceWorker = setupServer(...http_handler)

afterAll(() => mockServiceWorker.close())
afterEach(() => mockServiceWorker.resetHandlers())
beforeAll(() => mockServiceWorker.listen())

describe(`getManifestsJSON()`, () => {

  it(`collects manifests.json from url`, async () => {
    const result = await getManifestsJSON()
    expect(result.status).toBe(200)
    expect(result.data.monitors.length).toBeGreaterThan(1)
  })

})
