import { describe, expect, it } from 'vitest'
import { config } from '../src/config'

describe(`Config values`, () => {

  it.concurrent(`provide paths to markdown template and monitors directory`, () => {
    expect(config.__templatePath).toContain(`/src/template.md`)
    expect(config.__vitepressMonitorDocsDirectory).toContain(`/docs/monitors`)
  })

})
