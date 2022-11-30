import { config } from './config.mjs'
import { watch } from 'node:fs/promises'
import {
  markdownFileName,
  readFileToString,
  readFileToArray,
  maybeDeleteFile,
  transformLine,
  writeMarkdownDoc
} from './utils.mjs'
import { join as joinPath } from 'node:path'

console.log(`Starting manifest watcher`)
console.log(`Using markdown template: ${config.__templatePath}`)
const templateAsArray = await readFileToArray(config.__templatePath)
const AbortWatcherController = new AbortController()
const { signal } = AbortWatcherController
AbortWatcherController.signal.addEventListener(`abort`, (event) => { console.log(`An '${event.type}' event occured.`) }, { once: true })

const startWatcher = async (callback) => {
  console.log(`Will watch files in 'manifest' directory: ${config.__manifestsDirectory}`)
  try {
    const watcher = watch(config.__manifestsDirectory, {
      persistent: true,
      recursive: true,
      signal: signal
    })
    for await (const event of watcher) {
      callback(event)
    }
  }
  catch (err) {
    console.log(err)
    if (err.name === `AbortError`) return
    throw err
  }
}

const eventsListener = async (event) => {
  console.log(`Handle ${event.eventType} event on ${event.filename}`)
  const markdownFilePath = joinPath(config.__vitepressMonitorsDirectory, markdownFileName(joinPath(config.__vitepressMonitorsDirectory,event.filename.replace(/json/gi, 'md'))))
  if(
    event.eventType === `rename` ||
    event.eventType === `change`
  ) {
    try {
      const jsonContent = await readFileToString(joinPath(config.__manifestsDirectory, event.filename))
      console.log(`Parsing JSON for ${event.filename}`)
      const manifestData = JSON.parse(jsonContent)
      const newDocContent = templateAsArray.map((line) => {
        return transformLine(line, manifestData)
      })
      console.log(`Writing to ${markdownFilePath}`)
      await writeMarkdownDoc(markdownFilePath, newDocContent.join(`\n`))
    } catch (err) {
      console.log(`Rename event on ${event.filename} looks like a delete`)
      maybeDeleteFile(markdownFilePath)
    }
  } else {
    console.log(`${event.eventType} not implemented`)
  }
}

startWatcher(eventsListener)
