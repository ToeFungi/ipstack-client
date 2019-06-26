import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { Geolocation } from './models/Geolocation'
import { GeolocationResponse } from './types/GeolocationResponse'
import { InvalidAddressError } from './errors/InvalidAddressError'
import { ErrorResponseFactory } from './factories/ErrorResponseFactory'
import { IPStackClientConfiguration } from './types/IPStackClientConfiguration'

/**
 * IP Stack client
 */
class IPStackClient {
  /**
   * The client being used to make requests to the API
   *
   * @type {AxiosInstance}
   */
  private axios: AxiosInstance

  /**
   * Returns a new instantiated instance of the IP Stack Client
   *
   * @param {IPStackClientConfiguration} configuration The configuration object for the client
   */
  constructor(configuration: IPStackClientConfiguration) {
    const config: AxiosRequestConfig = {
      baseURL: 'http://api.ipstack.com',
      params: {
        access_key: configuration.token
      },
      timeout: configuration.timeout || 5000
    }

    this.axios = Axios.create(config)
  }

  /**
   * Gets the GeoLocation data from the API based on the IP address
   *
   * @param {string} ipAddress The IP address to get the geolocation of
   * @return {Promise<Geolocation>}
   */
  public getLocation(ipAddress: string): Promise<Geolocation> {
    // Ensure address is a valid IP
    if (!this.isValidIpAddress(ipAddress)) {
      return Promise.reject(new InvalidAddressError(`${ipAddress} is an invalid IPv4 address.`))
    }

    /**
     * Determines if the response from the API was a successful or unsuccessful response and will proceed or throw an
     * appropriate error depending on the state and error received
     * @param {AxiosResponse} response The response from the API request
     * @return {AxiosResponse}
     */
    const validateResponse = (response: AxiosResponse): AxiosResponse => {
      const { data: { success, error } } = response
      if (!success && !error) return response

      const { data: { error: { code, type, info } } } = response
      throw ErrorResponseFactory.wrapError(code, type, info)
    }

    /**
     * Wraps and returns the response data as a Geolocation model
     * @param {AxiosResponse} data The data contained within the response from the API request
     * @return {Geolocation}
     */
    const wrapResponse = ({ data }: AxiosResponse): Geolocation => new Geolocation(data)

    /**
     * Throws a named error if something goes wrong with the Axios request to the API
     * @throws {Error}
     */
    const requestError = () => {
      throw new Error('An error occurred with the request to the API.')
    }

    return this.axios.get(`/${ ipAddress }`)
      .catch(requestError)
      .then(validateResponse)
      .then(wrapResponse)
  }

  /**
   * Gets the GeoLocation data from the API based on the IP addresses provided
   *
   * @param {Array<string>} addresses The list of IP addresses to get the geolocations for
   * @return {Promise<Array<Geolocation>>}
   */
  public getMultipleLocations(addresses: Array<string>): Promise<Array<Geolocation>> {
    // Validate that each IP address provided is a valid IP address
    addresses.forEach((ipAddress: string) => {
      if (!this.isValidIpAddress(ipAddress)) return Promise.reject(new InvalidAddressError())
    })

    // Flatten the array into a string
    const flattenedAddresses = addresses.toString()

    /**
     * Determines if the response from the API was a successful or unsuccessful response and will proceed or throw an
     * appropriate error depending on the state and error received
     * @param {AxiosResponse} response The response from the API request
     * @return {AxiosResponse}
     */
    const validateResponse = (response: AxiosResponse): AxiosResponse => {
      const { data: { success, error } } = response
      if (!success && !error) return response

      const { data: { error: { code, type, info } } } = response
      throw ErrorResponseFactory.wrapError(code, type, info)
    }

    /**
     * Wraps and returns the response data as an array of Geolocation models
     * @param {AxiosResponse} data The data contained within the response from the API request
     * @return {Array<Geolocation>}
     */
    const wrapResponse = ({ data }: AxiosResponse): Array<Geolocation> => {
      return data.map((item: GeolocationResponse) => new Geolocation(item))
    }

    /**
     * Throws a named error if something goes wrong with the Axios request to the API
     * @throws {Error}
     */
    const requestError = () => {
      throw new Error('An error occurred with the request to the API.')
    }

    return this.axios.get(`/${ flattenedAddresses }`)
      .catch(requestError)
      .then(validateResponse)
      .then(wrapResponse)
  }

  /**
   * Validates that the IP address being provided to the client conforms to the pattern of an IP address and only
   * contains valid characters
   *
   * @param {string} ipAddress The IP address being provided to the client
   * @return {boolean} Whether or not the IP address is valid
   */
  private isValidIpAddress(ipAddress: string): boolean {
    const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return pattern.test(ipAddress)
  }
}

export { IPStackClient }
