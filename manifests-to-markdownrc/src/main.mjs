import { config } from '../src/config.mjs'
import { getManifestsJSON } from './httprequest.mjs'
import { join as joinPath } from 'node:path'
import {
  markdownFileName,
  readFileToArray,
  transformLine,
  writeMarkdownDoc
} from './template-utils.mjs'

export const renderMonitorDocs = async ({monitors}) => {

  let counter = 0

  console.log(`Using template: ${config.__templatePath}`)
  console.log(`Will render to ${config.__vitepressMonitorDocsDirectory}`)

  const templateAsArray = await readFileToArray(config.__templatePath)

  monitors.forEach(async (manifest) => {

    console.log(`Rendering ${++counter}`)

    const fileName = markdownFileName(manifest)

    const newDocContent = templateAsArray.map((line) => {
      return transformLine(line, manifest)
    })

    console.log(`${fileName}: writing`)

    await writeMarkdownDoc(
      joinPath(config.__vitepressMonitorDocsDirectory, fileName),
      newDocContent.join(`\n`)
    )

  })

  return `Monitors rendered: ${counter}`

}


const manifestCollection = await getManifestsJSON()

renderMonitorDocs(manifestCollection.data)
