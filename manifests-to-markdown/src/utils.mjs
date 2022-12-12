import js_beautify from 'js-beautify'
import { extname } from 'node:path'
import { kebabCase } from '@lukaspolak/kebab-case'
import {
  mkdtemp,
  open,
  readdir,
  readFile,
  unlink,
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
  const fileName = pathParts.pop()
  const kebabCaseProducerName = kebabCase(fileName.split(`_`).shift())
  const kebabCaseFileNameParts = kebabCase(fileName.split(`_`).pop()).split(`-`)
  const fileExtension = kebabCaseFileNameParts.pop()
  const newFileName = `${kebabCaseProducerName}_${kebabCaseFileNameParts.join(`-`)}.${fileExtension}`
  return newFileName
}

export const maybeDeleteFile = async (path) => {
  try {
    const result = await unlink(path)
    return result
  } catch (_err) {
    return
  }
}

export const maybeMakeTmpDirectory = async (tmpPath) => {
  try {
    return await mkdtemp(tmpPath)
  } catch (_err) {
    return tmpPath
  }
}

export const maybeMultiLineTransform = (manifest, keyname) => {
  manifest = { ...manifest, monitor_config: {}}
  const beautifulOptions = {
    indent_size: 2
  }
  const thisContent = manifest[keyname]
  switch (typeof(thisContent)) {
    case 'object':
        switch (keyname) {
        case 'environment_variables': {
          const newLines = [`\`\`\`\sh`]
          thisContent.forEach((item) => {
            newLines.push(`\n# ${item.required ? `(Required)` : `(Not required)`} ${item.description}\n${item.name}=""\n`)
          })
          newLines.push(`\`\`\`\n\n`)
          return newLines.join(``)
        }
        case 'monitor_config': {
          const monitor_config_syntax = {
            monitor_logical_name: manifest.logical_name,
            interval_secs: 120,
            run_groups: [`match-one`, `or-more`, `run-groups`],
            run_spec: {
              name: manifest.logical_name,
              run_type: manifest.runtime_type
            },
            steps: manifest.steps.map((step) => {
              return {
                check_logical_name: step?.logical_name,
                description: step?.description
              }
            })
          }
          return [
            `\`\`\`\json\n`,
            js_beautify(JSON.stringify(monitor_config_syntax), beautifulOptions),
            `\n\`\`\`\n\n`
          ].join(``)
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
  const tokenRegex = RegExp(/\\?(\[\|\'[\s]*.*?[\s]*\|\])/g)
  const arrayLineMaybeTransformed = line.split(tokenRegex).map((partOfLine) => {
    if (!tokenRegex.test(partOfLine)) {
      return partOfLine
    } else {
      const tokenContent = ((completeToken) => {
        const token_withoutHead = completeToken.substring(3)
        const token_withoutHeadOrTail = token_withoutHead.substring(0, token_withoutHead.length - 2)
        return token_withoutHeadOrTail
      })(partOfLine)

      const operatorRegex = RegExp(/(\s+&&\s+)/gm)

      if (!operatorRegex.test(tokenContent)) {
        const ifTokenInManifest = (tokenContent !== `monitor_config` && !Object.hasOwn(manifest, tokenContent)) ? null : maybeMultiLineTransform(manifest, tokenContent)
        return ifTokenInManifest

      } else {

        const arrayTokenParts = tokenContent.split(operatorRegex).filter((el) => {
          return !operatorRegex.test(el)
        })

        const tokenKey = arrayTokenParts.shift()
        const tokenAppendedContent = arrayTokenParts.join(``)
        const ifTokenKeyInManifest = !Object.hasOwn(manifest, tokenKey) ? null : `${maybeMultiLineTransform(manifest, tokenKey)}${tokenAppendedContent}`
        return ifTokenKeyInManifest
      }
    }
  })
  return arrayLineMaybeTransformed.join(``)
}

export const writeMarkdownDoc = async (path, data) => {
  try {
    return await writeFile(path, data)
  } catch (_err) {
    throw new Error(`Could not write file. Directory does not exist: ${path}`)
  }
}
