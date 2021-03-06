import { UnknownError } from '../errors/UnkownError'
import { InactiveUserError } from '../errors/InactiveUserError'
import { MissingAccessKeyError } from '../errors/MissingAccessKeyError'
import { InvalidAccessKeyError } from '../errors/InvalidAccessKeyError'
import { UsageLimitReachedError } from '../errors/UsageLimitReachedError'

/**
 * ErrorResponseFactory encapsulates the error data and throws an appropriate error
 */
class ErrorResponseFactory {
  /**
   * Wrap the unsuccessful API request in an error and throw it accordingly
   *
   * @param code The error code assigned to the unsuccessful request to the API
   * @param type The error type assigned to the unsuccessful request to the API
   * @param info A string detailing what went wrong with the request to the API
   *
   * @throws {MissingAccessKeyError}
   * @throws {InvalidAccessKeyError}
   * @throws {InactiveUserError}
   * @throws {UsageLimitReachedError}
   * @throws {UnknownError}
   */
  public static wrapError (code: number, type: string, info: string) {
    switch (code) {
      case 101:
        if (type === 'missing_access_key') throw new MissingAccessKeyError(info)
        if (type === 'invalid_access_key') throw new InvalidAccessKeyError(info)
        break
      case 102: throw new InactiveUserError(info)
      case 104: throw new UsageLimitReachedError(info)
      default: throw new UnknownError(info)
    }
  }
}

export { ErrorResponseFactory }
