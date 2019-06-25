import { Language } from './Language'

/**
 * Typing representing the geolocation response from the API.
 */
interface GeolocationResponse {
  /**
   * The IP address being requested.
   */
  ip: string,

  /**
   * IP Address type I.E. ipv4.
   */
  type: string,

  /**
   * The ISO2 code of the continent.
   */
  continent_code: string,

  /**
   * The name of the continent in plain English.
   */
  continent_name: string,

  /**
   * The ISO2 code of the country.
   */
  country_code: string,

  /**
   * The name of the country in plain English.
   */
  country_name: string,

  /**
   * The ISO2 code of the region.
   */
  region_code: string,

  /**
   * The name of the region in plain English.
   */
  region_name: string,

  /**
   * The name of the city in plain English.
   */
  city: string,

  /**
   * The ZIP code of the city.
   */
  zip: string,

  /**
   * Latitude of the city.
   */
  latitude: number,

  /**
   * Longitude of the city.
   */
  longitude: number,

  /**
   * Location specific response data.
   */
  location: {
    geoname_id: number,

    /**
     * Capital city of the location.
     */
    capital: string,

    /**
     * Official languages of the location.
     */
    languages: Array<Language>,
    country_flag: string,
    country_flag_emoji: string,
    country_flag_emoji_unicode: string,
    calling_code: string,
    is_eu: boolean
  }
}

export { GeolocationResponse }
