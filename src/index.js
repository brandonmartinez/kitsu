import { version } from '../package.json'
import auth from './methods/auth'
import get from './methods/get'
import patch from './methods/patch'
import post from './methods/post'
import remove from './methods/remove'
import whoAmI from './methods/whoAmI'

/**
 * JSON API `accept` and `content-type` headers are set
 * automatically
 * @param {Object} opts Options
 * @param {String} opts.apiUrl Override the HTTP API endpoint (default `https://kitsu.io/api`)
 * @param {String} opts.apiVer Override the API version (default `edge`)
 * @param {Number} opts.timeout Timeout in milliseconds (default `30000`)
 * @param {Number} opts.retries Times to retry requests after network failures (default `2`)
 * @param {Object} opts.headers Headers to send with requests
 * @param {Boolean} opts.useElectronNet Use `electron.net` when used with Electron (default `true`)
 *
 * @example
 * // Basic
 * const kitsu = new Kitsu()
 *
 * @example
 * // Set a custom `user-agent` header and reuse your authorization
 * // `accessToken`
 * const kitsu = new Kitsu({
 *  headers: {
 *    'user-agent': 'MyApp/1.0.0 (contact or link to repo)',
 *    authorization: 'Bearer 1234567890'
 *  }
 * })
 *
 * @example
 * // Use with a different JSON-API server
 * const example = new Kitsu({
 *   apiUrl: 'https://example.org/api'
 * })
 */
export default class Kitsu {
  constructor (opts = {}) {
    // Set API Url
    this._apiUrl = opts.apiUrl || 'https://kitsu.io/api'
    this._apiVer = opts.apiVer || 'edge'
    delete opts.apiUrl
    this._opts = opts
    this._opts.timeout = this._opts.timeout || 30000
    this._opts.retries = this._opts.retries || 2

    // Set Headers
    this._opts.headers = Object.assign({
      'user-agent': `Kitsu/${version} (github.com/wopian/kitsu)`
    }, this._opts.headers, {
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    })
  }

  auth = auth.bind(this)
  get = get.bind(this)
  patch = patch.bind(this)
  post = post.bind(this)
  remove = remove.bind(this)
  whoAmI = whoAmI.bind(this)

  // Aliases (devour migration)
  fetch = this.get
  find = this.get
  findAll = this.get
  create = this.post
  update = this.patch
  destroy = this.remove

  /**
   * Get the current headers
   * @returns {Object} Object containing the current headers
   *
   * @example
   * // Display all headers
   * console.log(kitsu.headers)
   *
   * @example
   * // Display a specific header
   * console.log(kitsu.headers['user-agent'])
   *
   * @example
   * // Add or update a header
   * kitsu.headers['authorization'] = 'Bearer 1234567890'
   */
  get headers () {
    return this._opts.headers
  }

  /**
   * Check if the client is authenticated
   * @returns {Boolean}
   *
   * @example
   * if (kitsu.isAuth) console.log('Authenticated')
   * else console.log('Not authenticated')
   */
  get isAuth () {
    return Boolean(typeof this._opts.headers.authorization !== 'undefined')
  }
}
