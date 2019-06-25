import { IPStackClientError } from './IPStackClientError'

/**
 * Error to be thrown when an access key's usage limit has been reached
 */
class UsageLimitReachedError extends IPStackClientError {
  constructor(message = 'Usage limit reached.') {
    super(message)
  }
}

export { UsageLimitReachedError }
