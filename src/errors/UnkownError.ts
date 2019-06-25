import { IPStackClientError } from './IPStackClientError'

/**
 * Error to be thrown when an unknown error has occurred
 */
class UnknownError extends IPStackClientError {
  constructor(message = 'Unknown error.') {
    super(message)
  }
}

export { UnknownError }
