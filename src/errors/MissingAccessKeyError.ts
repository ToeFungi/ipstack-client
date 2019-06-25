import { IPStackClientError } from './IPStackClientError'

/**
 * Error to be thrown when an access key is not provided to the client
 */
class MissingAccessKeyError extends IPStackClientError {
  constructor(message = 'Missing access key.') {
    super(message)
  }
}

export { MissingAccessKeyError }
