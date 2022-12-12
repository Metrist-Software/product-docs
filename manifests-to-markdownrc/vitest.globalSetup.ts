import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const restHandlers = [
  rest.get(`https://assets.metrist.io/dist/monitors/manifests-preview.json`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({})
    )
  }),
]



export default async () => {
  const server = setupServer(...restHandlers)

  // // // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: `error` }))

  // // //  Close server after all tests
  // afterAll(() => server.close())

  // // // Reset handlers after each test `important for test isolation`
  // afterEach(() => server.resetHandlers())

  return async () => {
    // teardown if necessary
  }
}
