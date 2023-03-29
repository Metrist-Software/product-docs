import { describe, expect, it } from 'vitest'
import { config } from '../src/config.mjs'

describe(`Config values`, () => {

  it.concurrent(`provide path to manifests public url`, () => {
    expect(config.__manifestsUrl).toBe(`https://monitor-distributions.metrist.io/manifests.json`)
  })

  it.concurrent(`provide path to markdown template`, () => {
    expect(config.__templatePath).toContain(`/src/template.md`)
  })

  it.concurrent(`provide path to monitors directory`, () => {
    expect(config.__vitepressMonitorDocsDirectory).toContain(`/docs/monitors`)
  })

})