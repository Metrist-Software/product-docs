import { config } from '../src/config.mjs'
import { describe, expect, it } from 'vitest'
import { join as joinPath } from 'node:path'
import {
  monitorMarkdownFileName,
  maybeMultiLineTransform,
  readFileToArray,
  transformLine,
  writeMarkdownDoc
} from '../src/template-utils.mjs'

describe(`readFileToArray`, () => {

  it(`returns an array of lines`, async () => {
    const fileToRead = config.__monitorTemplatePath
    const linesArray = await readFileToArray(fileToRead)
    expect(Array.isArray(linesArray)).toBe(true)
  })

})

describe(`monitorMarkdownFileName`, () => {

  it.concurrent(`returns a filename of format (kebab-case) <monitor-logical-name>.md`, () => {
    const manifestData = {
      logical_name: `monitorLogicalName`,
      publisher: `publisherName`
    }
    expect(monitorMarkdownFileName(manifestData)).toBe(`monitor-logical-name.md`)
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

    it(`handle 'config_values' item with special treatment`, () => {
      const partialManifest = {
        'config_values': [
          {
            'description': `A description of this var.`,
            'name': 'testname1',
            'environment_variable_name': 'METRIST_ENV_VAR1',
            'required': false
          },
          {
            'description': `A description of this var.`,
            'name': 'testname2',
            'environment_variable_name': 'METRIST_ENV_VAR1',
            'required': true
          }
        ]
      }
      const result = maybeMultiLineTransform(partialManifest, `config_values`)
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

  const mocksPath = joinPath(config.__monitorTemplatePath, `../../__tests__/__mocks__`)

  it.concurrent(`writes a file from array`, async () => {
    const result = await writeMarkdownDoc(
      `${mocksPath}/fixture_from_array.md`,
      [
        `mock data line 1`,
        `\n`,
        `mock data line 2`
      ]
      )
      expect(result).toBe(undefined)
  })

  it.concurrent(`throws error if directory doesn't exist`, async () => {
    await expect(writeMarkdownDoc(`${mocksPath}/nonexistent path/file.md`, `mock data`)).rejects.toThrowError(`Could not write file. Directory does not exist: ${mocksPath}/nonexistent path/file.md`)
  })

})
