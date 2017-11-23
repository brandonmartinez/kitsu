import defaults from 'superagent-defaults'
import prefix from 'superagent-prefix'
import use from 'superagent-use'

const jsonapi = 'application/vnd.api+json'
const superagent = use(defaults()
  .set('Accept', jsonapi)
  .set('Content-Type', jsonapi))

superagent.use(prefix('https://kitsu.io/api/edge'))

export async function agent (method, url) {
  const { body, ok, status } = await superagent[method](url)
  return body
}
