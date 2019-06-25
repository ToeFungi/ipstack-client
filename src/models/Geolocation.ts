import { Language } from '../types/Language'
import { GeolocationResponse } from '../types/GeolocationResponse'

/**
 * Geolocation class that represents the location.
 */
class Geolocation {
  /**
   * The geolocation raw data.
   */
  private readonly locationData: GeolocationResponse

  /**
   * A model of the geolocation data that is returned from the API.
   *
   * @param {GeolocationResponse} locationData Location data returned from the API.
   */
  constructor (locationData: GeolocationResponse) {
    this.locationData = locationData
  }

  /**
   * Returns the ISO2 country code of the location.
   * @return {string} Country code of the location.
   */
  public getCountryCode (): string {
    return this.locationData.country_code
  }

  /**
   * Returns the country name of the location.
   * @return {string} Country name of the location.
   */
  public getCountryName (): string {
    return this.locationData.country_name
  }

  /**
   * Returns the ISO2 continent code of the location.
   * @return {string} Continent code of the location.
   */
  public getContinentCode (): string {
    return this.locationData.continent_code
  }

  /**
   * Returns the continent name of the location.
   * @return {string} Continent name of the location.
   */
  public getContinentName (): string {
    return this.locationData.continent_name
  }

  /**
   * Returns all the official languages of the location.
   * @return {Array<Language>} Official languages of the location.
   */
  public getLanguages (): Array<Language> {
    return this.locationData.location.languages
  }

  /**
   * Returns the primary language of the location.
   * @return {Language} Primary language of the location.
   */
  public getPrimaryLanguage (): Language {
    return this.locationData.location.languages[0]
  }

  /**
   *
   * @return {boolean} Whether or not location is in Europe
   */
  public isWithinEurope (): boolean {
    return this.locationData.location.is_eu
  }

  /**
   * Returns the raw geolocation response data.
   * @return {GeolocationResponse} The geolocation response data.
   */
  public getRawLocationData (): GeolocationResponse {
    return this.locationData
  }
}

export { Geolocation }
