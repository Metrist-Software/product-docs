import { getManifestsJSON } from './httprequest.mjs'

const manifests = await getManifestsJSON()

console.dir(manifests)
