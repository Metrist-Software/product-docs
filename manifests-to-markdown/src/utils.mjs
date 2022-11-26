import { mkdtemp, readdir } from 'node:fs/promises'

export const getSubDirectories = async (path) => {
  try {
    const contents = await readdir(path, { withFileTypes: true })
    return contents.filter((item) => {
      return item.isDirectory()
    })
  } catch (err) {
    throw new Error(`Directory does not exist: ${path}`)
  }
}

export const maybeMakeTmpDirectory = async (tmpPath) => {
  try {
    return await mkdtemp(tmpPath)
  } catch (err) {
    return tmpPath
  }
}

// iterate through folders
// check the timestamp of manifest
// grab recent manifest
// get the template
// parse the manifest into the template
// write the file to new location
// get the index template
// write the index.md
// copy the index.md
