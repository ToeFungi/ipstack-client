/**
 * Type defining the properties of a language response.
 */
interface Language {
  /**
   * ISO2 code for the language.
   */
  code: string,

  /**
   * English name of the language.
   */
  name: string,

  /**
   * Name in the language.
   */
  native: string
}

export { Language }
