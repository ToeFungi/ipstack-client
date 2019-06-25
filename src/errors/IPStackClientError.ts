/**
 * Base error for all application errors to extend
 */
class IPStackClientError extends Error {
  constructor (message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export { IPStackClientError }
