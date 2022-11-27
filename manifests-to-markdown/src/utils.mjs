import js_beautify from 'js-beautify'
import { extname } from 'node:path'
import { kebabCase } from '@lukaspolak/kebab-case'
import {
  mkdtemp,
  open,
  readdir,
  readFile,
  writeFile
} from 'node:fs/promises'

export const getAllDocsOfType = async (extension, path) => {
  try {
    const contents = await readdir(path, { withFileTypes: true })
    return contents.filter((item) => {
      return item.isFile() && extname(item.name) === `.${extension}`
    })
  } catch (_err) {
    throw new Error(`Could not retrieve .${extension} files from ${path}`)
  }
}

export const getSubDirectories = async (path) => {
  try {
    const contents = await readdir(path, { withFileTypes: true })
    return contents.filter((item) => {
      return item.isDirectory()
    })
  } catch (_err) {
    throw new Error(`Directory does not exist: ${path}`)
  }
}

export const markdownFileName = (path) => {
  const pathParts = path.split(`/`)
  const kebabCaseFileNameParts = kebabCase(pathParts.pop()).split(`-`)
  const fileExtension = kebabCaseFileNameParts.pop()
  const monitorLogicalName = kebabCaseFileNameParts.join(`-`)
  const producerName = kebabCase(pathParts.pop())
  return `${producerName}_${monitorLogicalName}.${fileExtension}`
}

export const maybeMakeTmpDirectory = async (tmpPath) => {
  try {
    return await mkdtemp(tmpPath)
  } catch (_err) {
    return tmpPath
  }
}

export const maybeMultiLineTransform = (manifest, keyname) => {
  const beautifulOptions = {
    indent_size: 2
  }
  const thisContent = manifest[keyname]
  switch (typeof(thisContent)) {
      case 'object':
      switch (keyname) {
        case 'environment-variables': {
          const newLines = []
          Object.keys(thisContent).forEach((item) => {
            newLines.push(`# ${thisContent[item].required && '(Required)' } ${thisContent[item].description}\n${item}=""`)
          })
          js_beautify(JSON.stringify(thisContent), beautifulOptions)
          return newLines.join(`\n\n`)
        }
        default: return js_beautify(JSON.stringify(thisContent), beautifulOptions)
      }
    default: return thisContent
  }
}

export const readFileToString = async (path) => {
  try {
    return await readFile(path, { encoding: 'utf8' })
  } catch (err) {
    throw new Error(`File cannot be found: ${path}`)
  }
}

export const readFileToArray = async (path) => {
  const file = await open(path)
  const arrayOfLines = []
  for await (const line of file.readLines()){
    arrayOfLines.push(line)
  }
  return arrayOfLines
}

export const transformLine = (line, manifest) => {
  const regex = RegExp(/\\?(\[\|\'[\s]*.*?[\s]*\|\])/g)
  const arrayMaybeTransformed = line.split(regex).map((part) => {
    if (!regex.test(part)) {
      return part
    } else {
      const withThisKeyName = part.substring(3, part.length - 2)
      return Object.hasOwn(manifest, withThisKeyName) ? maybeMultiLineTransform(manifest, withThisKeyName) : part
    }
  })
  return arrayMaybeTransformed.join(``)
}

export const writeMarkdownDoc = async (path, data) => {
  try {
    return await writeFile(path, data)
  } catch (_err) {
    throw new Error(`Could not write file. Directory does not exist: ${path}`)
  }
}
