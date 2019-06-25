import { IPStackClientError } from './IPStackClientError'

/**
 * Error to be thrown when an invalid access key is provided to the client
 */
class InvalidAccessKeyError extends IPStackClientError {
  constructor(message = 'Invalid access key.') {
    super(message)
  }
}

export { InvalidAccessKeyError }
