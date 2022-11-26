import { extname } from 'node:path'
import { kebabCase } from '@lukaspolak/kebab-case'
import {
  mkdtemp,
  readdir,
  readFile,
  writeFile
} from 'node:fs/promises'

export const getAllMarkdownDocs = async (path) => {
  try {
    const contents = await readdir(path, { withFileTypes: true })
    return contents.filter((item) => {
      return item.isFile() && extname(item.name) === `.md`
    })
  } catch (_err) {
    throw new Error(`Could not retrieve .md files: ${path}`)
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

export const readFileToString = async (path) => {
  try {
    return await readFile(path, { encoding: 'utf8' })
  } catch (err) {
    throw new Error(`File cannot be found: ${path}`)
  }
}

export const writeMarkdownDoc = async (path, data) => {
  try {
    return await writeFile(path, data)
  } catch (_err) {
    throw new Error(`Could not write file. Directory does not exist: ${path}`)
  }
}
