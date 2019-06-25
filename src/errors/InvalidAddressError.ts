import { IPStackClientError } from './IPStackClientError'

/**
 * Error to be thrown when an invalid IP address is provided to the client
 */
class InvalidAddressError extends IPStackClientError {
  constructor(message = 'Invalid IP Address Provided.') {
    super(message)
  }
}

export { InvalidAddressError }
