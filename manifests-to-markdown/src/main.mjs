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

  let counter = 0

  console.log(`Using template: ${config.__monitorTemplatePath}`)
  console.log(`Will render to ${config.__vitepressMonitorDocsDirectory}`)

  const monitorTemplateAsArray = await readFileToArray(config.__monitorTemplatePath)

  monitors.forEach(async (manifest) => {

    console.log(`Rendering ${manifest.logical_name}`)

    const fileName = monitorMarkdownFileName(manifest)

    const newDocContent = monitorTemplateAsArray.map((line) => {
      return transformLine(line, manifest)
    })

    console.log(`${fileName}: writing`)

    await writeMarkdownDoc(
      joinPath(config.__vitepressMonitorDocsDirectory, fileName),
      newDocContent.join(`\n`)
    )

    if ('packages' in manifest) {
      await renderPackageDocs(manifest.packages)
    }
  })

  return `Monitors rendered: ${counter}`

}

export const renderPackageDocs = async (packages) => {
  const packageTemplateAsArray = await readFileToArray(config.__packageTemplatePath)

  packages.forEach((async pkg => {
    console.log(`Rendering package doc ${pkg.package_name}`)

    const fileName = packageMarkdownFileName(pkg)

    const newDocContent = packageTemplateAsArray.map((line) => {
      return transformLine(line, pkg)
    })

    console.log(`${fileName}: writing`)

    await writeMarkdownDoc(
      joinPath(config.__vitepressMonitorDocsDirectory, fileName),
      newDocContent.join(`\n`)
    )
  }))
}


const manifestCollection = await getManifestsJSON()

renderMonitorDocs(manifestCollection.data)
