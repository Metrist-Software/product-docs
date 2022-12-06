import {
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { config } from '../src/config.mjs'
import {
  getAllDocsOfType,
  getSubDirectories,
  markdownFileName,
  maybeDeleteFile,
  maybeMakeTmpDirectory,
  maybeMultiLineTransform,
  readFileToArray,
  readFileToString,
  transformLine,
  writeMarkdownDoc
} from '../src/utils.mjs'
import { extname } from 'node:path'
import { mkdtemp, unlink } from 'node:fs/promises'

const monitorsPath = config.__vitepressMonitorsDirectory
const manifestsPath = config.__manifestsDirectory
const mocksPath = `${manifestsPath.substring(0, manifestsPath.lastIndexOf(`/manifests`))}/__tests__/__mocks__`

vi.mock('node:fs/promises', async () => {
  return {
    ...(await vi.importActual('node:fs/promises')),
    mkdtemp: vi.fn().mockImplementation(async () => null),
    unlink: vi.fn().mockImplementation(async () => null)
  }
})

describe(`config`, () => {

  it.concurrent(`indicates the home directory of vitepress`, () => {
    expect(monitorsPath).toContain(`vitepress/docs/monitors`)
    expect(manifestsPath).toContain(`manifests-to-markdown/manifests`)
    expect(config.__templatePath).toContain(`manifests-to-markdown/src`)
  })

})

describe(`deleteMarkdownFile`, () => {

  it.concurrent(`is quiet on failure. file probably doesn't exist, no need to delete anything`, async () => {
    unlink.mockRejectedValue()
    await expect(await maybeDeleteFile(`non-existent path`)).toBeUndefined()
  })

  it.concurrent(`reports success`, async () => {
    unlink.mockResolvedValue(true)
    const path = `${mocksPath}/a fake/file that will seem to be.deleted`
    expect(await maybeDeleteFile(path)).toBe(true)
  })

})

describe(`readFileToString`, () => {

  it.concurrent(`reads a file`, async () => {
    const result = await readFileToString(`${mocksPath}/a directory/a md file.md`)
    expect(result).toContain(`# some content`)
  })

  it.concurrent(`this can be used to retrieve a json object`, async () => {
    const result = await readFileToString(`${mocksPath}/a directory/a json file.json`)
    const anObjectFromJsonData = JSON.parse(result)
    expect(anObjectFromJsonData).toBeTypeOf('object')
    expect(anObjectFromJsonData.Hi).toBe(`I'm Json.`)
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

describe(`getAllDocsOfType(type, path)`, () => {

  it.concurrent(`returns empty array if directory has no files of given type`, async () => {
    const result = await getAllDocsOfType(`md`, mocksPath)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  it.concurrent(`returns an array of files of given type`, async () => {
    const result = await getAllDocsOfType(`md`, `${mocksPath}/a directory`)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].isFile()).toBe(true)
    result.forEach((file) => {
      expect(extname(file.name)).toBe(`.md`)
    })
  })

  it.concurrent(`throws a relevant error`, async () => {
    await expect(getAllDocsOfType(`md`, `${mocksPath}/nonexistent path/`)).rejects.toThrowError(`Could not retrieve .md files from ${mocksPath}/nonexistent path/`)
  })

})

describe(`markdownFileName`, () => {

  it.concurrent(`expects a format: (kebab-case) <producer-name>_<monitor-logical-name>.json, return .md`, () => {
    expect(markdownFileName(`Many Paths/then_a-filename.MD`)).toBe(`then_a-filename.md`)
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

describe(`line transformations`, () => {

  describe(`transformLine`, () => {

    it(`returns a line, as is, if no handlebar expression`, () => {
      const originalLine = `This should be returned as is.`
      expect(transformLine(originalLine)).toBe(originalLine)
    })

    it(`regexp expression matches with '\' escape character`, () => {
      const originalLine = `Sometimes need to escape, as in frontmatter: \[|'escaped|]`
      expect(transformLine(originalLine, { escaped: 'for the win!' })).toBe(`Sometimes need to escape, as in frontmatter: for the win!`)
    })

    it(`transforms a direct match with 1-line replacement`, () => {
      expect(transformLine(`This [|'matches, so |]was be replaced.`, { 'matches, so ': `` })).toBe(`This was be replaced.`)
    })

    describe(`removes a handlebar expression`, () => {

      it(`that has no matching key in the manifest`, () => {
        const originalLine = `This [|'expression matches the regex, but the json doesn't have data, so this |]will be removed from output.`
        expect(transformLine(originalLine, { but: 'no matching key' })).toBe(`This will be removed from output.`)
      })

      it(`unless it's 'monitor_config' (this hacky exception should be temporary)`, () => {
        const originalLine = `[|'monitor_config|]`
        expect(transformLine(originalLine, { logical_name: 'a name', runtime_type: `a type`, steps: [] })).toContain(`"monitor_logical_name"`)
      })

    })

    describe(`operators: &&`, () => {
      // TODO: consider adjusting the regex to match multi-line content within the token, and then respect whitespace accordingly

      it(`if matching key exists, then also output everything following &&`, () => {
        const originalLine = `This [|'sentence && is|] complete.`
        expect(transformLine(originalLine, { sentence: 'sentence ' })).toBe(`This sentence is complete.`)
      })

      it(`if matching key does not exist, then do not output any following &&`, () => {
        const originalLine = `This sentence is also complete[|'but && ignore this|].`
        expect(transformLine(originalLine, { and: 'blah' })).toBe(`This sentence is also complete.`)
      })

    })
  })

  describe(`maybeMultiLineTransform`, () => {

    it(`transforms a match with multi-line replacement`, () => {
      const result = maybeMultiLineTransform({ aMultiLineThing: { key1: `value 1`, key2: `value 2` } }, `aMultiLineThing`)
      expect(result).toContain(`\n`)
    })

    it(`handle 'environment_variables' item with special treatment`, () => {
      const partialManifest = {
        'environment_variables': [
          {
            'description': `A description of this var.`,
            'name': 'METRIST_ENV_VAR1',
            'required': false
          },
          {
            'description': `A description of this var.`,
            'name': 'METRIST_ENV_VAR2',
            'required': true
          }
        ]
      }
      const result = maybeMultiLineTransform(partialManifest, `environment_variables`)
      expect(result).toContain(`# (Required)`)
      expect(result).toContain(`# (Not required)`)
    })

    it(`handle 'monitor_config' item with special treatment`, () => {
      const partialManifest = {
        logical_name: `myawsomemonitor`,
        runtime_type: `dll`,
        steps: [
          {
            description: `Help text to describe this step.`,
            logical_name: `PingSomething`,
            recommended_timeout_seconds: 900
          },
          {
            logical_name: `CreateSomethingLikeADatabase`,
            recommended_timeout_seconds: 900
          }
        ]
      }
      const result = maybeMultiLineTransform(partialManifest, `monitor_config`)
      expect(result).toContain(`"monitor_logical_name": "myawsomemonitor"`)
    })

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
