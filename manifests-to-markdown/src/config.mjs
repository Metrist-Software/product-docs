import { fileURLToPath } from 'node:url'
import { dirname, join as joinPath } from 'node:path'

export const config = {
  __manifestsUrl: `https://monitor-distributions.metrist.io/manifests.json`,
  __monitorTemplatePath: joinPath(dirname(fileURLToPath(import.meta.url)), './monitor_template.md'),
  __packageTemplatePath: joinPath(dirname(fileURLToPath(import.meta.url)), './package_template.md'),
  __vitepressMonitorDocsDirectory: joinPath(dirname(fileURLToPath(import.meta.url)), '../../vitepress/docs/monitors')
}
