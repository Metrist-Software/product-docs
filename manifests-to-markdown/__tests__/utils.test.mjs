import {
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { config } from '../config.mjs'
import {
  getAllMarkdownDocs,
  getSubDirectories,
  markdownFileName,
  maybeMakeTmpDirectory,
  readFileToArray,
  readFileToString,
  streamLinesToFile,
  writeMarkdownDoc
} from '../src/utils.mjs'
import { extname } from 'node:path'
import { mkdtemp } from 'node:fs/promises'

const monitorsPath = config.__vitepressMonitorsDirectory
const manifestsPath = config.__manifestsDirectory
const mocksPath = `${manifestsPath.substring(0, manifestsPath.lastIndexOf(`/manifests`))}/__tests__/__mocks__`

vi.mock('node:fs/promises', async () => {
  return {
    ...(await vi.importActual('node:fs/promises')),
    mkdtemp: vi.fn().mockImplementation(async () => null)
  }
})

describe(`config`, () => {

  it.concurrent(`indicates the home directory of vitepress`, () => {
    expect(monitorsPath).toContain(`vitepress/docs/monitors/shared`)
    expect(manifestsPath).toContain(`manifests-to-markdown/manifests`)
  })

})

describe(`readFileToString`, () => {

  it.concurrent(`reads a file`, async () => {
    const result = await readFileToString(`${mocksPath}/a directory/a md file.md`)
    expect(result).toContain(`# some content`)
  })

  it.concurrent(`throws error if file doesn't exist`, async () => {
    await expect(readFileToString(`${mocksPath}/nonexistent path/new.md`)).rejects.toThrowError(`File cannot be found: ${mocksPath}/nonexistent path/new.md`)
  })

})

describe(`readFileToArray`, () => {

  it(`returns an array of lines`, async () => {
    const fileToRead = `${manifestsPath.substring(0, manifestsPath.lastIndexOf(`/manifests`))}/__tests__/__mocks__/a directory/a md file.md`
    const linesArray = await readFileToArray(fileToRead)
    expect(Array.isArray(linesArray)).toBe(true)
  })

})

describe(`getAllDirectories`, () => {

  it.concurrent(`throws an error if directory doesn't exist`, async () => {
    await expect(getSubDirectories(`nonexistent path`)).rejects.toThrowError(`Directory does not exist: nonexistent path`)
  })

  it.concurrent(`returns empty array if directory is empty`, async () => {
    const result = await getSubDirectories(`${mocksPath}/a directory`)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  it(`returns an array of dirent objects`, async () => {
    const result = await getSubDirectories(mocksPath)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].isDirectory()).toBe(true)
    result.forEach((dir) => {
      expect(dir.isDirectory()).toBe(true)
    })
  })

})

describe(`getAllMarkdownDocs`, () => {

  it.concurrent(`returns empty array if directory has no *.md files`, async () => {
    const result = await getAllMarkdownDocs(mocksPath)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  it(`returns an array of .md files`, async () => {
    const result = await getAllMarkdownDocs(`${mocksPath}/a directory`)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].isFile()).toBe(true)
    result.forEach((file) => {
      expect(extname(file.name)).toBe(`.md`)
    })
  })

})

describe(`markdownFileName`, () => {

  it.concurrent(`returns a better filename format, kebab-case: <producer-name>.<monitor-logical-name>.md`, () => {
    expect(markdownFileName(`Many Paths/But at least ONE/Then a file.MD`)).toBe(`but-at-least-one_then-a-file.md`)
  })

})

describe(`maybeMakeTmpDirectory`, () => {

  afterEach(() => {
    vi.resetAllMocks()
    vi.restoreAllMocks()
  })

  it(`doesn't remake existing directory and returns its path`, async () => {
    mkdtemp.mockResolvedValue(`mock path`)
    const aNewPath = `${monitorsPath}/new`
    const result = await maybeMakeTmpDirectory(aNewPath)
    expect(mkdtemp).toHaveBeenCalledTimes(1)
    expect(result).toBe(`mock path`)
  })

  it(`make new directory and returns its path`, async () => {
    mkdtemp.mockRejectedValue()
    const aNewPath = `${monitorsPath}/new`
    const result = await maybeMakeTmpDirectory(aNewPath)
    expect(mkdtemp).toHaveBeenCalledTimes(1)
    expect(result).toBe(aNewPath)
  })

})

describe(`writeMarkdownDoc`, () => {

  it.concurrent(`writes a file from text`, async () => {
    const result = await writeMarkdownDoc(
      `${mocksPath}/tmp_directory/new-from-text.md`,
      `mock data`
    )
    expect(result).toBe(undefined)
  })

  it.concurrent(`writes a file from array`, async () => {
    const result = await writeMarkdownDoc(
      `${mocksPath}/tmp_directory/new-from-array.md`,
      [
        `mock data line 1`,
        `\n`,
        `mock data line 2`
      ]
    )
    expect(result).toBe(undefined)
  })

  it.concurrent(`throws error if directory doesn't exist`, async () => {
    await expect(writeMarkdownDoc(`${mocksPath}/nonexistent path/new.md`, `mock data`)).rejects.toThrowError(`Could not write file. Directory does not exist: ${mocksPath}/nonexistent path/new.md`)
  })

})
