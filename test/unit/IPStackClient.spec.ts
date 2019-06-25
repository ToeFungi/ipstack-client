import * as nock from 'nock'

import { IPStackClient } from '../../src/IPStackClient'
import { Geolocation } from '../../src/models/Geolocation'
import { UnknownError } from '../../src/errors/UnkownError'
import { IPStackClientConfiguration } from '../../src/types/IPStackClientConfiguration'

// Errors
import { InactiveUserError } from '../../src/errors/InactiveUserError'
import { InvalidAddressError } from '../../src/errors/InvalidAddressError'
import { InvalidAccessKeyError } from '../../src/errors/InvalidAccessKeyError'
import { MissingAccessKeyError } from '../../src/errors/MissingAccessKeyError'
import { UsageLimitReachedError } from '../../src/errors/UsageLimitReachedError'

// Data sources
import * as sampleAfricaResponse from '../sample-responses/sample-africa-response.json'

describe('IPStackClient', () => {
  const host = 'http://api.ipstack.com'

  const token = 'some-token'
  const ipAddress = '100.100.100.100'

  let ipStackClient: IPStackClient
  let ipStackClientConfiguration: IPStackClientConfiguration

  beforeEach(() => {
    ipStackClientConfiguration = {
      token
    }

    ipStackClient = new IPStackClient(ipStackClientConfiguration)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('#getLocation', () => {
    it('resolves and returns a geolocation model', () => {
      nock(host)
        .get(`/${ipAddress}`)
        .query({ access_key: token })
        .reply(200, sampleAfricaResponse)

      return ipStackClient.getLocation(ipAddress)
        .should.eventually.be.instanceof(Geolocation)
    })

    it('rejects with an `Error` when a network error occurs', () => {
      nock(host)
        .get(`/${ipAddress}`)
        .query({ access_key: token })
        .replyWithError('Something strange is afoot.')

      return ipStackClient.getLocation(ipAddress)
        .should.be.rejectedWith(Error, 'An error occurred with the request to the API.')
    })

    it('rejects with an `UnknownError` when an un-catered for error occurs', () => {
      const errorResponse = {
        success: false,
        error: {
          info: 'Something strange is afoot.',
          type: 'some-type',
          code: 599
        }
      }

      nock(host)
        .get(`/${ipAddress}`)
        .query({ access_key: token })
        .reply(200, errorResponse)

      return ipStackClient.getLocation(ipAddress)
        .should.be.rejectedWith(UnknownError, 'Something strange is afoot.')
    })

    it('rejects with an `InvalidAccessKeyError` when an invalid access key is provided', () => {
      const errorResponse = {
        success: false,
        error: {
          info: 'You have supplied an invalid API Access Key.',
          type: 'invalid_access_key',
          code: 101
        }
      }

      nock(host)
        .get(`/${ipAddress}`)
        .query({ access_key: token })
        .reply(200, errorResponse)

      return ipStackClient.getLocation(ipAddress)
        .should.be.rejectedWith(InvalidAccessKeyError, 'You have supplied an invalid API Access Key.')
    })

    it('rejects with a `UsageLimitReachedError` when too many requests are made with the same access key', () => {
      const errorResponse = {
        success: false,
        error: {
          info: 'The maximum allowed amount of monthly API requests has been reached.',
          type: 'usage_limit_reached',
          code: 104
        }
      }

      nock(host)
        .get(`/${ipAddress}`)
        .query({ access_key: token })
        .reply(200, errorResponse)

      return ipStackClient.getLocation(ipAddress)
        .should.be.rejectedWith(UsageLimitReachedError, 'The maximum allowed amount of monthly API requests has been reached.')
    })

    it('rejects with an `MissingAccessKeyError` when an invalid access key is provided', () => {
      const errorResponse = {
        success: false,
        error: {
          info: 'You have not supplied an API Access Key.',
          type: 'missing_access_key',
          code: 101
        }
      }

      nock(host)
        .get(`/${ipAddress}`)
        .query({ access_key: token })
        .reply(200, errorResponse)

      return ipStackClient.getLocation(ipAddress)
        .should.be.rejectedWith(MissingAccessKeyError, 'You have not supplied an API Access Key.')
    })

    it('rejects with an `InactiveUserError` when an un-catered for error occurs', () => {
      const errorResponse = {
        success: false,
        error: {
          info: 'The current user account is not active.',
          type: 'inactive_user',
          code: 102
        }
      }

      nock(host)
        .get(`/${ipAddress}`)
        .query({ access_key: token })
        .reply(200, errorResponse)

      return ipStackClient.getLocation(ipAddress)
        .should.be.rejectedWith(InactiveUserError, 'The current user account is not active.')
    })

    it('rejects with an `InvalidAddressError` when an invalid IP address is provided', () => {
      return ipStackClient.getLocation('ipAddress')
        .should.be.rejectedWith(InvalidAddressError)
    })
  })

  describe('#getMultipleLocations', () => {
    it('resolves and returns an array of geolocation models', () => {
      const addressList = [ ipAddress, ipAddress, ipAddress ]

      nock(host)
        .get(`/${ipAddress},${ipAddress},${ipAddress}`)
        .query({ access_key: token })
        .reply(200, [ sampleAfricaResponse, sampleAfricaResponse, sampleAfricaResponse ])

      return ipStackClient.getMultipleLocations(addressList)
        .should.eventually.be.fulfilled
        .then(response => {
          response.forEach((item: any) => item.should.be.instanceof(Geolocation))
        })
    })
  })
})
