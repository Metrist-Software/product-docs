import { extname } from 'node:path'
import {
  mkdtemp,
  readdir,
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

export const maybeMakeTmpDirectory = async (tmpPath) => {
  try {
    return await mkdtemp(tmpPath)
  } catch (_err) {
    return tmpPath
  }
}

export const writeMarkdownDoc = async (path, data) => {
  try {
    return await writeFile(path, data)
  } catch (_err) {
    throw new Error(`Could not write file. Directory does not exist: ${path}`)
  }
}

/*
get folders in manifests folder
|> for each
    -> look for <monitor-logical-name>.md and emit as is to <foldername: author>-<monitor-logical-name>.md
    -> look for <monitor-logicalname>.json and produce .md from template then emit...

make smarter
// check the timestamp of manifest
// adjust index.md also
**/
