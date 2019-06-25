import { Geolocation } from '../../../src/models/Geolocation'

import * as africaResponse from '../../sample-responses/sample-africa-response.json'
import * as europeResponse from '../../sample-responses/sample-europe-response.json'

describe('Geolocation', () => {
  let geolocation: Geolocation

  describe('Africa response', () => {
    beforeEach(() => {
      geolocation = new Geolocation(africaResponse)
    })

    describe('#getCountryCode', () => {
      it('returns the country code', () => {
        return geolocation.getCountryCode().should.deep.equal('ZA')
      })
    })

    describe('#getCountryName', () => {
      it('returns the country name', () => {
        return geolocation.getCountryName().should.deep.equal('South Africa')
      })
    })

    describe('#getContinentCode', () => {
      it('returns the continent code', () => {
        return geolocation.getContinentCode().should.deep.equal('AF')
      })
    })

    describe('#getContinentName', () => {
      it('returns the continent name', () => {
        return geolocation.getContinentName().should.deep.equal('Africa')
      })
    })

    describe('#getLanguages', () => {
      it('returns the languages of the country', () => {
        return geolocation.getLanguages().should.deep.equal(africaResponse.location.languages)
      })
    })

    describe('#getPrimaryLanguage', () => {
      it('returns the primary language of the country', () => {
        return geolocation.getPrimaryLanguage().should.deep.equal(africaResponse.location.languages[0])
      })
    })

    describe('#getRawLocationData', () => {
      it('returns the raw geolocation data', () => {
        return geolocation.getRawLocationData().should.deep.equal(africaResponse)
      })
    })
  })

  describe('Europe response', () => {
    beforeEach(() => {
      geolocation = new Geolocation(europeResponse)
    })

    describe('#isWithinEurope', () => {
      it('returns whether or not country is European', () => {
        return geolocation.isWithinEurope().should.be.true
      })
    })
  })
})
