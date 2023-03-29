import { describe, expect, it } from 'vitest'
import { config } from '../src/config.mjs'

describe(`Config values`, () => {

  it.concurrent(`provide path to manifests public url`, () => {
    expect(config.__manifestsUrl).toBe(`https://monitor-distributions.metrist.io/manifests.json`)
  })

  it.concurrent(`provide path to markdown monitor template`, () => {
    expect(config.__monitorTemplatePath).toContain(`/src/monitor_template.md`)
  })

  it.concurrent(`provide path to markdown package template`, () => {
    expect(config.__packageTemplatePath).toContain(`/src/package_template.md`)
  })

  it.concurrent(`provide path to monitors directory`, () => {
    expect(config.__vitepressMonitorDocsDirectory).toContain(`/docs/monitors`)
  })

})
