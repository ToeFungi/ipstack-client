import { IPStackClientError } from './IPStackClientError'

/**
 * Error to be thrown when a user is inactive
 */
class InactiveUserError extends IPStackClientError {
  constructor(message = 'Inactive user error.') {
    super(message)
  }
}

export { InactiveUserError }
