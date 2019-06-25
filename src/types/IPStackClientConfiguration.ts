/**
 * Type defining the configurable properties for the IP Stack Client.
 */
interface IPStackClientConfiguration {
  /**
   * Access Key token for making valid requests against the API.
   */
  token: string,

  /**
   * The maximum time in milliseconds to wait before timing out the request.
   */
  timeout?: number,

  /**
   * The maximum number of retries to make the request.
   */
  maxRetries?: number
}

export { IPStackClientConfiguration }
