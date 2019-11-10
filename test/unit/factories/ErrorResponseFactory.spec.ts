import {
  ErrorResponseFactory,
  InactiveUserError,
  InvalidAccessKeyError,
  MissingAccessKeyError, UnknownError,
  UsageLimitReachedError
} from '../../../src'

describe('ErrorResponseFactory', () => {
  describe('#wrapError', () => {
    it('throws a `MissingAccessKeyError`', () => {
      return ErrorResponseFactory.wrapError(101, 'missing_access_key', 'info')!
        .should.be.instanceOf(MissingAccessKeyError)
    })

    it('throws a `InvalidAccessKeyError`', () => {
      return ErrorResponseFactory.wrapError(101, 'error', 'info')!
        .should.be.instanceOf(InvalidAccessKeyError)
    })

    it('throws a `InactiveUserError`', () => {
      return ErrorResponseFactory.wrapError(102, 'error', 'info')!
        .should.be.instanceOf(InactiveUserError)
    })

    it('throws a `UsageLimitReachedError`', () => {
      return ErrorResponseFactory.wrapError(104, 'error', 'info')!
        .should.be.instanceOf(UsageLimitReachedError)
    })

    it('throws a `UnknownError` when a unique error occurs', () => {
      return ErrorResponseFactory.wrapError(100, 'error', 'info')!
        .should.be.instanceOf(UnknownError)
    })
  })
})
