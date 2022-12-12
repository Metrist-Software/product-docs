import axios from 'axios'
import { config } from './config'

export const getManifestsJSON = async () => {
  const response = await axios({
    headers: { 'Accept-Encoding': `gzip,deflate,compress` }, // related to https://github.com/axios/axios/issues/5346
    method: `get`,
    url: config.__manifestsUrl
  })
  return response
}
