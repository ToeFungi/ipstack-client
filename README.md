# IP Stack API Client
ipstack offers a powerful, real-time IP to geolocation API capable of looking up accurate location data and assessing security threats originating from risky IP addresses. Results are delivered within milliseconds in JSON format. Using the ipstack API you will be able to locate website visitors at first glance and adjust your user experience and application accordingly.

## Installation
You can install this package via `npm`
```bash
$ npm install toefungi/ipstack-client
```

## Usage
Getting the geolocation based on a single IP address.
```typescript
import { 
  Geolocation,
  IPStackClient, 
  InvalidAccessKeyError,
  IPStackClientConfiguration
} from 'some/path/ipstack-client'

const ipAddress = '41.121.45.123'
const configuration: IPStackClientConfiguration = {
  token: 'some-token',
  timeout: 1000
}

const client = new IPStackClient(configuration)

// Getting the ISO country code for an IP address
client.getLocation(ipAddress)
    .then((response: Geolocation) => {
      console.log(response.getRawLocationData())
    })
    .catch((invalidAccess: InvalidAccessKeyError) => {
      console.log(invalidAccess.message)
    })
```

## Testing
This client is tested using `chai` and `mocha` as well as variants that assist such as `chai-as-promised`. To run the
tests you can simple run:
```bash
$ npm run test
```

The code coverage at the moment is +95% but will likely increase before the final release.

## Upcoming
Still working on the multiple addresses and selected fields.