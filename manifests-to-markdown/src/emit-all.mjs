import { config } from './config.mjs'
import {
  getAllDocsOfType,
  getSubDirectories,
  markdownFileName,
  readFileToArray,
  readFileToString,
  transformLine,
  writeMarkdownDoc
} from './utils.mjs'
import { join as joinPath } from 'node:path'

console.log(`Starting…`)
console.log(`Getting manifest documents from ${config.__manifestsDirectory}`)

const manifestDirectories = await getSubDirectories(config.__manifestsDirectory)

if (Array.isArray(manifestDirectories)) console.log(`Found directories. Start processing…`)

manifestDirectories.forEach(async (directory) => {

  console.log(`In directory: ${directory.name}`)

  const allJsonDocs = await getAllDocsOfType(`json`, joinPath(config.__manifestsDirectory, directory.name))
  if (Array.isArray(allJsonDocs)) {
    const templatePath = joinPath(config.__manifestsDirectory,`../src/template.md`)
    console.log(`Found json files. Will emit, with template, to VitePress`)
    console.log(`Getting template: ${templatePath}`)
    const templateAsArray = await readFileToArray(templatePath)
    allJsonDocs.forEach(async (jsonDoc) => {
      const docContent = await readFileToString(joinPath(config.__manifestsDirectory, directory.name, jsonDoc.name))
      console.log(`Parsing JSON for ${jsonDoc.name}`)
      const manifestData = JSON.parse(docContent)
      const newDocContent = templateAsArray.map((line) => {
        return transformLine(line, manifestData)
      })
      const newPath = joinPath(config.__vitepressMonitorsDirectory, markdownFileName(joinPath(config.__vitepressMonitorsDirectory,directory.name,jsonDoc.name.replace(/json/gi, 'md'))))
      console.log(`Writing to ${newPath}`)
      await writeMarkdownDoc(newPath, newDocContent.join(`\n`))
    })
  }

})
