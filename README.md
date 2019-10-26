# IP Stack API Client
[![Build Status](https://travis-ci.org/ToeFungi/ipstack-client.svg?branch=master)](https://travis-ci.org/ToeFungi/ipstack-client)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ipstack-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=ipstack-client)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ipstack-client&metric=bugs)](https://sonarcloud.io/dashboard?id=ipstack-client)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ipstack-client&metric=code_smells)](https://sonarcloud.io/dashboard?id=ipstack-client)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ipstack-client&metric=coverage)](https://sonarcloud.io/dashboard?id=ipstack-client)

ipstack offers a powerful, real-time IP to geolocation API capable of looking up accurate location data and assessing 
security threats originating from risky IP addresses. Results are delivered within milliseconds in JSON format. Using 
the ipstack API you will be able to locate website visitors at first glance and adjust your user experience and 
application accordingly.

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
} from 'ipstack-client'

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
This project is mostly covered by unit tests. Various cases have been accounted for both in the codebase and in the
tests covering it. If a bug is picked up regarding the test suite or code, feel free to make a contribution to help
correct the bug.

To run the tests, you can simply run the following `test` command/s.
```bash
npm run test
npm run coverage
```

## Upcoming
Still working on the multiple addresses and selected fields.

## Contribution
Feedback and contributions are more than welcome. Should you feel there is something you wish to contribute to this 
project, feel free to make a merge request. Ensure that whatever proposed change, has tests covering various cases for
the change and if required, update all relevant documentation.
