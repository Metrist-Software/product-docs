import axios from 'axios'

export const getManifestsJSON = async () => {
  const response = await axios({
    method: 'get',
    url: `https://assets.metrist.io/dist/monitors/manifests-preview.json`
  })
  return response
}
