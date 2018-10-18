/**
 * A partial mock implementation of the standard fetch function.
 *
 * @arg {string} url the URL to be requested
 * @arg {{ method: string, body: Object | string }} options
 * @return {Response}
 */
import stock from '../stock';

const fetch = (url, options = {}) => {
  const requestKey = `${options.method || 'GET'}:${url}`
  const response = responses[requestKey]
  return response
    ? response(options)
    : Promise.resolve({
      status: 404,
      ok: false,
      json: () => {
        return stock;
      }
    })
}

const responses = {
  'GET:https://example.com/-/v1/stock': () => {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
        return stock;
      }
    })
  },
  'POST:https://example.com/-/v1/stock/reserve': () => {
    const responseFactor = Math.random()
    if (responseFactor < 0.1) {
      return Promise.resolve({
        ok: false,
        status: 500,
        json: () => {
          throw new Error('Something went wrong.')
        }
      })
    } else if (responseFactor < 0.3) {
      return Promise.resolve({
        ok: false,
        status: 418,
        json: () => {
          throw new Error('Failed to reserve item. Out of stock.')
        }
      })
    } else {
      // correct response
      return Promise.resolve({
        ok: true,
        status: 204,
        json: () => {
          return {
            quantity: 1,
            urn: ''
          }
        }
      })
    }
  }
};

export default fetch;
