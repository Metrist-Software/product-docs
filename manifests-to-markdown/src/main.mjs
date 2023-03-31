import { config } from '../src/config.mjs'
import { getManifestsJSON } from './httprequest.mjs'
import { join as joinPath } from 'node:path'
import {
  monitorMarkdownFileName,
  packageMarkdownFileName,
  readFileToArray,
  transformLine,
  writeMarkdownDoc
} from './template-utils.mjs'

export const renderMonitorDocs = async ({monitors}) => {
  console.log(`Using monitor template: ${config.__monitorTemplatePath}`)
  console.log(`Using package template: ${config.__packageTemplatePath}`)
  console.log(`Will render to ${config.__vitepressMonitorDocsDirectory}`)

  renderDocs(monitors, config.__monitorTemplatePath, monitorMarkdownFileName)
}

export const renderDocs = async (manifests, templatePath, nameGenerator) => {
  const templateAsArray = await readFileToArray(templatePath)

  manifests.forEach((async man => {
    const fileName = nameGenerator(man)

    const newDocContent = templateAsArray.map((line) => {
      return transformLine(line, man)
    })

    console.log(`${fileName}: writing`)

    await writeMarkdownDoc(
      joinPath(config.__vitepressMonitorDocsDirectory, fileName),
      newDocContent.join(`\n`)
    )

    if ('packages' in man) {
      await renderDocs(man.packages, config.__packageTemplatePath, packageMarkdownFileName)
    }
  }))
}


const manifestCollection = await getManifestsJSON()

renderMonitorDocs(manifestCollection.data)
