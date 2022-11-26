import { config } from '../config.mjs'
import {
  getAllMarkdownDocs,
  getSubDirectories,
  markdownFileName,
  readFileToString,
  writeMarkdownDoc
} from './utils.mjs'
import { join as joinPath } from 'node:path'

console.log(`Starting…`)
console.log(`Getting content from ${config.__manifestsDirectory}`)

const monitorDocsDirectories = await getSubDirectories(config.__manifestsDirectory)

if (Array.isArray(monitorDocsDirectories) === true) console.log(`Found directories. Start processing…`)

monitorDocsDirectories.forEach(async (directory) => {
  console.log(`In ${directory.name}:`)
  const allMarkdownDocs = await getAllMarkdownDocs(joinPath(config.__manifestsDirectory, directory.name))
  if (Array.isArray(allMarkdownDocs) === true) console.log(`Found md files. Will emit to VitePress…`)
  allMarkdownDocs.forEach(async (doc) => {
    const docContent = await readFileToString(joinPath(config.__manifestsDirectory, directory.name, doc.name))
    const newPath = joinPath(config.__vitepressMonitorsDirectory, markdownFileName(joinPath(config.__vitepressMonitorsDirectory,directory.name,doc.name)))
    console.log(`Writing to ${newPath}`)
    const writeResult = await writeMarkdownDoc(newPath, docContent)
    console.log(writeResult)
  })
})
