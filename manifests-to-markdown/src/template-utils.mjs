import js_beautify from 'js-beautify'
import { kebabCase } from '@lukaspolak/kebab-case'
import {
  open,
  writeFile
} from 'node:fs/promises'

export const monitorMarkdownFileName = (manifestData) => {
  return `${kebabCase(manifestData.logical_name)}.md`
}

export const packageMarkdownFileName = (pkg) => {
  return `${kebabCase(pkg.logical_name)}_${kebabCase(pkg.package_name)}.md`
}

export const maybeMultiLineTransform = (manifest, keyname) => {
  manifest = { ...manifest, monitor_config: {}, package_links: {}}
  const beautifulOptions = {
    indent_size: 2
  }
  const thisContent = manifest[keyname]
  switch (typeof(thisContent)) {
    case 'object':
        switch (keyname) {
        case 'config_values': {
          const newLines = [`\`\`\`\sh`]
          thisContent.forEach((item) => {
            newLines.push(`\n# ${item.required ? `(Required)` : `(Not required)`} ${item.description}\n${item.environment_variable_name}=""\n`)
          })
          newLines.push(`\`\`\`\n\n`)
          return newLines.join(``)
        }
        case 'package_links': {
          if ('packages' in manifest && manifest.packages.length > 0) {
            const newLines = []
            manifest.packages.forEach((pkg) => {
              newLines.push(`: [${pkg.package_name}](${packageMarkdownFileName(pkg)})`)
            })
            return newLines.join(`\n`)
          } else {
            return ": There are no installable packages for this monitor"
          }
        }
        case 'monitor_config': {
          const monitor_config_syntax = {
            monitor_logical_name: manifest.logical_name,
            interval_secs: 120,
            run_groups: [],
            run_spec: {
              name: manifest.package_name,
              run_type: manifest.runtime_type
            },
            steps: manifest.steps.map((step) => {
              return {
                check_logical_name: step?.logical_name,
                description: step?.description,
                timeout_secs: 900.0
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
        const ifTokenInManifest = (tokenContent !== `monitor_config` && tokenContent !== `package_links` && !Object.hasOwn(manifest, tokenContent)) ? null : maybeMultiLineTransform(manifest, tokenContent)
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
